<?php
include_once "consts.php";
include_once "db.php";

if(basename($_SERVER["PHP_SELF"]) == "common.php" && $_SERVER["REQUEST_METHOD"] == "POST")
	call_ajax($_GET["action"]);

function get_profile_page()
{
	if(empty($_GET["tab"]))
		include "profile_about.php";
	else
	{
		switch($_GET["tab"])
		{
			case "tablica":
				include "profile_wall.php";
				break;
			case "znajomi":
				include "profile_friends.php";
				break;
			case "zdjecia":
				include "profile_photos.php";
				break;
		}
	}
}

function register_error($errno)
{
	setcookie("register-error", $errno);
	header("Location: index.php#register");
	die();
}

function login_error($errno)
{
	setcookie("login-error", $errno);
	header("Location: index.php");
	die();
}

function get_register_alert()
{
	global $msgs;
	if(isset($_COOKIE["register-error"]))
	{
		$errno = $_COOKIE["register-error"];
		echo $msgs["register"][$errno];
	}
}

function get_login_alert()
{
	global $msgs;
	if(isset($_COOKIE["login-error"]))
	{
		$errno = $_COOKIE["login-error"];
		echo $msgs["login"][$errno];
	}
}

function get_user_info($info_col, $u_id = null)
{
	global $sqls;
	$data = null;
	
	if($u_id == null)
		$u_id = $_SESSION["user_id"];
	
	$query = str_replace("{info_col}", $info_col, $sqls["user_info"]);
	
	$db = db_connect();
	$stmt = $db -> prepare($query);
	$stmt -> bind_param("i", $u_id);
	$stmt -> execute();
	$stmt -> bind_result($data);
	$stmt -> store_result();
	$stmt -> fetch();
	$db -> close();
	
	return $data;
}

function get_user_full_name($u_id = null)
{
	global $sqls;
	
	if($u_id == null)
		$u_id = $_SESSION["user_id"];
	
	$fname = get_user_info("firstname", $u_id);
	$nick = get_user_info("nickname", $u_id);
	$sname = get_user_info("surname", $u_id);
	
	return "$fname " . (($nick) ? "\"$nick\"" : "") . $sname;
}

//Tylko dane niewymagające "obróbki"
function user_info($info_col, $u_id = null, $clean = false)
{
	$data = get_user_info($info_col, $u_id);
	if(!$data && !$clean)
		$data = "brak danych";
	echo $data;
}

function user_full_name($u_id = null)
{
	echo get_user_full_name($u_id);
}

function user_birthdate($u_id = null)
{
	$timestamp = get_user_info("birthdate", $u_id);
	echo date("d.m.Y", $timestamp);
}

function user_age($u_id = null)
{
	$timestamp = get_user_info("birthdate", $u_id);
	$year = date("Y", $timestamp);
	$currentYear = date("Y");
	$age = $currentYear - $year;
	
	$month = date("n", $timestamp);
	$currentMonth = date("n");
	if($currentMonth < $month)
		$age--;
	else
	{
		$day = date("j", $timestamp);
		$currentDay = date("j");
		if($currentDay < $day)
			$age--;
	}
	echo $age;
}

function user_sex($u_id = null)
{
	$sex = get_user_info("sex", $u_id);
	if($sex == "m")
		echo "Mężczyzna";
	else if($sex == "k")
		echo "Kobieta";
}

function user_www($u_id = null)
{
	$www = get_user_info("www", $u_id);
	if(!$www)
	{
		echo "brak danych";
		return;
	}
	
	$href = $www;
	if(strpos($href, "http") === false)
		$href = "https://" . $href;
	else
		$www = preg_replace("/https?:\/\//", "", $www, 1);
	
	echo '<a href="' . $href . '">' . $www . '</a>';		
}

function user_registerdate($u_id = null)
{
	$timestamp = get_user_info("registerdate", $u_id);
	echo date("d.m.Y", $timestamp);
}

function does_user_exist($u_id)
{
	if(get_user_info("u_id", $u_id) === null)
		return 0;
	return 1;
}

function escape_input($input)
{
	$input = htmlspecialchars($input);
	$input = trim($input);
	return $input;
}

function call_ajax($action)
{
	switch($action)
	{
		case "friend_send_invite":
			send_friend_invite();
			break;
		case "friend_cancel_invite":
			cancel_friend_invite();
			break;
		case "friend_accept_invite":
			accept_friend_invite();
			break;
		case "friend_reject_invite":
			reject_friend_invite();
			break;
		case "friend_delete":
			delete_friend();
			break;
		case "get_friends_list":
			json_get_friends_list($_POST["user_id"]);
			break;
	}
}

function send_friend_invite()
{
	global $sqls;
	session_start();
	
	if(is_friend_invited($_POST["friend_id"]) !== null || is_user_invited($_POST["friend_id"]) !== null)
	{
		echo '{"success": false}';
		return;
	}
	
	$db = db_connect();
	$stmt = $db -> prepare($sqls["friend_invite"]);
	$stmt -> bind_param("ii", $_SESSION["user_id"], $_POST["friend_id"]);
	$stmt -> execute();
	if($stmt -> errno)
		echo '{"success": false}';
	else
		echo '{"success": true}';
	$db -> close();
}

function cancel_friend_invite()
{
	global $sqls;
	session_start();

	if(is_friend_invited($_POST["friend_id"]) !== 1)
	{
		echo '{"success": false}';
		return;
	}
	
	$db = db_connect();
	$stmt = $db -> prepare($sqls["friend_cancel"]);
	$stmt -> bind_param("ii", $_SESSION["user_id"], $_POST["friend_id"]);
	$stmt -> execute();
	if($stmt -> errno)
		echo '{"success": false}';
	else
		echo '{"success": true}';
	$db -> close();
}

function accept_friend_invite()
{
	global $sqls;
	session_start();
	
	if(is_user_invited($_POST["friend_id"]) !== 1)
	{
		echo '{"success": false}';
		return;
	}
	
	$db = db_connect();
	$stmt = $db -> prepare($sqls["friend_accept"]);
	$stmt -> bind_param("ii", $_SESSION["user_id"], $_POST["friend_id"]);
	$stmt -> execute();
	if($stmt -> errno)
		echo '{"success": false}';
	else
		echo '{"success": true}';
	$db -> close();
}

function reject_friend_invite()
{
	global $sqls;
	session_start();
	
	if(is_user_invited($_POST["friend_id"]) !== 1)
	{
		echo '{"success": false}';
		return;
	}
	
	$db = db_connect();
	$stmt = $db -> prepare($sqls["friend_reject"]);
	$stmt -> bind_param("ii", $_SESSION["user_id"], $_POST["friend_id"]);
	$stmt -> execute();
	if($stmt -> errno)
		echo '{"success": false}';
	else
		echo '{"success": true}';
	$db -> close();
}

function delete_friend()
{
	global $sqls;
	session_start();
	$_SESSION["user_id"];
	$_POST["friend-id"];
	
	if(!(is_friend_invited($_POST["friend-id"]) === 0 || is_user_invited($_POST["friend-id"]) === 0))
	{
		echo '{"success": false}';
		return;
	}
	
	$db = db_connect();
	$stmt = $db -> prepare($sqls["friend_delete"]);
	$stmt -> bind_param("iiii", $_SESSION["user_id"], $_POST["friend-id"], $_SESSION["user_id"], $_POST["friend-id"]);
	$stmt -> execute();
	if($stmt -> errno)
		echo '{"success": false}';
	else
		echo '{"success": true}';
	$db -> close();
}

/**
 * Czy użytkownik wysłał zaproszenie
 * Zwraca null jeśli nie wysłano zaproszenia, 1 jeśli wysłano, 0 jeśli zaakceptowano (są znajomymi)
 */
function is_friend_invited($friend_id)
{
	global $sqls;
	$invited = null;
	$db = db_connect();
	$stmt = $db -> prepare($sqls["is_friend_invited"]);
	$stmt -> bind_param("ii", $_SESSION["user_id"], $friend_id);
	$stmt -> execute();
	$stmt -> bind_result($invited);
	$stmt -> store_result();
	$stmt -> fetch();
	$db -> close();
	return $invited;
}

/**
 * Czy użytkownik otrzymał zaproszenie
 * Zwraca null jeśli nie wysłano zaproszenia, 1 jeśli wysłano, 0 jeśli zaakceptowano (są znajomymi)
 */
function is_user_invited($friend_id)
{
	global $sqls;
	$invited = null;
	$db = db_connect();
	$stmt = $db -> prepare($sqls["is_user_invited"]);
	$stmt -> bind_param("ii", $_SESSION["user_id"], $friend_id);
	$stmt -> execute();
	$stmt -> bind_result($invited);
	$stmt -> store_result();
	$stmt -> fetch();
	$db -> close();
	return $invited;
}

function is_user_invited_by_user($u1_id, $u2_id)
{
	global $sqls;
	$invited = null;
	$db = db_connect();
	$stmt = $db -> prepare($sqls["is_user_invited_by_user"]);
	$stmt -> bind_param("iiii", $u1_id, $u2_id, $u1_id, $u2_id);
	$stmt -> execute();
	$stmt -> bind_result($invited);
	$stmt -> store_result();
	$stmt -> fetch();
	$db -> close();
	return $invited;
}

function is_user_invited_by_anyone() {
	global $sqls;
	$invited = null;
	$db = db_connect();
	$stmt = $db -> prepare($sqls["is_user_invited_by_anyone"]);
	$stmt -> bind_param("i", $_SESSION["user_id"]);
	$stmt -> execute();
	$stmt -> bind_result($invited);
	$stmt -> store_result();
	$stmt -> fetch();
	$db -> close();
	return $invited;
}

function is_any_friend_invited() {
	global $sqls;
	$invited = null;
	$db = db_connect();
	$stmt = $db -> prepare($sqls["is_any_friend_invited"]);
	$stmt -> bind_param("i", $_SESSION["user_id"]);
	$stmt -> execute();
	$stmt -> bind_result($invited);
	$stmt -> store_result();
	$stmt -> fetch();
	$db -> close();
	return $invited;
}

function json_get_friends_list($user_id)
{
	global $sqls;
	session_start();
	
	if($user_id == null)
		$user_id = $_SESSION["user_id"];
	
	$db = db_connect();
	$stmt = $db -> prepare($sqls["select_user_friends_list"]);
	$stmt -> bind_param("i", $user_id);
	$stmt -> execute();
	$stmt -> bind_result($friend_id);
	$stmt -> store_result();
	
	$friends_list = array();
	
	while($stmt -> fetch())
	{
		$friend_list_data = array(
			"id" => $friend_id,
			"fullname" => get_user_full_name($friend_id)
		);
		
		if($user_id != $_SESSION["user_id"])
		{
			if(is_user_invited_by_user($friend_id, $user_id))
				continue;
		}
		else
		{
			if(is_user_invited($friend_id))
				$friend_list_data["userInvited"] = true;
			if(is_friend_invited($friend_id))
				$friend_list_data["friendInvited"] = true;			
		}
		
		$friends_list[] = $friend_list_data;
	}
	$db -> close();
	echo json_encode($friends_list);
}

function process_update_user_info()
{
	global $regexps;
	
	//Walidacja
	///Wypełnienie wymaganych pól
	if(empty($_POST["firstname"]))
		user_info_update_error(USER_INFO_UPDATE_ERROR_NO_FNAME);
	
	if(empty($_POST["surname"]))
		user_info_update_error(USER_INFO_UPDATE_ERROR_NO_SNAME);

	if(empty($_POST["email"]))
		user_info_update_error(USER_INFO_UPDATE_ERROR_NO_EMAIL);

	if(empty($_POST["birthday"]) || empty($_POST["birthmonth"]) || empty($_POST["birthyear"]))
		user_info_update_error(USER_INFO_UPDATE_ERROR_NO_BIRTH);

	if(empty($_POST["sex"]))
		user_info_update_error(USER_INFO_UPDATE_ERROR_NO_SEX);
	
	///Poprawność pól
	
	if(!preg_match($regexps["name"], $_POST["firstname"]) || mb_strlen($_POST["firstname"]) < 3)
		user_info_update_error(USER_INFO_UPDATE_ERROR_FNAME_FORMAT);

	if(!preg_match($regexps["surname"], $_POST["surname"]) || mb_strlen($_POST["surname"]) < 3)
		user_info_update_error(USER_INFO_UPDATE_ERROR_SNAME_FORMAT);

	if(!preg_match($regexps["email"], $_POST["email"]))
		user_info_update_error(USER_INFO_UPDATE_ERROR_EMAIL_FORMAT);
	
	if(!is_date_correct($_POST["birthday"], $_POST["birthmonth"], $_POST["birthyear"]))
		user_info_update_error(USER_INFO_UPDATE_ERROR_DATE_FAKE);

	if(!($_POST["sex"] == "m" || $_POST["sex"] == "k"))
		user_info_update_error(USER_INFO_UPDATE_ERROR_SEX_FAKE);
	
	///Zmiana hasła
	if(!empty($_POST["password"]))
	{
		if(empty($_POST["rpassword"]))
			user_info_update_error(USER_INFO_UPDATE_ERROR_NO_PASSWORD);
		
		if(!is_safe_password($_POST["password"]))
			user_info_update_error(USER_INFO_UPDATE_ERROR_PASSWORD_FORMAT);

		if($_POST["password"] != $_POST["rpassword"])
			user_info_update_error(USER_INFO_UPDATE_ERROR_PASSWORD_NO_MATCH);
	}
	
	///Pola opcjonalne
	if(!empty($_POST["secondname"]))
	{
		
	}
	//...
	
}

function user_info_update_error($errno)
{
	setcookie("user-info-update-error", $errno);
	header("Location: ustawienia.php");
	die();
}

function get_user_info_update_alert()
{
	global $msgs;
	if(isset($_COOKIE["user-info-update-error"]))
	{
		$errno = $_COOKIE["user-info-update-error"];
		echo $msgs["user_info_update"][$errno];
	}
}

function is_safe_password($password)
{
	global $regexps;
	
	if(mb_strlen($password) < 8)
		return 0;

	if(!preg_match($regexps["lowercase_letters"], $password))
		return 0;

	if(!preg_match($regexps["uppercase_letters"],$password))
		return 0;

	if(!preg_match($regexps["numbers"], $password))
		return 0;

	if(!preg_match($regexps["special_characters"], $password))
		return 0;

	if(preg_match("/\s/", $password))
		return 0;
	
	return 1;
}

function is_date_correct($day, $month, $year)
{
	$current_year = date("Y");
	
	if($day < 1 || $month < 1 || $year < 1970 || $month > 12 || $year > $current_year)
		return 0;
		
	if(in_array($month, array(1, 3, 5, 7, 8, 10, 12)) && $day > 31)
		return 0;

	if(in_array($month, array(4, 6, 9, 11)) && $day > 30)
		return 0;

	if($month == 2)
		if($day > 29 || ($year % 4 && $day > 28))
			return 0;
	
	return 1;
}

?>
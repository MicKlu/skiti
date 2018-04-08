<?php
include_once "consts.php";
include_once "db.php";

if($_SERVER["REQUEST_METHOD"] == "POST")
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
	print_r($errno . "<br />");
	setcookie("register-error", $errno);
	header("Location: index.php#register");
	die();
}

function login_error($errno)
{
	print_r($errno . "<br />");
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

//Tylko dane niewymagające "obróbki"
function user_info($info_col, $u_id = null)
{
	$data = get_user_info($info_col, $u_id);
	if(!$data)
		$data = "brak danych";
	echo $data;
}

function user_full_name($u_id = null)
{
	global $sqls;
	
	if($u_id == -1)
		$u_id = $_SESSION["user_id"];
	
	$fname = get_user_info("firstname", $u_id);
	$nick = get_user_info("nickname", $u_id);
	$sname = get_user_info("surname", $u_id);
	
	echo "$fname " . (($nick) ? "\"$nick\"" : "") . $sname;
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

function escape_input($input) {
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
	}
}

function send_friend_invite()
{
	global $sqls;
	session_start();
	$_SESSION["user_id"];
	$_POST["friend-id"];
	
	if(is_friend_invited($_POST["friend-id"]) !== null || is_user_invited($_POST["friend-id"]) !== null)
	{
		echo '{"success": false}';
		return;
	}
	
	$db = db_connect();
	$stmt = $db -> prepare($sqls["friend-invite"]);
	$stmt -> bind_param("ii", $_SESSION["user_id"], $_POST["friend-id"]);
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
	$_SESSION["user_id"];
	$_POST["friend-id"];
	if(is_friend_invited($_POST["friend-id"]) !== 1)
	{
		echo '{"success": false}';
		return;
	}
	
	$db = db_connect();
	$stmt = $db -> prepare($sqls["friend-cancel"]);
	$stmt -> bind_param("ii", $_SESSION["user_id"], $_POST["friend-id"]);
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
	$_SESSION["user_id"];
	$_POST["friend-id"];
	
	if(is_user_invited($_POST["friend-id"]) !== 1)
	{
		echo '{"success": false}';
		return;
	}
	
	$db = db_connect();
	$stmt = $db -> prepare($sqls["friend-accept"]);
	$stmt -> bind_param("ii", $_SESSION["user_id"], $_POST["friend-id"]);
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
	$_SESSION["user_id"];
	$_POST["friend-id"];
	
	if(is_user_invited($_POST["friend-id"]) !== 1)
	{
		echo '{"success": false}';
		return;
	}
	
	$db = db_connect();
	$stmt = $db -> prepare($sqls["friend-reject"]);
	$stmt -> bind_param("ii", $_SESSION["user_id"], $_POST["friend-id"]);
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
	$stmt = $db -> prepare($sqls["is-friend-invited"]);
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
	$stmt = $db -> prepare($sqls["is-user-invited"]);
	$stmt -> bind_param("ii", $_SESSION["user_id"], $friend_id);
	$stmt -> execute();
	$stmt -> bind_result($invited);
	$stmt -> store_result();
	$stmt -> fetch();
	$db -> close();
	return $invited;
}


?>
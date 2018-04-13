<?php

require_once "common.php";

if($_SERVER["REQUEST_METHOD"] != "POST")
	register_error(REGISTER_ERROR_DEFAULT);

//Walidacja
///Wypełnienie pól
if(empty($_POST["firstname"]))
	register_error(REGISTER_ERROR_NO_FNAME);

if(empty($_POST["surname"]))
	register_error(REGISTER_ERROR_NO_SNAME);

if(empty($_POST["email"]))
	register_error(REGISTER_ERROR_NO_EMAIL);

if(empty($_POST["password"]))
	register_error(REGISTER_ERROR_NO_PASSWORD);

if(empty($_POST["rpassword"]))
	register_error(REGISTER_ERROR_NO_PASSWORD);

if(empty($_POST["birthday"]) || empty($_POST["birthmonth"]) || empty($_POST["birthyear"]))
	register_error(REGISTER_ERROR_NO_BIRTH);

if(empty($_POST["sex"]))
	register_error(REGISTER_ERROR_NO_SEX);

///Poprawność pól
if(!preg_match($regexps["name"], $_POST["firstname"]) || mb_strlen($_POST["firstname"]) < 3)
	register_error(REGISTER_ERROR_FNAME_FORMAT);

if(!preg_match($regexps["surname"], $_POST["surname"]) || mb_strlen($_POST["surname"]) < 3)
	register_error(REGISTER_ERROR_SNAME_FORMAT);

if(!preg_match($regexps["email"], $_POST["email"]))
	register_error(REGISTER_ERROR_EMAIL_FORMAT);
	
if(!is_safe_password($_POST["password"]))
	register_error(REGISTER_ERROR_PASSWORD_FORMAT);

if($_POST["password"] != $_POST["rpassword"])
	register_error(REGISTER_ERROR_PASSWORD_NO_MATCH);

if(!is_date_correct($_POST["birthday"], $_POST["birthmonth"], $_POST["birthyear"]))
	register_error(REGISTER_ERROR_DATE_FAKE);

if(!($_POST["sex"] == "m" || $_POST["sex"] == "k"))
	register_error(REGISTER_ERROR_SEX_FAKE);

//Rejestracja
$db = db_connect();
$stmt = $db -> prepare($sqls["register_user"]);

$hashed_password = password_hash($_POST["password"], PASSWORD_DEFAULT);
$birthdate_timestamp = strtotime($_POST["birthday"] . "." . $_POST["birthmonth"] . "." . $_POST["birthyear"]);
$register_timestamp = time();

$stmt -> bind_param("sssssss", $_POST["firstname"], $_POST["surname"], $_POST["email"], $hashed_password, $birthdate_timestamp, $_POST["sex"], $register_timestamp);
$stmt -> execute();

if($stmt -> errno == 1062)	//ER_DUP_ENTRY
	register_error(REGISTER_ERROR_EXISTS);
else if($stmt -> errno)
	register_error(REGISTER_ERROR_DEFAULT);

//Logowanie
session_start();
$stmt = $db -> prepare($sqls["select_registered_user_id"]);
$stmt -> bind_param("s", $_POST["email"]);
$stmt -> execute();
$stmt -> store_result();
if($stmt -> errno || !$stmt -> num_rows)
	login_error(LOGIN_ERROR_DEFAULT);
$stmt -> bind_result($_SESSION["user_id"]);
$stmt -> fetch();
$db -> close();

//Przekierowanie
header("Location: profil.php");
die();
	
?>
<?php
require_once "common.php";

if($_SERVER["REQUEST_METHOD"] != "POST")
	login_error(LOGIN_ERROR_DEFAULT);

//Walidacja
///Wypełnienie pól
if(empty($_POST["email"]))
	login_error(LOGIN_ERROR_FAILED);

if(empty($_POST["password"]))
	login_error(LOGIN_ERROR_FAILED);

///Poprawność pól
if(!preg_match($regexps["email"], $_POST["email"]))
	login_error(LOGIN_ERROR_FAILED);

//Autoryzacja
$user_id = null;
$password_hash = null;

$db = db_connect();

$stmt = $db -> prepare($sqls["login_user"]);
$stmt -> bind_param("s", $_POST["email"]);
$stmt -> bind_result($user_id, $password_hash);
$stmt -> execute();
$stmt -> store_result();
$stmt -> fetch();

if($stmt -> errno)
	login_error(LOGIN_ERROR_DEFAULT);

if(!$stmt -> num_rows)
	login_error(LOGIN_ERROR_FAILED);

if(!password_verify($_POST["password"], $password_hash))
	login_error(LOGIN_ERROR_FAILED);

$db -> close();

//Logowanie
session_start();
$_SESSION["user_id"] = $user_id;

//Przekierowanie
header("Location: profil.php");
die();

?>
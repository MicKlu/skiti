<?php

function db_connect()
{
	$database = array (
		"host"		=> "127.0.0.1",
		"user" 		=> "root",
		"password" 	=> "123",
		"db" 		=> "skiti"
	);
	$db = mysqli_connect($database["host"], $database["user"], $database["password"], $database["db"]);
	$db -> query("SET NAMES utf8");
	return $db;
}

$sqls = array (
	"register_user" => "INSERT INTO users(firstname, surname, email, password, birthdate, sex, registerdate) VALUES(?, ?, ?, ?, ?, ?, ?)",
	"select_registered_user_id" => "SELECT u_id FROM users WHERE email = ?",
	"login_user" => "SELECT u_id, password FROM users WHERE email = ?",
	"user_info" => "SELECT {info_col} FROM users WHERE u_id = ?",
	"friend-invite" => "INSERT INTO friends(u1_id, u2_id) VALUES (?, ?)",
	"is-friend-invited" => "SELECT pending FROM friends WHERE u1_id = ? AND u2_id = ?"
)

?>
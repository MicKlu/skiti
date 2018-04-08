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
	"friend_invite" => "INSERT INTO friends(u1_id, u2_id) VALUES (?, ?)",
	"friend_cancel" => "DELETE FROM friends WHERE u1_id = ? AND u2_id = ?",
	"friend_accept" => "UPDATE friends SET pending = 0 WHERE u2_id = ? AND u1_id = ?",
	"friend_reject" => "DELETE FROM friends WHERE u2_id = ? AND u1_id = ?",
	"is_friend_invited" => "SELECT pending FROM friends WHERE u1_id = ? AND u2_id = ?",
	"is_user_invited" => "SELECT pending FROM friends WHERE u2_id = ? AND u1_id = ?",
	"is_user_invited_by_user" => "SELECT pending FROM friends WHERE (u1_id = ? AND u2_id = ?) OR (u2_id = ? AND u1_id = ?)",
	"is_user_invited_by_anyone" => "SELECT COUNT(*) FROM friends WHERE u2_id = ? AND pending = 1",
	"is_any_friend_invited" => "SELECT COUNT(*) FROM friends WHERE u1_id = ? AND pending = 1",
	"select_user_friends_list" => "SELECT u_id FROM users_friends AS uf JOIN users AS u ON u.u_id = uf.u2_id WHERE u1_id = ? ORDER BY f_id ASC"	//users_friends jest widokiem
)

?>
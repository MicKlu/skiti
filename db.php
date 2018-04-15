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
	"friend_delete" => "DELETE FROM friends WHERE (u1_id = ? AND u2_id = ?) OR (u2_id = ? AND u1_id = ?)",
	"is_friend_invited" => "SELECT pending FROM friends WHERE u1_id = ? AND u2_id = ?",
	"is_user_invited" => "SELECT pending FROM friends WHERE u2_id = ? AND u1_id = ?",
	"is_user_invited_by_user" => "SELECT pending FROM friends WHERE (u1_id = ? AND u2_id = ?) OR (u2_id = ? AND u1_id = ?)",
	"is_user_invited_by_anyone" => "SELECT COUNT(*) FROM friends WHERE u2_id = ? AND pending = 1",
	"is_any_friend_invited" => "SELECT COUNT(*) FROM friends WHERE u1_id = ? AND pending = 1",
	"select_user_friends_list" => "SELECT u_id FROM users_friends AS uf JOIN users AS u ON u.u_id = uf.u2_id WHERE u1_id = ? ORDER BY f_id ASC",	//users_friends jest widokiem
	"update_user_info" => "UPDATE users SET {info_col} = ? WHERE u_id = ?",
	"add_image" => "INSERT INTO images(u_id, filename, title, caption) VALUES (?, ?, ?, ?)",
	"select_user_images" => "SELECT i_id, filename, title, caption FROM images WHERE u_id = ? ORDER BY i_id DESC",
	"give_thumb" => "INSERT INTO images_thumbs(i_id, u_id, thumb) VALUES (?, ?, ?)",
	"is_thumb_given" => "SELECT thumb FROM images_thumbs WHERE i_id = ? AND u_id = ?",
	"take_thumb" => "DELETE FROM images_thumbs WHERE i_id = ? AND u_id = ?",
	"select_thumbs_count" => "SELECT COUNT(*) FROM images_thumbs WHERE i_id = ? AND thumb = ? GROUP BY i_id",
	"select_image_comments" => "SELECT u_id, content, comment_date FROM images_comments WHERE i_id = ?",
	"post_image_comment" => "INSERT INTO images_comments(i_id, u_id, content, comment_date) VALUES (?, ?, ?, ?)",
	"delete_image" => "DELETE FROM images WHERE i_id = ? AND u_id = ?",
	"select_image_filename" => "SELECT filename FROM images WHERE i_id = ?",
	"update_image" => "UPDATE images SET title = ?, caption = ? WHERE i_id = ? AND u_id = ?",
	"new_thread" => "INSERT INTO threads(user_id, author_id, topic, msg, thread_date) VALUES (?, ?, ?, ?, ?)",
	"select_user_threads" => "SELECT t_id, author_id, topic, msg, thread_date FROM threads WHERE user_id = ? ORDER BY t_id DESC",
	"post_thread_comment" => "INSERT INTO threads_comments(t_id, u_id, content, comment_date) VALUES (?, ?, ?, ?)",
	"select_thread_comments" => "SELECT u_id, content, comment_date FROM threads_comments WHERE t_id = ?",
);

?>
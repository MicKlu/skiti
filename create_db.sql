DROP DATABASE IF EXISTS skiti;

START TRANSACTION;

CREATE DATABASE skiti COLLATE "utf8_unicode_ci";

USE skiti;

CREATE TABLE users (
	u_id int AUTO_INCREMENT,
	email varchar(255) NOT NULL UNIQUE,
	password varchar(255) NOT NULL,
	firstname varchar(255) NOT NULL,
	secondname varchar(255),
	surname varchar(255) NOT NULL,
	nickname varchar(255),
	birthdate varchar(31) NOT NULL,
	sex varchar(1) NOT NULL,
	www varchar(255),
	bio text,
	country varchar(63) DEFAULT 135,	--Polska
	region varchar(255),
	city varchar(255),
	phone_number varchar(15),
	skype varchar(255),
	registerdate varchar(31) NOT NULL,
	avatar varchar(255),
	background varchar(255),
	PRIMARY KEY(u_id)
);

CREATE TABLE friends (
	f_id int AUTO_INCREMENT,
	u1_id int NOT NULL,
	u2_id int NOT NULL,
	pending int NOT NULL DEFAULT 1,
	PRIMARY KEY(f_id),
	FOREIGN KEY (u1_id) REFERENCES users(u_id),
	FOREIGN KEY (u2_id) REFERENCES users(u_id)
);

CREATE VIEW users_friends AS
SELECT f_id, u1_id, u2_id FROM friends AS f
UNION
SELECT f_id, u2_id, u1_id FROM friends AS f
ORDER BY f_id ASC

CREATE TABLE images (
	i_id int AUTO_INCREMENT,
	u_id int NOT NULL,
	filename varchar(255) NOT NULL,
	title varchar(255),
	caption varchar(255),
	FOREIGN KEY (u_id) REFERENCES users(u_id),
	PRIMARY KEY(i_id)
);

COMMIT;
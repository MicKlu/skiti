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
	country varchar(63),
	region varchar(255),
	city varchar(255),
	phone_number varchar(15),
	skype varchar(255),
	registerdate varchar(31) NOT NULL,
	PRIMARY KEY(u_id)
);



COMMIT;
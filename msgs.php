<?php
$msgs = array();

$msgs["register"] = array (
	REGISTER_ERROR_DEFAULT 				=> "Podczas rejestracji wystąpił błąd. Spróbuj ponownie później.",
	REGISTER_ERROR_NO_FNAME 			=> "Podaj imię.",
	REGISTER_ERROR_NO_SNAME 			=> "Podaj nazwisko.",
	REGISTER_ERROR_NO_EMAIL 			=> "Podaj email.",
	REGISTER_ERROR_NO_PASSWORD 			=> "Podaj hasło i powtórz je.",
	REGISTER_ERROR_NO_BIRTH 			=> "Podaj datę urodzenia.",
	REGISTER_ERROR_NO_SEX 				=> "Zaznacz płeć.",
	REGISTER_ERROR_FNAME_FORMAT 		=> "Imię musi zaczynać się od wielkiej litery i składać się z minimum 3 znaków.",
	REGISTER_ERROR_SNAME_FORMAT 		=> "Nazwisko musi zaczynać się od wielkiej litery i składać się z minimum 3 znaków.",
	REGISTER_ERROR_EMAIL_FORMAT 		=> "Podaj prawidłowy email.",
	REGISTER_ERROR_PASSWORD_FORMAT 		=> "Hasło musi składać się z co najmniej 8 znaków oraz musi zawierać duże i małe litery, cyfry i znaki.",
	REGISTER_ERROR_PASSWORD_NO_MATCH 	=> "Podane hasła nie pasują do siebie.",
	REGISTER_ERROR_DATE_FAKE 			=> "Podaj prawidłową datę urodzenia.",
	REGISTER_ERROR_SEX_FAKE 			=> "Zaznacz prawidłową płeć.",
	REGISTER_ERROR_EXISTS 				=> "Podany email jest już zarejestrowany."
);

$msgs["login"] = array (
	LOGIN_ERROR_DEFAULT	=> "Podczas logowania wystąpił błąd. Spróbuj ponownie później.",
	LOGIN_ERROR_FAILED	=> "Wprowadzono błędne dane logowania."
);

$msgs["user_info_update"] = array (
	USER_INFO_UPDATE_ERROR_DEFAULT 				=> "Podczas zapisywania zmian wystąpił błąd. Spróbuj ponownie później.",
	USER_INFO_UPDATE_ERROR_NO_FNAME 			=> $msgs["register"][REGISTER_ERROR_NO_FNAME],
	USER_INFO_UPDATE_ERROR_NO_SNAME 			=> $msgs["register"][REGISTER_ERROR_NO_SNAME],
	USER_INFO_UPDATE_ERROR_NO_EMAIL 			=> $msgs["register"][REGISTER_ERROR_NO_EMAIL],
	USER_INFO_UPDATE_ERROR_NO_PASSWORD 			=> $msgs["register"][REGISTER_ERROR_NO_PASSWORD],
	USER_INFO_UPDATE_ERROR_NO_BIRTH 			=> $msgs["register"][REGISTER_ERROR_NO_BIRTH],
	USER_INFO_UPDATE_ERROR_NO_SEX 				=> $msgs["register"][REGISTER_ERROR_NO_SEX],
	USER_INFO_UPDATE_ERROR_FNAME_FORMAT 		=> $msgs["register"][REGISTER_ERROR_FNAME_FORMAT],
	USER_INFO_UPDATE_ERROR_SNAME_FORMAT 		=> $msgs["register"][REGISTER_ERROR_SNAME_FORMAT],
	USER_INFO_UPDATE_ERROR_EMAIL_FORMAT 		=> $msgs["register"][REGISTER_ERROR_EMAIL_FORMAT],
	USER_INFO_UPDATE_ERROR_PASSWORD_FORMAT 		=> $msgs["register"][REGISTER_ERROR_PASSWORD_FORMAT],
	USER_INFO_UPDATE_ERROR_PASSWORD_NO_MATCH 	=> $msgs["register"][REGISTER_ERROR_PASSWORD_NO_MATCH],
	USER_INFO_UPDATE_ERROR_DATE_FAKE 			=> $msgs["register"][REGISTER_ERROR_DATE_FAKE],
	USER_INFO_UPDATE_ERROR_SEX_FAKE 			=> $msgs["register"][REGISTER_ERROR_SEX_FAKE],
	USER_INFO_UPDATE_ERROR_EXISTS 				=> $msgs["register"][REGISTER_ERROR_EXISTS],
);

?>
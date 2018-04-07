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

?>
<?php
define("AVATARS_PATH", "img" . DIRECTORY_SEPARATOR . "avatars" . DIRECTORY_SEPARATOR);
define("AVATARS_OLD_PATH", "img" . DIRECTORY_SEPARATOR . "avatars" . DIRECTORY_SEPARATOR . "old" . DIRECTORY_SEPARATOR);
define("BACKGROUNDS_PATH", "img" . DIRECTORY_SEPARATOR . "backgrounds" . DIRECTORY_SEPARATOR);
define("BACKGROUNDS_OLD_PATH", "img" . DIRECTORY_SEPARATOR . "backgrounds" . DIRECTORY_SEPARATOR . "old" . DIRECTORY_SEPARATOR);
define("IMAGES_PATH", "img" . DIRECTORY_SEPARATOR . "user_images" . DIRECTORY_SEPARATOR);

//REGISTER_ERROR
define("REGISTER_ERROR_DEFAULT", 			1);
define("REGISTER_ERROR_NO_FNAME", 			2);
define("REGISTER_ERROR_NO_SNAME", 			3);
define("REGISTER_ERROR_NO_EMAIL", 			4);
define("REGISTER_ERROR_NO_PASSWORD",		5);
define("REGISTER_ERROR_NO_BIRTH", 			6);
define("REGISTER_ERROR_NO_SEX",	 			7);
define("REGISTER_ERROR_FNAME_FORMAT",		8);
define("REGISTER_ERROR_SNAME_FORMAT",		9);
define("REGISTER_ERROR_EMAIL_FORMAT",		10);
define("REGISTER_ERROR_PASSWORD_FORMAT",	11);
define("REGISTER_ERROR_PASSWORD_NO_MATCH",	12);
define("REGISTER_ERROR_DATE_FAKE",			13);
define("REGISTER_ERROR_SEX_FAKE",			14);
define("REGISTER_ERROR_EXISTS",				15);

//LOGIN_ERROR
define("LOGIN_ERROR_DEFAULT",	1);
define("LOGIN_ERROR_FAILED",	2);

//USER_INFO_UPDATE_ERROR
define("USER_INFO_UPDATE_ERROR_DEFAULT",			1);
define("USER_INFO_UPDATE_ERROR_NO_FNAME",			2);
define("USER_INFO_UPDATE_ERROR_NO_SNAME",			3);
define("USER_INFO_UPDATE_ERROR_NO_EMAIL",			4);
define("USER_INFO_UPDATE_ERROR_NO_PASSWORD",		5);
define("USER_INFO_UPDATE_ERROR_NO_BIRTH",			6);
define("USER_INFO_UPDATE_ERROR_NO_SEX",				7);
define("USER_INFO_UPDATE_ERROR_FNAME_FORMAT",		8);
define("USER_INFO_UPDATE_ERROR_SNAME_FORMAT",		9);
define("USER_INFO_UPDATE_ERROR_EMAIL_FORMAT",		10);
define("USER_INFO_UPDATE_ERROR_PASSWORD_FORMAT",	11);
define("USER_INFO_UPDATE_ERROR_PASSWORD_NO_MATCH",	12);
define("USER_INFO_UPDATE_ERROR_DATE_FAKE",			13);
define("USER_INFO_UPDATE_ERROR_SEX_FAKE",			14);
define("USER_INFO_UPDATE_ERROR_EXISTS",				15);
define("USER_INFO_UPDATE_ERROR_SECONDNAME_FORMAT",	16);
define("USER_INFO_UPDATE_ERROR_PHONE_FORMAT",		17);
define("USER_INFO_UPDATE_ERROR_WWW_FORMAT",			18);
define("USER_INFO_UPDATE_ERROR_NO_COUNTRY",			19);
define("USER_INFO_UPDATE_ERROR_COUNTRY_FAKE",		20);
define("USER_INFO_UPDATE_ERROR_AVATAR_SMALL",		21);
define("USER_INFO_UPDATE_ERROR_AVATAR_FORMAT",		22);
define("USER_INFO_UPDATE_ERROR_AVATAR_BIG_SIZE",	23);
define("USER_INFO_UPDATE_ERROR_BACKGROUND_SMALL",	24);

//AVATAR (type)
define("AVATAR_MAIN",	1);
define("AVATAR_OLD",	2);
define("AVATAR_PLACEHOLDER",	3);

//BACKGROUND (type)
define("BACKGROUND_MAIN",	1);
define("BACKGROUND_OLD",	2);
define("BACKGROUND_NONE",	3);

//ADD_IMAGE_ERROR
define("ADD_IMAGE_ERROR_DEFAULT",	1);
define("ADD_IMAGE_ERROR_NO_FILE",	2);
define("ADD_IMAGE_ERROR_BIG_SIZE",	3);
define("ADD_IMAGE_ERROR_FORMAT",	4);

//NEW_THREAD_ERROR
define("NEW_THREAD_ERROR_DEFAULT",	1);
define("NEW_THREAD_ERROR_CONTENT",	2);

$regexps = array (
	"name" => "/^[A-ZĄ-ŻŁŃ][a-zą-żłń]+$/",
	"surname" => "/^[A-ZĄ-ŻŁŃ][a-zą-żłń]+(?:-[A-ZĄ-ŻŁŃ][a-za-ż]+)?$/",
	"email" => '/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/',
	"special_characters" => '/\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\_|\+|\||\{|\}|\:|\"|<|>|\?|`|\-|\=|\\|\[|\]|\;|\'|\,|\.|\//',
	"uppercase_letters" => "/[A-ZĄ-ŻŁŃ]/",
	"lowercase_letters" => "/[a-zą-żłń]/",
	"numbers" => "/[0-9]/",
	"phone_number" => '/^\+?[0-9\- ]+$/',
	"www" => '%^(?:(?:https?|ftp)://)(?:\S+(?::\S*)?@|\d{1,3}(?:\.\d{1,3}){3}|(?:(?:[a-z\d\x{00a1}-\x{ffff}]+-?)*[a-z\d\x{00a1}-\x{ffff}]+)(?:\.(?:[a-z\d\x{00a1}-\x{ffff}]+-?)*[a-z\d\x{00a1}-\x{ffff}]+)*(?:\.[a-z\x{00a1}-\x{ffff}]{2,6}))(?::\d+)?(?:[^\s]*)?$%iu',
);

$countries = array (
	"Afganistan",
	"Albania",
	"Algieria",
	"Andora",
	"Angola",
	"Antigua i Barbuda",
	"Arabia Saudyjska",
	"Argentyna",
	"Armenia",
	"Australia",
	"Austria",
	"Azerbejdżan",
	"Bahamy",
	"Bahrajn",
	"Bangladesz",
	"Barbados",
	"Belgia",
	"Belize",
	"Benin",
	"Bhutan",
	"Białoruś",
	"Boliwia",
	"Bośnia i Hercegowina",
	"Botswana",
	"Brazylia",
	"Brunei",
	"Bułgaria",
	"Burkina Faso",
	"Burundi",
	"Chile",
	"Chiny",
	"Chorwacja",
	"Cypr",
	"Czad",
	"Czarnogóra",
	"Czechy",
	"Dania",
	"Demokratyczna Republika Konga",
	"Dominika",
	"Dominikana",
	"Dżibuti",
	"Egipt",
	"Ekwador",
	"Erytrea",
	"Estonia",
	"Etiopia",
	"Fidżi",
	"Filipiny",
	"Finlandia",
	"Francja",
	"Gabon",
	"Gambia",
	"Ghana",
	"Grecja",
	"Grenada",
	"Gruzja",
	"Gujana",
	"Gwatemala",
	"Gwinea",
	"Gwinea Bissau",
	"Gwinea Równikowa",
	"Haiti",
	"Hiszpania",
	"Holandia",
	"Honduras",
	"Indie",
	"Indonezja",
	"Irak",
	"Iran",
	"Irlandia",
	"Islandia",
	"Izrael",
	"Jamajka",
	"Japonia",
	"Jemen",
	"Jordania",
	"Kambodża",
	"Kamerun",
	"Kanada",
	"Katar",
	"Kazachstan",
	"Kenia",
	"Kirgistan",
	"Kiribati",
	"Kolumbia",
	"Komory",
	"Kongo",
	"Korea Południowa",
	"Korea Północna",
	"Kostaryka",
	"Kuba",
	"Kuwejt",
	"Laos",
	"Lesotho",
	"Liban",
	"Liberia",
	"Libia",
	"Liechtenstein",
	"Litwa",
	"Luksemburg",
	"Łotwa",
	"Macedonia",
	"Madagaskar",
	"Malawi",
	"Malediwy",
	"Malezja",
	"Mali",
	"Malta",
	"Maroko",
	"Mauretania",
	"Mauritius",
	"Meksyk",
	"Mikronezja",
	"Mjanma",
	"Mołdawia",
	"Monako",
	"Mongolia",
	"Mozambik",
	"Namibia",
	"Nauru",
	"Nepal",
	"Niemcy",
	"Niger",
	"Nigeria",
	"Nikaragua",
	"Norwegia",
	"Nowa Zelandia",
	"Oman",
	"Pakistan",
	"Palau",
	"Panama",
	"Papua-Nowa Gwinea",
	"Paragwaj",
	"Peru",
	"Polska",
	"Południowa Afryka",
	"Portugalia",
	"Republika Środkowoafrykańska",
	"Republika Zielonego Przylądka",
	"Rosja",
	"Rumunia",
	"Rwanda",
	"Saint Kitts i Nevis",
	"Saint Lucia",
	"Saint Vincent i Grenadyny",
	"Salwador",
	"Samoa",
	"San Marino",
	"Senegal",
	"Serbia",
	"Seszele",
	"Sierra Leone",
	"Singapur",
	"Słowacja",
	"Słowenia",
	"Somalia",
	"Sri Lanka",
	"Stany Zjednoczone",
	"Suazi",
	"Sudan",
	"Sudan Południowy",
	"Surinam",
	"Syria",
	"Szwajcaria",
	"Szwecja",
	"Tadżykistan",
	"Tajlandia",
	"Tanzania",
	"Timor Wschodni",
	"Togo",
	"Tonga",
	"Trynidad i Tobago",
	"Tunezja",
	"Turcja",
	"Turkmenistan",
	"Tuvalu",
	"Uganda",
	"Ukraina",
	"Urugwaj",
	"Uzbekistan",
	"Vanuatu",
	"Watykan",
	"Wenezuela",
	"Węgry",
	"Wielka Brytania",
	"Wietnam",
	"Włochy",
	"Wybrzeże Kości Słoniowej",
	"Wyspy Marshalla",
	"Wyspy Salomona",
	"Wyspy Świętego Tomasza i Książęca",
	"Zambia",
	"Zimbabwe",
	"Zjednoczone Emiraty Arabskie"
);

require_once "msgs.php";

?>
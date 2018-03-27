<?php

function get_profile_page()
{
	if(empty($_GET["tab"]))
		include "profile_about.php";
	else
	{
		switch($_GET["tab"])
		{
			case "tablica":
				include "profile_board.php";
				break;
			case "znajomi":
				include "profile_friends.php";
				break;
			case "zdjecia":
				include "profile_photos.php";
				break;
		}
	}
}

?>
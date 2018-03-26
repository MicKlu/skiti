<!DOCTYPE html>
<html lang="pl-PL">
	<head>
		<title></title>
		<meta charset="UTF-8" />
		<meta name="description" content="" />
		<meta name="keywords" content="" />
		<meta name="author" content="" />
		<link rel="stylesheet" href="css/common.css" />
		<link rel="stylesheet" href="css/main.css" />
		<link rel="icon" href="img/favicon.png" />
		<script src="scripts/jquery-3.3.1.min.js"></script>
		<script src="scripts/fontawesome-all.min.js"></script>
		<script src="scripts/common.js"></script>
		<script src="scripts/main.js"></script>
	</head>
	<body>
		<nav id="navbar">
			<div class="left-pane">
				<a class="brand" href="/">
					<img class="logo" src="img/logo.svg" /> dsa
				</a>
				<!-- Zalogowany -->
				<form class="input-search" action="">
					<input type="text" placeholder="Wyszukaj" size="48" />
					<button type="submit"><i class="fas fa-search"></i></button>
				</form>
			</div>
			<div class="right-pane">
				<!-- Zalogowany -->
				<ul class="navbar-menu">
					<li><a href="#"><img class="navbar-user-avatar" src="img/logo.svg" />{Imię i nazwisko}</a></li>
					<li><a href="#">Ustawienia</a></li>
					<li><a href="#">Wyloguj</a></li>
				</ul>
				<!-- Nie zalogowany -->
				<form action="" method="post">
					<input type="text" id="email" placeholder="Email" />
					<input type="password" id="password" placeholder="Hasło" />
					<input type="submit" value="Zaloguj" />
				</form>
				
			</div>
		</nav>
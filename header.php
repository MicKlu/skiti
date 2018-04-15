<?php require_once "common.php"; ?>
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
				<a class="brand" href="index.php">
					<img class="logo" src="img/logo.png" /> dsa
				</a>
				<?php if(isset($_SESSION["user_id"])) : ?>
				<div id="search-form" class="input-search">
					<input id="search" type="text" placeholder="Wyszukaj" size="48" autocomplete="off" />
					<button><i class="fas fa-search"></i></button>
					<div id="search-results"></div>
				</div>
				<?php endif; ?>
			</div>
			<div class="right-pane">
				<?php if(isset($_SESSION["user_id"])) : ?>
				<ul class="navbar-menu">
					<li><a href="profil.php?tab=tablica"><div class="navbar-user-avatar"><img src="<?php user_avatar(); ?>" /><?php user_full_name(); ?></div><?php user_full_name(); ?></a></li>
					<li><a href="ustawienia.php">Ustawienia</a></li>
					<li><a href="logout.php">Wyloguj</a></li>
				</ul>
				<?php else : ?>
				<span id="login-error"><?php get_login_alert(); ?></span>
				<script>showLoginAlert();</script>
				<form action="login.php" method="post">
					<input type="text" name="email" placeholder="Email" />
					<input type="password" name="password" placeholder="Hasło" />
					<input type="submit" value="Zaloguj" />
				</form>
				<?php endif; ?>
			</div>
		</nav>
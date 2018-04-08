<?php
	session_start();
	if(!isset($_SESSION["user_id"]))
	{
		header("Location: index.php");
		die();
	}
?>
<?php require "header.php" ?>
<?php
	$profile_id = null;
	if(!empty($_GET["id"]) && does_user_exists($_GET["id"]))
		$profile_id = $_GET["id"];
?>
<main id="profile-container">
	<div id="profile-header-container">
		<div id="profile-background">
			<img src="img/mat.jpg" />
		</div>
		<div id="profile-header">
			<div id="profile-avatar">
				<img src="img/avatar_placeholder.png" />
			</div>
			<h2><?php user_full_name($profile_id); ?></h2>
		</div>
	</div>
	<div id="profile-menu">
		<ul>
			<li><a href="profil.php?id=<?php echo $profile_id ?>">Informacje</a></li>
			<li><a href="profil.php?id=<?php echo $profile_id ?>&tab=tablica">Tablica wiadomości</a></li>
			<li><a href="profil.php?id=<?php echo $profile_id ?>&tab=znajomi">Znajomi</a></li>
			<li><a href="profil.php?id=<?php echo $profile_id ?>&tab=zdjecia">Zdjęcia</a></li>
		</ul>
	</div>
	<div id="profile-content">
		<?php get_profile_page(); ?>
	</div>
</main>
<?php require "footer.php" ?>
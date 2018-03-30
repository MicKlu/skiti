<?php require "header.php" ?>
<main id="profile-container">
	<div id="profile-header-container">
		<div id="profile-background">
			<img src="img/mat.jpg" />
		</div>
		<div id="profile-header">
			<div id="profile-avatar">
				<img src="img/avatar_placeholder.png" />
			</div>
			<h2>{Imię i nazwisko}</h2>
		</div>
	</div>
	<div id="profile-menu">
		<ul>
			<li><a href="profil.php?id=">Informacje</a></li>
			<li><a href="profil.php?id=&tab=tablica">Tablica wiadomości</a></li>
			<li><a href="profil.php?id=&tab=znajomi">Znajomi</a></li>
			<li><a href="profil.php?id=&tab=zdjecia">Zdjęcia</a></li>
		</ul>
	</div>
	<div id="profile-content">
		<?php
			get_profile_page();
		?>
	</div>
</main>
<?php require "footer.php" ?>
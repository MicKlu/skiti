<?php
	$profile_id = null;	//Profil zalogowanego użytkownika
	if(!empty($_GET["id"]) && does_user_exist($_GET["id"]) && $_GET["id"] != $_SESSION["user_id"])
		$profile_id = $_GET["id"];	//Profil przeglądanego użytkownika
?>
<section id="profile-friends">
	<?php if($profile_id === null) :	//Linia 2. ?>
	<?php if(is_user_invited_by_anyone()) : ?>
	<h2>Oczekujące zaproszenia</h2>
	<div class="row" id="profile-friends-user-invited">
		<div class="col-1"></div>
		<div class="col-1"></div>
		<div class="col-1"></div>
	</div>
	<?php endif; ?>
	<?php if(is_any_friend_invited()) : ?>
	<h2>Wysłane zaproszenia</h2>
	<div class="row" id="profile-friends-friends-invited">
		<div class="col-1"></div>
		<div class="col-1"></div>
		<div class="col-1"></div>
	</div>
	<?php endif; ?>
	<?php endif; ?>
	<h2>Znajomi</h2>
	<div class="row" id="profile-friends-accepted">
		<div class="col-1"></div>
		<div class="col-1"></div>
		<div class="col-1"></div>
	</div>
</section>
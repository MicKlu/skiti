<?php global $profile_id; ?>
<section id="profile-about">
	<section>
		<h2>Informacje podstawowe</h2>
		<div class="row">
			<div class="col-2">
				<ul>
					<li><span>Imię</span><?php user_info("firstname", $profile_id) ?></li>
					<li><span>Drugie imię</span><?php user_info("secondname", $profile_id) ?></li>
					<li><span>Nazwisko</span><?php user_info("surname", $profile_id) ?></li>
					<li><span>Ksywka</span><?php user_info("nickname", $profile_id) ?></li>
					<li><span>Data urodzenia</span><?php user_birthdate($profile_id) ?></li>
					<li><span>Wiek</span><?php user_age($profile_id) ?></li>
					<li><span>Płeć</span><?php user_sex($profile_id) ?></li>
					<li><span>Strona WWW</span><?php user_www($profile_id) ?></li>
				</ul>
			</div>
			<div class="col-2">
				<dl>
					<dt>Biografia</dt>
					<dd><?php user_info("bio", $profile_id) ?></dd>
				</dl>
			</div>
		</div>
	</section>
	<section>
		<h2>Zamieszkanie</h2>
		<div class="row">
			<div class="col-1">
				<ul>
					<li><span>Kraj</span><?php user_info("country", $profile_id) ?></li>
					<li><span>Region</span><?php user_info("region", $profile_id) ?></li>
					<li><span>Miasto</span><?php user_info("city", $profile_id) ?></li>
				</ul>
			</div>
		</div>
	</section>
	<section>
		<h2>Dodatkowe informacje kontaktowe</h2>
		<div class="row">
			<div class="col-1">
				<ul>
					<li><span>Email</span><?php user_info("email", $profile_id) ?></li>
					<li><span>Telefon</span><?php user_info("phone_number", $profile_id) ?></li>
					<li><span>Skype</span><?php user_info("skype", $profile_id) ?></li>
				</ul>
			</div>
		</div>
	</section>
	<section>
		<h2>Inne</h2>
		<div class="row">
			<div class="col-1">
				<ul>
					<li><span>Data dołączenia</span><?php user_registerdate($profile_id) ?></li>
				</ul>
			</div>
		</div>
	</section>
</section>
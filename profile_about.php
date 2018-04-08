<section id="profile-about">
	<section>
		<h2>Informacje podstawowe</h2>
		<div class="row">
			<div class="col-2">
				<ul>
					<li><span>Imię</span><?php user_info("firstname") ?></li>
					<li><span>Drugie imię</span><?php user_info("secondname") ?></li>
					<li><span>Nazwisko</span><?php user_info("surname") ?></li>
					<li><span>Ksywka</span><?php user_info("nickname") ?></li>
					<li><span>Data urodzenia</span><?php user_birthdate() ?></li>
					<li><span>Wiek</span><?php user_age() ?></li>
					<li><span>Płeć</span><?php user_sex() ?></li>
					<li><span>Strona WWW</span><?php user_www() ?></li>
				</ul>
			</div>
			<div class="col-2">
				<dl>
					<dt>Biografia</dt>
					<dd><?php user_info("bio") ?></dd>
				</dl>
			</div>
		</div>
	</section>
	<section>
		<h2>Zamieszkanie</h2>
		<div class="row">
			<div class="col-1">
				<ul>
					<li><span>Kraj</span><?php user_info("country") ?></li>
					<li><span>Region</span><?php user_info("region") ?></li>
					<li><span>Miasto</span><?php user_info("city") ?></li>
				</ul>
			</div>
		</div>
	</section>
	<section>
		<h2>Dodatkowe informacje kontaktowe</h2>
		<div class="row">
			<div class="col-1">
				<ul>
					<li><span>Email</span><?php user_info("email") ?></li>
					<li><span>Telefon</span><?php user_info("phone_number") ?></li>
					<li><span>Skype</span><?php user_info("skype") ?></li>
				</ul>
			</div>
		</div>
	</section>
	<section>
		<h2>Inne</h2>
		<div class="row">
			<div class="col-1">
				<ul>
					<li><span>Data dołączenia</span><?php user_registerdate() ?></li>
				</ul>
			</div>
		</div>
	</section>
</section>
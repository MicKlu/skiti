<?php
	session_start();
	if(isset($_SESSION["user_id"]))
	{
		header("Location: profil.php");
		die();
	}
?>
<?php require "header.php" ?>
<main>
	<section class="jumbotron">
		<img class="logo" src="img/logo.png" />
		<h1>dsa</h1>
		<h2>Kolejny portal społecznościowy</h2>
		<a class="button" href="#register">Zarejestruj się</a>
	</section>
	<section class="container" id="features">
		<div class="row">
			<div class="col-4 feature">
				<header>
					<i class="fas fa-users feature-icon"></i>
					<h4>Kontaktuj się ze znajomymi</h4>
				</header>
				<p>Wyszukuj i dodawaj znajomych, aby pozostawać z nimi w kontakcie. Zostawiaj wiadomości na tablicach, aby szybko mogli je odczytać.</p>
			</div>
			<div class="col-4 feature">
				<header>
					<i class="far fa-images feature-icon"></i>
					<h4>Udostępniaj zdjęcia</h4>
				</header>
				<p>Obecnie każdy portal społecznościowy umożliwia udostępnianie zdjęć. Czemu ten miałby być gorszy? Dodawaj zdjęcia i wyróżniaj je na profilu.</p>
			</div>
			<div class="col-4 feature">
				<header>
					<i class="fas fa-check feature-icon"></i>
					<h4>Prostota obsługi</h4>
				</header>
				<p>Nasz serwis powstał z myślą o jego użytkownikach. Najważniejsze funkcje znajdują się w dobrze widocznych miejscach.</p>
			</div>
		</div>
	</section>
	<section class="container" id="register">
		<h1 class="text-center">Zarejestruj się</h1>
		<div id="register-container">
			<div id="register-error">
				<p><?php get_register_alert(); ?></p>
				<script>showRegisterAlert();</script>
			</div>
			<form action="register.php" method="post">
				<div class="input-group">
					<input type="text" name="firstname" placeholder="Imię" />
					<input type="text" name="surname" placeholder="Nazwisko" />
				</div>
				<div class="input-group">
					<input type="text" name="email" placeholder="Email" />
				</div>
				<div class="input-group">
					<input type="password" name="password" placeholder="Hasło" />
					<input type="password" name="rpassword" placeholder="Powtórz hasło" />
				</div>
				<label>Data urodzenia</label>
				<div class="input-group" id="birthdate">
					<select class="form-input" name="birthday"></select>
					<select class="form-input" name="birthmonth"></select>
					<select class="form-input" name="birthyear"></select>
				</div>
				<label>Płeć</label>
				<div class="input-group">
					<label class="form-input">
						<input type="radio" name="sex" value="m" />
						Mężczyzna
					</label>
					<label class="form-input">
						<input type="radio" name="sex" value="k" />
						Kobieta
					</label>
				</div>
				<input class="button-primary" type="submit" value="Zarejestruj" />
			</form>
		</div>
	</section>
</main>
<?php require "footer.php" ?>
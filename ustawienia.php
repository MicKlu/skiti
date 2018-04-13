<?php
	session_start();
	if(!isset($_SESSION["user_id"]))
	{
		header("Location: index.php");
		die();
	}
?>
<?php require "header.php" ?>
<main id="profile-settings">
	<form>
		<div class="settings-panel">
			<div class="settings-panel-header">
				<h4>Ustawienia profilu (informacje podstawowe)</h4>
			</div>
			<div class="settings-panel-content-wrapper">
				<div class="settings-panel-content settings-form">
					<div class="row input-group">
						<div class="col-1">
							<label>Imię:</label>
						</div>
						<div class="col-4">
							<input type="text" name="firstname" />
						</div>
					</div>
					<div class="row input-group">
						<div class="col-1">
							<label>Drugie imię:</label>
						</div>
						<div class="col-4">
							<input type="text" name="secondname" />
						</div>
					</div>
					<div class="row input-group">
						<div class="col-1">
							<label>Nazwisko:</label>
						</div>
						<div class="col-4">
							<input type="text" name="surname" />
						</div>
					</div>
					<div class="row input-group">
						<div class="col-1">
							<label>Ksywka:</label>
						</div>
						<div class="col-4">
							<input type="text" name="nickname" />
						</div>
					</div>
					<div class="row input-group">
						<div class="col-1">
							<label>Data urodzenia:</label>
						</div>
						<div class="col-4">
							<div class="input-group" id="birthdate">
								<select class="form-input" name="birthday"></select>
								<select class="form-input" name="birthmonth"></select>
								<select class="form-input" name="birthyear"></select>
							</div>
						</div>
					</div>
					<div class="row input-group">
						<div class="col-1">
							<label>Płeć:</label>
						</div>
						<div class="col-4">
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
						</div>
					</div>
					<div class="row input-group">
						<div class="col-1">
							<label>Zdjęcie profilowe:</label>
						</div>
						<div class="col-4">
							<div class="col-4">
								<label class="button file-button">
									<i class="fas fa-upload"></i> Prześlij plik... <input type="file">
								</label>
								<button class="button"><i class="fas fa-times"></i> Usuń zdjęcie</button>
							</div>
						</div>
					</div>
					<div class="row input-group">
						<div class="col-1">
							<label>Tło profilowe:</label>
						</div>
						<div class="col-4">
							<label class="button file-button">
								<i class="fas fa-upload"></i> Prześlij plik... <input type="file">
							</label>
							<button class="button"><i class="fas fa-times"></i> Usuń zdjęcie</button>
						</div>
					</div>
				</div>
				<div class="settings-panel-collapse"><i class="fas fa-angle-up"></i></div>
			</div>
		</div>
		<div class="settings-panel">
			<div class="settings-panel-header">
				<h4>Ustawienia profilu (informacje dodatkowe)</h4>
			</div>
			<div class="settings-panel-content-wrapper">
				<div class="settings-panel-content settings-form">
					<div class="row input-group">
						<div class="col-1">
							<label>Kraj:</label>
						</div>
						<div class="col-4">
							<input type="text" name="country" />
						</div>
					</div>
					<div class="row input-group">
						<div class="col-1">
							<label>Region:</label>
						</div>
						<div class="col-4">
							<input type="text" name="region" />
						</div>
					</div>
					<div class="row input-group">
						<div class="col-1">
							<label>Miasto:</label>
						</div>
						<div class="col-4">
							<input type="text" name="city" />
						</div>
					</div>
					<div class="row input-group">
						<div class="col-1">
							<label>Telefon:</label>
						</div>
						<div class="col-4">
							<input type="text" name="phone_number" />
						</div>
					</div>
					<div class="row input-group">
						<div class="col-1">
							<label>Skype:</label>
						</div>
						<div class="col-4">
							<input type="text" name="skype" />
						</div>
					</div>
					<div class="row input-group">
						<div class="col-1">
							<label>Strona WWW:</label>
						</div>
						<div class="col-4">
							<input type="text" name="www" />
						</div>
					</div>
					<div class="row input-group">
						<div class="col-1">
							<label>Biografia:</label>
						</div>
						<div class="col-4">
							<textarea class="input" name="bio"></textarea>
						</div>
					</div>
				</div>
				<div class="settings-panel-collapse"><i class="fas fa-angle-up"></i></div>
			</div>
		</div>
		<div class="settings-panel">
			<div class="settings-panel-header">
				<h4>Ustawienia konta</h4>
			</div>
			<div class="settings-panel-content-wrapper">
				<div class="settings-panel-content settings-form">
					<div class="row input-group">
						<div class="col-1">
							<label>Zmień hasło:</label>
						</div>
						<div class="col-4">
							<input type="password" name="password" />
						</div>
					</div>
					<div class="row input-group">
						<div class="col-1">
							<label>Powtórz hasło:</label>
						</div>
						<div class="col-4">
							<input type="password" name="rpassword" />
						</div>
					</div>
					<div class="row input-group">
						<div class="col-1">
							<label>Email:</label>
						</div>
						<div class="col-4">
							<input type="text" name="email" />
						</div>
					</div>
				</div>
				<div class="settings-panel-collapse"><i class="fas fa-angle-up"></i></div>
			</div>
		</div>
		<input class="button-primary" type="submit" value="Zapisz zmiany" />
	</form>
</main>
<?php require "footer.php" ?>
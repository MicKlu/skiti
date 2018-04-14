<?php
	session_start();
	if(!isset($_SESSION["user_id"]))
	{
		header("Location: index.php");
		die();
	}
	
	require_once "common.php";
	
	if($_SERVER["REQUEST_METHOD"] == "POST")
		process_update_user_info();
?>
<?php require "header.php" ?>
<main id="profile-settings">
	<div id="user-info-update-error">
		<p><?php get_user_info_update_alert(); ?></p>
		<script>showUserUpdateInfoErrorAlert();</script>
	</div>
	<div id="user-info-update-success">
		<p>Zmiany zostały zapisane</p>
		<script></script>
	</div>
	<form method="post" enctype="multipart/form-data">
		<div class="settings-panel">
			<div class="settings-panel-header">
				<h4>Ustawienia profilu (informacje podstawowe)</h4>
			</div>
			<div class="settings-panel-content-wrapper">
				<div class="settings-panel-content settings-form">
					<div class="row input-group">
						<div class="col-1">
							<label>Imię*:</label>
						</div>
						<div class="col-4">
							<input type="text" name="firstname" value="<?php user_info("firstname", null, true) ?>" />
						</div>
					</div>
					<div class="row input-group">
						<div class="col-1">
							<label>Drugie imię:</label>
						</div>
						<div class="col-4">
							<input type="text" name="secondname" value="<?php user_info("secondname", null, true) ?>" />
						</div>
					</div>
					<div class="row input-group">
						<div class="col-1">
							<label>Nazwisko*:</label>
						</div>
						<div class="col-4">
							<input type="text" name="surname" value="<?php user_info("surname", null, true) ?>" />
						</div>
					</div>
					<div class="row input-group">
						<div class="col-1">
							<label>Ksywka:</label>
						</div>
						<div class="col-4">
							<input type="text" name="nickname" value="<?php user_info("nickname", null, true) ?>" />
						</div>
					</div>
					<div class="row input-group">
						<div class="col-1">
							<label>Data urodzenia*:</label>
						</div>
						<div class="col-4">
							<div class="input-group" id="birthdate" data-default-date="<?php user_birthdate() ?>">
								<select class="form-input" name="birthday"></select>
								<select class="form-input" name="birthmonth"></select>
								<select class="form-input" name="birthyear"></select>
							</div>
						</div>
					</div>
					<div class="row input-group">
						<div class="col-1">
							<label>Płeć*:</label>
						</div>
						<div class="col-4">
							<div class="input-group">
								<label class="form-input">
									<input type="radio" name="sex" value="m" <?php echo (get_user_info("sex") == "m") ? "checked" : "" ?>/>
									Mężczyzna
								</label>
								<label class="form-input">
									<input type="radio" name="sex" value="k" <?php echo (get_user_info("sex") == "k") ? "checked" : "" ?> />
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
							<label class="button file-button">
								<i class="fas fa-upload"></i> Prześlij plik... <input type="file" accept="image/*" name="avatar">
							</label>
							<?php if(get_user_avatar_type() != AVATAR_PLACEHOLDER) : ?>
							<button class="button" id="avatar-delete" type="button"><i class="fas fa-times"></i> Usuń zdjęcie</button>
							<?php endif;?>
						</div>
					</div>
					<div class="row input-group">
						<div class="col-1">
							<label>Tło profilowe:</label>
						</div>
						<div class="col-4">
							<label class="button file-button">
								<i class="fas fa-upload"></i> Prześlij plik... <input type="file" accept="image/*" name="background">
							</label>
							<?php if(get_user_background_type() != BACKGROUND_NONE) : ?>
							<button class="button" id="background-delete" type="button"><i class="fas fa-times"></i> Usuń zdjęcie</button>
							<?php endif;?>
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
							<select name="country">
								<?php foreach($countries as $i => $country) : ?>
								<option value="<?php echo ($i + 1) ?>" <?php echo (get_user_info("country", null, true) == $i + 1) ? "selected" : "" ?>><?php echo $country ?></option>
								<?php endforeach;?>
							</select>
						</div>
					</div>
					<div class="row input-group">
						<div class="col-1">
							<label>Region:</label>
						</div>
						<div class="col-4">
							<input type="text" name="region" value="<?php user_info("region", null, true) ?>" />
						</div>
					</div>
					<div class="row input-group">
						<div class="col-1">
							<label>Miasto:</label>
						</div>
						<div class="col-4">
							<input type="text" name="city" value="<?php user_info("city", null, true) ?>" />
						</div>
					</div>
					<div class="row input-group">
						<div class="col-1">
							<label>Telefon:</label>
						</div>
						<div class="col-4">
							<input type="text" name="phone_number" value="<?php user_info("phone_number", null, true) ?>" />
						</div>
					</div>
					<div class="row input-group">
						<div class="col-1">
							<label>Skype:</label>
						</div>
						<div class="col-4">
							<input type="text" name="skype" value="<?php user_info("skype", null, true) ?>" />
						</div>
					</div>
					<div class="row input-group">
						<div class="col-1">
							<label>Strona WWW:</label>
						</div>
						<div class="col-4">
							<input type="text" name="www" value="<?php user_info("www", null, true) ?>" />
						</div>
					</div>
					<div class="row input-group">
						<div class="col-1">
							<label>Biografia:</label>
						</div>
						<div class="col-4">
							<textarea class="input" name="bio"><?php user_info("bio", null, true) ?></textarea>
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
							<label>Email*:</label>
						</div>
						<div class="col-4">
							<input type="text" name="email" value="<?php user_info("email", null, true) ?>" />
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
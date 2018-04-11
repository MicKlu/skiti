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
				<h4>Ustawienia profilu</h4>
			</div>
			<div class="settings-panel-content-wrapper">
				<div class="settings-panel-content">dsa dsa dsa dsa dsa</div>
				<div class="settings-panel-collapse"><i class="fas fa-angle-up"></i></div>
			</div>
		</div>
		<div class="settings-panel">
			<div class="settings-panel-header">
				<h4>Ustawienia konta</h4>
			</div>
			<div class="settings-panel-content-wrapper">
				<div class="settings-panel-content">dsa dsa dsa dsa dsa</div>
				<div class="settings-panel-collapse"><i class="fas fa-angle-up"></i></div>
			</div>
		</div>
	</form>
</main>
<?php require "footer.php" ?>
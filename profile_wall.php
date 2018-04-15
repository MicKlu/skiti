<?php global $profile_id; ?>

<section id="profile-wall">
	<div id="profile-wall-new-thread">
		<button id="add-thread-button" class="button-primary">Zostaw wiadomość</button>
		<form id="profile-wall-new-thread-form" method="post" action="common.php?action=new_thread&u_id=<?php echo $profile_id ?>">
			<div id="new-thread-error">
				<?php get_new_thread_alert(); ?>
			</div>
			<script>showNewThreadErrorAlert()</script>
			<label>Temat:</label>
			<div class="input-group">
				<input class="" type="text" name="topic" />
			</div>
			<label>Treść wiadomości:</label>
			<div class="input-group">
				<textarea class="input" name="msg" ></textarea>
			</div>
			<div class="text-right">
				<button class="button-primary">Wyślij wiadomość</button>
			</div>
		</form>
	</div>
	<div class="row">
		<div class="col-2"></div>
		<div class="col-1"></div>
	</div>
</section>
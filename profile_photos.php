<?php global $profile_id; ?>

<section id="profile-photos">
	<?php if($profile_id === null) : ?>
	<div id="profile-photos-menu">
		<button class="button-primary">Dodaj zdjęcie</button>
		<form id="profile-photos-add" method="post" action="common.php?action=add_image" enctype="multipart/form-data">
			<div id="add-image-error">
				<?php get_add_image_alert(); ?>
			</div>
			<script>showAddImageErrorAlert()</script>
			<label>Wybierz plik:</label>
			<div class="input-group">
				<label class="button file-button">
					<i class="fas fa-upload"></i> Wybierz plik... <input type="file" accept="image/*" name="image">
				</label>
				<div class="input file-input"></div>
			</div>
			<label>Tytuł (opcjonalnie):</label>
			<div class="input-group">
				<input type="text" name="title" />
			</div>
			<label>Podpis (opcjonalnie):</label>
			<div class="input-group">
				<input type="text" name="caption" />
			</div>
				
			<div class="text-right">
				<input class="button-primary" type="submit" value="Dodaj" />
			</div>
		</form>
	</div>
	<?php endif; ?>
	<!-- Tutaj generują się obrazy -->
</section>
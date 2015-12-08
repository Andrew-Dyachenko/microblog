<?php include('header.php'); ?>
<div class="notes" id="notes">
	<form class="notesList" onsubmit="javascript: return false;" novalidate></form>
	<div class="viewNote" id="viewNote"></div>
	<form class="addNote" onsubmit="javascript: return false;" novalidate>
		<fieldset class="noteName">
			<legend>Имя заметки:</legend>
			<div class="inputWrapper">
				<input type="text" id="noteName" maxlength="70" autofocus pattern="[\s\S]{1,70}" required title="Название заметки должно состоять из одной или более букв">
			</div>
		</fieldset>
		<fieldset class="noteText">
			<legend>Текст заметки:</legend>
			<div class="textareaWrapper">
				<textarea name="addNote" id="noteText" rows="4" pattern=".+?(?:[\s'].+?){2,}" maxlength="255" required title="Заметка должна содержать хотя бы три фразы"></textarea>
			</div>
		</fieldset>
		<button id="saveNote" disabled>
			Сохранить
		</button>
	</form>
</div>
<div class="clear"></div>
<?php include('footer.php'); ?>
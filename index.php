<?php include('header.php'); ?>
<div class="notes" id="notes">
	<form class="notesList" onsubmit="javascript: return false;" novalidate></form>
	<div class="viewNote" id="viewNote"></div>
	<form class="addNote" onsubmit="javascript: return false;" novalidate>
		<fieldset class="noteName">
			<legend>Имя заметки:</legend>
			<div class="inputWrapper">
				<input type="text" id="noteName" maxlength="70" autofocus pattern="^[A-Za-zА-Яа-я0-9_]{1,70}$" required placeholder="Введите имя заметки" title="Название заметки должно состоять из одной или более символов [A-Za-zА-Яа-я0-9_]. Не разрешается использовать пробельные символы.">
			</div>
		</fieldset>
		<fieldset class="noteText">
			<legend>Текст заметки:</legend>
			<div class="textareaWrapper">
				<textarea name="addNote" id="noteText" rows="4" pattern=".+?(?:[\s'].+?){2,}" maxlength="255" required placeholder="Введите как минимум три фразы" title="Заметка должна содержать хотя бы три фразы"></textarea>
			</div>
		</fieldset>
		<button id="saveNote" disabled>
			Сохранить
		</button>
	</form>
</div>
<div class="clear"></div>
<?php include('footer.php'); ?>
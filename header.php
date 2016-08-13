<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<title>Microblog</title> 

	<meta name="Keywords" content="Ключевые слова">
	<meta name="description" content="Описание сайта">
    
	<?php include('favicon.php'); ?>
	
	<link rel="stylesheet" href="/bower_components/bootstrap/dist/css/bootstrap.css">
	<link rel="stylesheet" href="/bower_components/bootstrap/dist/css/bootstrap-theme.css">
	<link rel="stylesheet" href="/bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.min.css">
	<link rel="stylesheet" href="/dist/css/common.css">

	<script src="/bower_components/jquery/dist/jquery.min.js"></script>
	<script src="/bower_components/jquery-migrate/jquery-migrate.min.js"></script>
	<script src="/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
	<script src="/bower_components/jquery-ui/jquery-ui.min.js"></script>
	<script src="/bower_components/jquery-mousewheel/jquery.mousewheel.min.js"></script>
	<script src="/bower_components/jquery.cookie/jquery.cookie.js"></script>
	<script src="/bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js"></script>
	<script src="/dist/js/main.js" defer="defer"></script>

</head>
<body>
	<div class="body">
	    <div class="head">
			<div class="headContainer">
				<button onclick="javascript: window.localStorage.clear();">
					Очистить локальное хранилище
				</button>
				<button onclick="javascript: void MB.myCookies.clear();">
					Очистить cookie
				</button>
			</div>
	    </div>
	    <div class="main">
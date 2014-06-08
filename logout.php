<?php session_start(); ?>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<?php

//將session清空
unset($_SESSION["id"]);
unset($_SESSION["password"]);
header('Location:index.html');

?>
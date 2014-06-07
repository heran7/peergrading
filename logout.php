<?php session_start(); ?>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<?php

//將session清空
unset($SESSION_["id"]);
unset($SESSION_["password"]);
header('Location:index.html');

?>
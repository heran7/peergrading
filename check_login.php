<?php session_start();
if($_SESSION[id]==""){
 echo "<script>alert('请登录后再尝试！');window.location.href='index.php';</script>";
 }
?>
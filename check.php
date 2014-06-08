<?php session_start(); ?>
<!--上方語法為啟用session，此語法要放在網頁最前方-->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<?php

//連接資料庫
//只要此頁面上有用到連接MySQL就要include它
require ("mysqlconnect.php");
$un = $_POST['username'];
$pw = $_POST['password'];


//搜尋資料庫資料
//$result = mysql_query("SELECT * FROM user WHERE id = $un and password = $pw");
$result = mysql_query("SELECT * FROM user WHERE id = $un");
$row =  mysql_fetch_array($result);

//echo $row;

//判斷帳號與密碼是否為空白
//以及MySQL資料庫裡是否有這個會員
if($result != null && $row['password'] == $pw){
	//將帳號寫入session，方便驗證使用者身份
	$_SESSION['id'] = $un;
	$_SESSION['password'] = $pw;

	if ($row['root'] == 1) {
		//echo '教師登入成功!';
		header('Location:teacherlogin.php');
	}
	else {
		//echo '學生登入成功!';
		//echo $_SESSION['id'];
		header('Location:studentlogin.php');
	}	
	
}
else
{
        //echo '登入失敗!';
        header('Location:index.html');
}
?>

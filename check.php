<?php session_start(); ?>
<!--上方語法為啟用session，此語法要放在網頁最前方-->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<?php
//連接資料庫
//只要此頁面上有用到連接MySQL就要include它
include("mysqlconnect.php");
$un = $_POST['username'];
$pw = $_POST['password'];


//搜尋資料庫資料
$result = mysql_query("Select * from user where id = $un and password = $pw");
$row = @mysql_fetch_row($result);


//判斷帳號與密碼是否為空白
//以及MySQL資料庫裡是否有這個會員
if($result != null){
	//將帳號寫入session，方便驗證使用者身份
	$SESSION_["id"] = $un;
	$SESSION_["password"] = $pw;

	if ($row[1] == 1) {
		header('Location:teacherlogin.html');
	}
	else {
		header('Location:studentlogin.html');
	}	
	
}
else
{
        //echo '登入失敗!';
        header('Location:index.html');
}
?>

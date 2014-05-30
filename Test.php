<?php
//require '(check.php)';
$username = "abc";
$password = "123";

if ($_POST['username'] == $username && $_POST['password'] == $password ) 
{
	//echo "Login Sucessfully.";
	//header("Refresh: 1; url = index.html");
	leftSL();
} 
else 
{
	echo "Login Failed.";
}




/*
// 比對其帳號與密碼
$sql = "SELECT realname, userlevel FROM user ";
$sql .= "WHERE username = '" . $loginname . "' ";
$sql .= "AND password = '" . $loginpswd . "' ";
$rs = mysql_db_query($cfgDatabaseName, $sql, $link);
$nT = mysql_num_rows($rs);

// 依檢查結果分別導向主作業畫面與錯誤警告畫面
if ( $nT ) {
  list($realname, $userlevel) = mysql_fetch_row($rs);

  // 設定 session 變數之初值
  $_SESSION["ssnUSERNAME"]  = $loginname;
  $_SESSION["ssnREALNAME"]  = $realname;
  $_SESSION["ssnUSERLEVEL"] = $userlevel;

  Header("location:main.php");
  exit;
}
else {
  Header("location:error.php");
  exit;
} 
 */
 
/*
session_start();
  if ( @$_SESSION["checkok"]<>"yes")
  {
    if (isset($_REQUEST["ID"]) && isset($_REQUEST["Password"])) 
    {
    $ID=$_REQUEST["ID"];
    $Password = $_REQUEST["Password"];
    //連結SQL Server
    $conn = mysql_connect("localhost", "root", "12345a");
    //選擇資料庫
    mysql_select_db("Member", $conn);
    //指定提取資料的校對字元表
    mysql_query("set character set big5");
    //建立SQL命令敘述
    $SQL = "Select * From membertest Where ID='" . $ID . "'";
    //執行SQL指令敘述,將執行後的結果集存放於RS中
    //此時RS的內容即是一個虛擬資料表
    $RS=mysql_query($SQL);
           //有取得資料記錄
        if ($Fields=mysql_fetch_array($RS))
        {
          //驗證會員帳號存在
          if ($Fields["ID"]==$ID)
            {
                 //驗證會員密碼是否正確
              if ($Fields["Password"]==$Password)
                {
                 session_register("checkok");
                    $_SESSION["checkok"]="yes";
                }
             }
             }
      }
*/ 
 
?>
<?php
//跟資料庫建立連接
$mysql_server_name="localhost"; //数据库服务器名称
$mysql_username="root"; // 连接数据库用户名
$mysql_password="root"; // 连接数据库密码
$mysql_database="logindata"; // 数据库的名字

// 连接到数据库
$connection = mysql_connect($mysql_server_name, $mysql_username,$mysql_password);
mysql_select_db("logindata", $connection);
/*if( $connection )
{
 die('数据库连接成功');
}
else
{
 die('连接失败');
}*/

//設定在用戶端使用的字元集
mysql_set_charset('utf8',$connection);

?>
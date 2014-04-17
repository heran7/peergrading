<?php
$username = "abc";
$password = "123";

if ($_POST['username'] == $username && $_POST['password'] == $password ) {
echo "Login Sucessfully.";
} else {
echo "Login Failed.";
}
?>
<?php
include 'connection.php';
$id = $_GET['id'];

$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$email = $_POST['email'];

$query = "UPDATE users 
          SET firstName = '$firstName', lastName = '$lastName', email = '$email'
          WHERE id='$id'";
mysqli_execute_query($conn, $query);
header('location:users.php');

?>
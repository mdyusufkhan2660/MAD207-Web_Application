<?php
include 'connection.php';
$id = $_GET['id'];
$query = "DELETE FROM users WHERE id='$id'";
mysqli_execute_query($conn, $query);
header('location:users.php');
?>
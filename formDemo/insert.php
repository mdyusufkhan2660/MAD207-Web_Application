<?php
include 'connection.php';
$uploadStatus = '';
$firstName = $_REQUEST['firstName'];
$lastName = $_REQUEST['lastName'];
$email = $_REQUEST['email'];
$targetDir = "images/";
$fileName = basename($_FILES['userImage']['name']);
$targetPath = $targetDir.$fileName;
if( isset($_POST["submit"]) && !empty($_FILES["userImage"]["name"]) ){
    if(move_uploaded_file($_FILES["userImage"]["tmp_name"],$targetPath)){
        $insertUserQuery = "INSERT INTO 
                            users (firstName, lastName, email, img)
                            VALUES ('".$firstName."', '".$lastName."', 
                                    '".$email."', '".$targetPath."')";
        $result = mysqli_execute_query($conn, $insertUserQuery);
        $uploadStatus = "User successfully added";
    }
    else{
        $uploadStatus = "File could not be moved";
    }
}
else{
    $uploadStatus = "Please select a file";
}
echo "<br>".$uploadStatus;
header('location:users.php');
?>
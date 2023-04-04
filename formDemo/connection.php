<?php

    $dbHost = "localhost";
    $dbUsername = "root";
    $dbPassword = "";
    $dbName = "myTestDB";

    $conn = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName);

    if($conn){
        echo "Connected to myTestDB";
    }
    else{
        echo "Database not connected";
    }

?>
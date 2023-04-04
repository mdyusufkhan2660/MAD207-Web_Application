<?php
    include 'connection.php';
?>
<html>
    <head>
        <title>Users</title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <table>
            <tr>
                <td>Id</td>
                <td>First Name</td>
                <td>Last Name</td>
                <td>Email</td>
                <td>Image</td>
            </tr>
            <?php  
                $getDataQuery = "SELECT * FROM users";
                $result = mysqli_execute_query($conn, $getDataQuery);
                if(mysqli_num_rows($result) > 0){
                    while($row = mysqli_fetch_assoc($result)){
                        echo "<tr>
                                <td>".$row['id']."</td>
                                <td>".$row['firstName']."</td>
                                <td>".$row['lastName']."</td>
                                <td>".$row['email']."</td>
                                <td><img src='".$row['img']."' width = '50' height = '50'></td>
                            </tr>";
                    }
                }
            ?>
        </table>
    </body>
</html>
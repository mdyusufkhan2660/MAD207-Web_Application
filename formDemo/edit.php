<?php
include 'connection.php';
$id = $_GET['id'];
$query = "SELECT * FROM users WHERE id = '$id'";
$result = mysqli_execute_query($conn, $query);
$row = mysqli_fetch_array($result);
?>
<html>
    <head>
        <title>User Edit Page</title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <form action="update.php?id=<?php echo $row['id'];?>" method="post">
            <table>
                <tr>
                    <td><label for="firstName">First Name:</label></td>
                    <td><input type="text" id="firstName" name="firstName" value="<?php echo $row['firstName'];?>"></td>
                </tr>
                <tr>
                    <td><label for="lastName">Last Name:</label></td>
                    <td><input type="text" id="lastName" name="lastName" value="<?php echo $row['lastName'];?>"></td>
                </tr>
                <tr>
                    <td><label for="email">Email:</label></td>
                    <td><input type="text" id="email" name="email" value="<?php echo $row['email'];?>"></td>
                </tr>
                <tr>
                    <td><a href="users.php">Go Back</a></td>
                    <td><input type="submit" name="submit"></td>
                </tr>
            </table>
        </form>
    </body>
</html>
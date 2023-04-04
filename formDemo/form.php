<html>
    <head>
        <title>User Form</title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <form action="insert.php" method="post" enctype="multipart/form-data">
            <table>
                <tr>
                    <td><label for="firstName">First Name</label></td>
                    <td><input type="text" id="firstName" name="firstName"></td>
                </tr>
                <tr>
                    <td><label for="lastName">Last Name</label></td>
                    <td><input type="text" id="lastName" name="lastName"></td>
                </tr>
                <tr>
                    <td><label for="email">Email</label></td>
                    <td><input type="text" id="email" name="email"></td>
                </tr>
                <tr>
                    <td><label for="img">Image</label></td>
                    <td><input type="file" id="userImage" name="userImage"></td>
                </tr>
                <tr>
                    <td colspan="2"><input type="submit" name="submit" value="Submit"></td>
                </tr>
            </table>
        </form>
    </body>
</html>
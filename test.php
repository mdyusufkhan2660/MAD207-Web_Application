<html>
    <head>
        <title>Getting data from database</title>
        <link rel="stylesheet" href="style.css">
        <!-- Connecting to database -->
        <?php
            $conn = new mysqli("localhost","root","","myTestDB");
        ?>
    </head>
    <body>
        <h1>
            <?php
                if($conn){
                    echo "Connected to myTestDB";
                }
                else{
                    echo "Database not connected";
                }
            ?>
        </h1>
        <table id="myTable">
            <tr>
                <th>Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
            </tr>
            <?php
                //Getting all the data
                $getData_query = "SELECT * FROM customers";
                $result = mysqli_execute_query($conn, $getData_query);

                if(mysqli_num_rows($result) > 0){
                    while($row = mysqli_fetch_assoc($result)){
                        echo "<tr>
                                <td>".$row["id"]."</td>
                                <td>".$row["firstName"]."</td>
                                <td>".$row["lastName"]."</td>
                                <td>".$row["address"]."</td>
                            </tr>";
                    }
                }
            ?>
            <?php
                if(isset($_POST['insert'])){
                    $insertDataQuery = "INSERT INTO customers (firstName, lastName, address) 
                                        VALUES ('Hello','World','Canada')";
                    mysqli_execute_query($conn,$insertDataQuery);

                    $getLastRowQuery = "SELECT * FROM customers
                                        ORDER BY id DESC LIMIT 1";
                    $result = mysqli_execute_query($conn, $getLastRowQuery);
                    $row = mysqli_fetch_assoc($result);
                    echo "<tr>
                                <td>".$row["id"]."</td>
                                <td>".$row["firstName"]."</td>
                                <td>".$row["lastName"]."</td>
                                <td>".$row["address"]."</td>
                            </tr>";
                }
                if(isset($_POST['delete'])){
                    $deleteDataQuery = "DELETE FROM customers ORDER BY id DESC LIMIT 1";
                    mysqli_execute_query($conn,$deleteDataQuery);
                    echo "<script>
                            var table = document.getElementById('myTable');
                            var rowCount = table.rows.length;
                            table.deleteRow(rowCount-1);
                        </script>";
                }
            ?>
            <form method="post">
                <tr>
                    <td colspan="2" id="insertButton"><input type="submit" name="insert" value="Insert Data"></td>
                    <td colspan="2" id="deleteButton"><input type="submit" name="delete" value="Delete Data"></td>
                </tr>
            </form>
        </table>
    </body>
</html>
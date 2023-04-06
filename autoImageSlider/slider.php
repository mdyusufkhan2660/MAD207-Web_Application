<html>
    <head>
        <title>Auto Image Slider</title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <div class="slideshow-container">
            <?php
                include 'connection.php';
                $query = "SELECT * FROM sliderImages";
                $result = mysqli_execute_query($conn, $query);
                if(mysqli_num_rows($result) > 0){
                    while($row = mysqli_fetch_assoc($result)){
                        echo "<div class='mySlides fade'>
                                <img src=".$row['img']." style='width: 100%'>
                              </div>";
                    }
                }
            ?>
        </div>
        <script>
            let slideIndex = 0;
            showSlides();
            function showSlides(){
                let i=0
                let slides = document.getElementsByClassName("mySlides");
                for(i=0; i<slides.length; i++){
                    slides[i].style.display = "none";
                }
                slideIndex++;
                if(slideIndex > slides.length){
                    slideIndex = 1;
                }
                slides[slideIndex-1].style.display = "block";

                setTimeout(showSlides, 3000);
            }
        </script>
    </body>
</html>
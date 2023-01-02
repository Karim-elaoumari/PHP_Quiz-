<!DOCTYPE html>
<html lang="en">
<?php 
session_start();
if(isset($_GET['logout'])){
  session_destroy();
  session_unset();
  header('Location:sign.html');
}
if(empty($_SESSION['user_id'])){
  header('Location:sign.html');
}
?>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz | Start</title>
   <link rel="stylesheet" href="assets/css/style.css">
   <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
</head>

<body class="">
    <header>
        <div class="brand-box">
            <span class="logo  font color-white">Quiz PHP</span>
        </div>
    </header>
    <section class="section">
      <div class="mini-count d-flex"  id="quiz_move"><div class="mini2-count center" onclick="move_info()">Info</div><div class="center content-center2" onclick="move_quiz()">Quiz</div><div class="content-right" onclick="move_score()">Score</div></div>
        <div class=" container center">
            
            <div id="section" style="display: none;">
              <h3 class="title1">Quiz Progress</h3>
             
                      
                          <div class="w3-progress-container w3-round-xlarge" style="margin-top:10px;">
                              <div class="w3-progressbar w3-round-xlarge" id="Progress_bar"style="width:0%"></div>
                          </div>
                        
                          <div id="progressTime">
                              <div id="BarTime"></div>
                          </div>
                          <hr class="hr">
                    
              <div class="question"style="font-size:20px" id="question"></div>
              <div class="" id="answers"></div>
            </div>
            <div id="section1">
              <h3 class="title1">All Quizzes</h3>
              <div id="quizzes">
         
              </div>
              <a href="quiz.php?logout=true" class="button-34"  role="button">Logout</a>
            </div>
            <div id="section2" style="display: none;">
            </div>
      </div>
    </section>
  <section>
  </section>
  <script src="assets/js/script.js"></script>
  <script src="assets/js/script_quiz.js"></script>
</body>
</html>
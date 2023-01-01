<!DOCTYPE html>
<html lang="en">
    
<?php 
session_start();
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
    <style>
        .flex-container {
  display: flex;
  flex-direction: row;
}

.flex-container > .flex-item {
  flex: auto;
}

.flex-container > .raw-item {
  width: 5rem;
}
    </style>
    <header>
        <div class="brand-box">
            <span class="logo  font color-white">Quiz PHP</span>
        </div>
    </header>
    <section class="section">
         <br>
        <div class=" container center">
            
            <div >
              <h3 class="title1">Create Quiz</h3>
            
            <div id="section3" >
            
              <div class="wrapper " >
                <div id="formContent">
                 
                  
              
                  <!-- Login Form -->
                 
                    <input type="text"  class="fadeIn second" name="user_name" style='height:20px' placeholder=" Your Quiz name">
                    <div id="questions">

                    </div>
                    <div id='option' class='flex-container'><button class="btn btn-primary btn-animated font " onclick="addquestion()">Add Question</button></div>
                  
                    <button  class="btn btn-primary btn-animated font">Create Quiz</button>  
                  
              
                  <!-- Remind Passowrd -->
                
                </div>
              </div>
            </div>
             
                      
                          
                    
             
             
            </div>
           
      </div>
    </section>
  <section>
  </section>
  <script src="assets/js/script_create_quiz.js"></script>
  
</body>
</html>
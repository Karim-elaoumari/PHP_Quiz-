<?php 
require_once '../classes/dbconection.php';
require_once '../classes/quiz.php';


if(isset($_GET['show_quiz'])) show_quiz(); 
if(isset($_GET['insert_quiz']))  insert_quiz();

function show_quiz(){
     echo quiz::get_quiz($_GET['show_quiz']);  
}
function insert_quiz(){
    $quiz1 = new quiz($_GET['quiz_name'],1,$_GET['insert_quiz'],$_GET['rule']);
    echo $quiz1->set_quiz();
}
?>
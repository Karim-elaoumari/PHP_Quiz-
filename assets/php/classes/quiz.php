<?php 
require_once 'dbconection.php';
class quiz extends dbconnection{
    public $arrquestions=array();
 }


 $quiz1 =  new quiz;
 $arr = array(
    "question" => "Que signifie PHP?",
    "answer"   => ["PHP Hypertext Preprocessor","Pretext Hypertext Processor","Preprocessor Home Page","Pretext Hypertext Processor"],
    "correct"  => 1
 );
 $arr2 = array(
    "question" => "Les fichiers PHP ont lextension …. ?",
    "answer"   => [".html",".xml",".php",".ph"],
    "correct"  => 3
 );
 $arr3 = array(
    "question" => "Les méthodes sont également appelées des_______?",
    "answer"   => ["fonction membre","instances","objects","constructeurs"],
    "correct"   => 1

 );
 $arr4 = array(
    "question" => "Quelle mot-clé empêche une méthode dêtre redéfinie par une classe file?",
    "answer"   => ["abstract","protected","final","static"],
    "correct"  => 3

 );
 $arr5 = array(
    "question" => "Nous pouvons utiliser ___ pour commenter une seule ligne?",
    "answer"   => ["/?","#","//","/vgh"],
    "correct"  => 3

 );
 $arr6 = array(
    "question" => "PHP est ?",
    "answer"   => ["une language executer dans le serveur","une language executer au niveux de navigateur","pour sa execusion tu doit avoir un local serveur","tous les choix correct"],
    "correct"  => [1,3]

 );

 
 array_push($quiz1->arrquestions,$arr);
 array_push($quiz1->arrquestions,$arr2);
 array_push($quiz1->arrquestions,$arr3);
 array_push($quiz1->arrquestions,$arr4);
 array_push($quiz1->arrquestions,$arr5);
 array_push($quiz1->arrquestions,$arr6);

if(isset($_GET['show'])){
   
    $json = json_encode($quiz1->arrquestions);
    echo $json;
}
if(isset($_GET['data'])){
   
    $json = json_encode($_GET['data'].'is the best');
    echo $json;
}



?>


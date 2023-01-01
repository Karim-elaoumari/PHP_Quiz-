<?php 
require_once 'dbconection.php';
class quiz extends dbconnection{
    public $questions=array();
    public $name;
    public $user_id;
    public $rule;


    public function __construct($name,$user_id,$questions,$rule){
        $this->name = $name;
        $this->user_id = $user_id;
        $this->questions = $questions;
        $this->rule = $rule;
    }
    public static function get_quiz($quiz_id){
        $db = new  dbconnection;
        $pdo = $db->connectToDb();
        $result = $pdo->query("
        SELECT quiz.id AS quiz_id, quiz.name AS quiz_name, quiz.questions as questions,quiz.rule as rule,quiz.user_id as user_id
        FROM quiz where quiz.id = '$quiz_id'
        ");
        $rows = $result->fetchAll();
        for($i =0;$i<count($rows);$i++){
        $quiz = $rows[$i];
        $arrz = json_decode($quiz['questions'],true);
        return  json_encode($arrz);
        }
    }
    public function set_quiz(){
        $pdo = $this->connectToDb();
        $sql = "INSERT INTO quiz (name,rule,questions,user_id)
        VALUES (:name, :rule, :questions, :user_id) "; 
        $stmt =  $pdo->prepare($sql);
        $stmt->bindParam(':name',  $this->name);
        $stmt->bindParam(':rule',  $this->rule);
        $stmt->bindParam(':questions',  $this->arrquestions);
        $stmt->bindParam(':user_id',  $this->user_id);
        if($stmt->execute()) {
        return '1';
        }  
        else{
        return '2';
        }
    }
 }
//  $arr3 = array(
//     "question" => "Les méthodes sont également appelées des_______?",
//     "answer"   => ["fonction membre","instances","objects","constructeurs"],
//     "correct"   => 1

//  );
//  $arr4 = array(
//     "question" => "Quelle mot-clé empêche une méthode dêtre redéfinie par une classe file?",
//     "answer"   => ["abstract","protected","final","static"],
//     "correct"  => 3

//  );
//  $arr5 = array(
//     "question" => "Nous pouvons utiliser ___ pour commenter une seule ligne?",
//     "answer"   => ["/?","#","//","/vgh"],
//     "correct"  => 3
//  );
//  $arr6 = array(
//     "question" => "PHP est ?",
//     "answer"   => ["une language executer dans le serveur","une language executer au niveux de navigateur","pour sa execusion tu doit avoir un local serveur","tous les choix correct"],
//     "correct"  => [1,3]

//  );


?>


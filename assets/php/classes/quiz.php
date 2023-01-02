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
    public static function get_quiz_info($user_id){
        $db = new  dbconnection;
        $pdo = $db->connectToDb();
        $stmt = $pdo->query("
        SELECT quizzes.id AS quiz_id, quizzes.name AS quiz_name
        FROM quizzes 
        ");
        $total =array();
        while($row = $stmt->fetch()){
            $arrquiz = array();
            $stmt2 = $pdo->prepare('SELECT s.score as score,u.user_name as user_name,u.id as user_id FROM scores s inner join users u on u.id =s.user_id WHERE s.quiz_id =:quiz_id');
            $stmt2->bindParam(':quiz_id',$row["quiz_id"]);
            $stmt2->execute();
            $max=0;
            $max_owner='no one';
            while ($row2 = $stmt2->fetch()) {
                if($row2["user_id"]==$user_id) $arrquiz["score"] = $row2["score"];
                if($max<$row2["score"]) {
                    $max = $row2["score"];
                    $max_owner = $row2["user_name"];
                } 
            }
            $arrquiz["id"] = $row["quiz_id"];
            $arrquiz["name"] = $row["quiz_name"];
            $arrquiz["best"]  = $max_owner;

            $total[] = $arrquiz;
            unset($arrquiz);
        }
        return  json_encode($total);
    }
    public static function get_quiz($quiz_id){
        $db = new  dbconnection;
        $pdo = $db->connectToDb();
        $stmt = $pdo->prepare('SELECT * FROM questions where quiz_id=:quiz_id');
        $stmt->bindParam(':quiz_id',$quiz_id);
        $stmt->execute();
        $total = array();
        
        while ($row = $stmt->fetch()) {
        $arrquestions = array();
        $arrquestions['question'] = $row['value'];
        $ques_id =$row['id'];
        $stmt2 = $pdo->prepare('SELECT * FROM `options` WHERE question_id =:question_id');
        $stmt2->bindParam(':question_id',$ques_id);
        $stmt2->execute();
        while ($row2 = $stmt2->fetch()) {
            $arrquestions['answer'][] = $row2["value"];
            if($row2["status"]=='1'){
                $arrquestions['correct'][] = count($arrquestions['answer']);
            }
        }
        $total[] =$arrquestions;
        unset($arrquestions);

}
        return  json_encode($total);
    }
    public static function setNewScore($user_id,$score,$quiz_id,$ip_adress,$browser,$operating_ses){
        $db = new  dbconnection;
        $scoring_date = date('Y-m-d H:i:s');
        $pdo = $db->connectToDb();
      
        // Start a transaction
        $pdo->beginTransaction();

        // Select the row with the given quiz_id and user_id
        $stmt = $pdo->prepare('SELECT * FROM scores WHERE quiz_id = :quiz_id AND user_id = :user_id');
        $stmt->execute([
            ':quiz_id' => $quiz_id,
            ':user_id' => $user_id
        ]);

        // If the row exists, update it; otherwise, insert a new row
        if ($stmt->rowCount() > 0) {
            $stmt = $pdo->prepare('UPDATE scores SET score = :score, scoring_date = :scoring_date WHERE quiz_id = :quiz_id AND user_id = :user_id');
            $stmt->execute([
                ':score' => $score,
                ':scoring_date' => $scoring_date,
                ':quiz_id' => $quiz_id,
                ':user_id' => $user_id
            ]);
        } else {
            $stmt = $pdo->prepare('INSERT INTO scores (user_id, score, quiz_id, scoring_date, ip_adress, browser, operating_ses) VALUES (:user_id, :score, :quiz_id, :scoring_date, :ip_adress, :browser, :operating_ses)');
            $stmt->execute([
                ':user_id' => $user_id,
                ':score' => $score,
                ':quiz_id' => $quiz_id,
                ':scoring_date' => $scoring_date,
                ':ip_adress' => $ip_adress,
                ':browser' => $browser,
                ':operating_ses' => $operating_ses
            ]);
        }

        // Commit the transaction
        $pdo->commit();


    }
 }
?>


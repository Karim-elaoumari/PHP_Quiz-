<?php 
require_once 'dbconection.php';
class user extends dbconnection{
    public $user_name;
    public $token;

    public function  __construct($user_name,$token){
        $this->user_name  = $user_name;
        $this->token  = $token;
    }
    public function set_user(){
        $pdo = $this->connectToDb();
        $sql = "INSERT INTO users (user_name,token)
        VALUES (:user_name, :token) "; 
        $stmt =  $pdo->prepare($sql);
        $stmt->bindParam(':user_name',  $this->user_name);
        $stmt->bindParam('token',  $this->token);
        if($stmt->execute()) {
            $last_id = $pdo->lastInsertId();
            return $last_id;
        }  
        else{
        return false;
        }
    }
    public function login(){
        $pdo = $this->connectToDb();
        $sql = "SELECT * FROM users WHERE user_name=:user_name AND token=:token";
        $stmt =  $pdo->prepare($sql);
        $stmt->bindParam(':user_name', $this->user_name);
        $stmt->bindParam(':token', $this->token);
        $stmt->execute();
        $row = $stmt->fetch();
        if($row){
            return $row;
        }  
        else{
            return false;
        }

    }
    
 }
?>


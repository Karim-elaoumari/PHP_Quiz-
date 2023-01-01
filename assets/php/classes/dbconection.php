
<?php 
class dbconnection {
    private $servername = "localhost";
    private $username = "root";
    private $password = "";
    private $dbname = "quiz_php";
    
    public  function connectToDb(){
        try {
            $conn = new PDO("mysql:host=$this->servername;dbname=$this->dbname", $this->username, $this->password);
            // set the PDO error mode to exception
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
            return $conn;
          } catch(PDOException $e) {
           
          }
    }
 }

?>

<?php 
class dbconnection {
    private $servername = "localhost";
    private $username = "username";
    private $password = "password";
    private $dbname;
    
    protected  function connectToDb(){
        try {
            $conn = new PDO("mysql:host=$this->servername;dbname=$this->dbname", $this->username, $this->password);
            // set the PDO error mode to exception
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            echo "Connected successfully";
            return $conn;
          } catch(PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
          }
    }
 }

?>
<?php 
require_once '../classes/dbconection.php';
require_once '../classes/user.php';

session_start();

if(isset($_GET['signup'])) signup(); 
if(isset($_GET['login']))  login();

function signup(){
     $user1 = new user($_GET['user_name'],$_GET['token']);
     $response = $user1->set_user();
     if($response!=false){
        $_SESSION['user_id']=$response;
        $_SESSION['user_name']=$_GET['user_name'];
        header('location:../../../quiz.php');

     }
     else{
        header('location:../../../sign.html');
     }
}
function login(){
    $user1 = new user($_GET['user_name'],$_GET['token']);
    $info = $user1->login();
    if($info){
        $_SESSION['user_id']=$info[0];
        $_SESSION['user_name']=$_GET['user_name'];
        header('location:../../../quiz.php');
    }
    else{
        header('location:../../../sign.html');
        
    }
}
?>
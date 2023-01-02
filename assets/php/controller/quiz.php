<?php 
require_once '../classes/dbconection.php';
require_once '../classes/quiz.php';

session_start();
if(isset($_GET['show_quiz'])) show_quiz();
if(isset($_GET['show_quiz_info'])) show_quiz_info();
if(isset($_GET['setscore'])) setscore();
if(isset($_GET['insert_quiz']))  insert_quiz();

function show_quiz(){
     echo quiz::get_quiz($_GET['show_quiz']);
}

function show_quiz_info(){
    echo quiz::get_quiz_info($_SESSION['user_id']);
}
function setscore(){
    echo quiz::setNewScore($_SESSION['user_id'],$_GET['setscore'],$_GET['quiz_id'],$_SERVER['REMOTE_ADDR'],getBrowser(),getOS());
}
function getBrowser() {
    $user_agent = $_SERVER['HTTP_USER_AGENT'];
    $browser="";
    $browser_array  = array(
        '/msie/i'       =>  'Internet Explorer',
        '/firefox/i'    =>  'Firefox',
        '/safari/i'     =>  'Safari',
        '/chrome/i'     =>  'Chrome',
        '/edge/i'       =>  'Edge',
        '/opera/i'      =>  'Opera',
        '/netscape/i'   =>  'Netscape',
        '/maxthon/i'    =>  'Maxthon',
        '/konqueror/i'  =>  'Konqueror',
        '/mobile/i'     =>  'Handheld Browser'
    );

    foreach ( $browser_array as $regex => $match ) {
        if ( preg_match( $regex, $user_agent ) ) {
            $browser = $match;
        }
    }
    return $browser;
}

function getOS() {
    $user_agent = $_SERVER['HTTP_USER_AGENT'];

    if (strpos($user_agent, 'Windows') !== false) {
        $os = 'Windows';
    } elseif (strpos($user_agent, 'Mac') !== false) {
        $os = 'Mac';
    } elseif (strpos($user_agent, 'Linux') !== false) {
        $os = 'Linux';
    } else {
        $os = 'Other';
    }
    return $os;
}

?>
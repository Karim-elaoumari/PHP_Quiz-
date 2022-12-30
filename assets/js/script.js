

let img = document.getElementById('img_change')
function change(){
    setTimeout(() => { img.setAttribute("src","img/Frame2.png");}, 300);
   
}
let change1= ()=>{
    setTimeout(() => { img.setAttribute("src","img/Frame.png");}, 300);
}
let quiz = document.getElementById('quiz_move')
var children = quiz.children;
let info  = document.getElementById('section1');
let quizz = document.getElementById('section');
let score = document.getElementById('section2');
let move_info = ()=>{
    children[0].setAttribute('class','mini2-count center');
    children[1].setAttribute('class','center content-center2');
    children[2].setAttribute('class','content-right');
    info.style.display="block";
    quizz.style.display="none";
    score.style.display="none";
}
let move_quiz  = ()=>{
    children[0].setAttribute('class','content-left');
    children[1].setAttribute('class','mini1-count center');
    children[2].setAttribute('class','content-right');
    info.style.display="none";
    quizz.style.display="block";
    score.style.display="none";
}
let move_score =()=>{
    children[0].setAttribute('class','content-left');
    children[1].setAttribute('class','center content-center3');
    children[2].setAttribute('class','mini3-count center');
    info.style.display="none";
    quizz.style.display="none";
    score.style.display="block";
}
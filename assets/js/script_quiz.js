// variables globale-----------------------
let id_timer;
let arrObj=[];
let quizinfo = [];
let range=[];
let count = 0;
let correct=null;
let totalcorrect=0;
let selected=[];
let arrRange=[];
let quiz_idd =null;
let lastScore;


//  mover timer ---------------------------
let move= (deley) =>{
    let barTime = document.getElementById("BarTime");
    let width = 100;
    let smout = 0.1;
    if(deley <10) smout = 0.1;
    newDellay = (deley*1000*smout)/100;
    clearInterval(id_timer);
    id_timer = setInterval(frame, newDellay);
    function frame() {
        if (width <=0) {
            clearInterval(id_timer);
            timerfail();
            i = 0;
        } else {
            width-=smout;
            barTime.style.width = width + "%";
            if(width<=65 && width>25 ) barTime.style.backgroundColor = "#fde24f";
            else if(width<=35) barTime.style.backgroundColor = "red";
            else{
              barTime.style.backgroundColor = "#930bed";
            }
        }
    }
}
//  adapt progress bar --------------------
let adaptProgress = (lenArr,done) =>{
  let progressRange = done*(100/lenArr)+"%";
  document.getElementById("Progress_bar").style.width=progressRange;
}

// ajax get questions  arr objects-----------------
let getQuiz_data =() =>{
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
   if(this.readyState===4 && this.status===200){
    quizinfo = JSON.parse(this.responseText);
    showQuiz_info(quizinfo);
   }
  }
  xhr.open("GET", "assets/php/controller/quiz.php?show_quiz_info=true", false);
  xhr.send();
}
let showQuiz_info = (quizinfo)=>{
   let quizzesArea = document.getElementById('quizzes');
   quizzesArea.innerHTML='';
   let counterr =1;
   for(let quiz of quizinfo){
    if(quiz.score==undefined) quiz.score=0;
    quizzesArea.innerHTML+=`<div onclick="showmore(this)" name="card" class="card color-regular  quiz" ><div class="cercle">Quiz ${counterr}</div><p>${quiz.name}</p><div class="container-score" id="rar${quiz.id}" value="${quiz.score}"><p class="d-flex socrers"><span>Top Scorer: ${quiz.best}</span><span id="score">Your Score: ${quiz.score}</span></p><button class="btn btn-primary btn-animated font btn-start" id="${quiz.id}" value="${quiz.score}" onclick="startquiz(this.id)">start Quiz</button></div></div>`;
     counterr++;
  }
 
}


let startquiz= (quiz_id) =>{
  arrObj=[];
  clearInterval(id_timer);
  id_timer= null
  range = [];
  arrRange = [];
  count = 0;
  correct=null;
  totalcorrect=0;
  selected=[];
  arrRange=[];
  quiz_idd = quiz_id;
  move(29)
  
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
   if(this.readyState===4 && this.status===200){
    arrObj = JSON.parse(this.responseText);
    randoom(arrObj.length);
    range = arrRange;
    adaptProgress(arrObj.length,0);
    showQuestion(arrObj);
    move_quiz();
    
   }
  }
  xhr.open("GET", "assets/php/controller/quiz.php?show_quiz="+quiz_idd, true);
  xhr.send();
}
// ajax get questions  arr objects-----------------
let showQuestion = (arrObj) =>{
       if(count<arrObj.length){
        correct =arrObj[range[count]].correct;
        document.getElementById("answers").innerHTML="";
        document.getElementById("question").innerText =arrObj[range[count]].question;
        if(correct.length>1){ 
          for(let i=0;i<arrObj[range[count]].answer.length;i++){
            document.getElementById("answers").innerHTML+=`
            <div onclick="addSelected(this)" name="card" class="card color-regular " id="${i+1}">
                    ${arrObj[range[count]].answer[i]}
            </div>
            `;
          }
          document.getElementById("answers").innerHTML+=`
            <button onclick="checkMultiple()" id="btn_multi" onmouseover="moveleft()" class="btn-primary" id="mutiple">Next
            </button>
            `;
        }
        else{
          for(let i=0;i<arrObj[range[count]].answer.length;i++){
            document.getElementById("answers").innerHTML+=`
            <div onclick="checkAnswer(this)" name="card" class="card color-regular" id="${i+1}"> 
                    ${arrObj[range[count]].answer[i]}
            </div>
            `;
          }
        }
        count++;
       }
      else{
        document.getElementById("section2").innerHTML=`<h2 class='center' style="margin-top:40px">You have finished Questions</h2>
        <h3 style="color:green;margin-top:20px">Your score is : ${totalcorrect}/${arrObj.length}  </h3>
        <div style="margin-top:20px center">
        `;
        let corectRange = (totalcorrect*100)/arrObj.length;
        if(corectRange<=25){
          document.getElementById("section2").innerHTML+=`
        <img src="img/Frame-focus.png" class="img_vector center"  alt="">
        <h3 class="center"> Focus more you can do it</h3>
        `;

        }else if(corectRange<=55){
          document.getElementById("section2").innerHTML+=`
        <img src="img/Frame-good.png" class="img_vector center"  alt="">
        <h3 class="center"> Good job continue</h3>
        `;

        }
        else if(corectRange<=90){
          document.getElementById("section2").innerHTML+=`
        <img src="img/Frame-exelent.png" class="img_vector center"  alt="">
        <h3 class="center"> Exelent near to be Master</h3>
        `;
        }
        else{
          document.getElementById("section2").innerHTML+=`
          <img src="img/Frame-boos.png" class="img_vector center"  alt="">
            <h3 class="center"> You are the Master</h3>
          `;
        }
        document.getElementById("section2").innerHTML+=` <br>
        <a onclick="startquiz(${quiz_idd})" class="button-34"  role="button">Restart Quiz</a>
        <a href="?logout=true" class="button-34"  role="button">Logout</a>
        <a onclick="move_info()" class="button-34" style="margin-left:15px;" role="button">Home</a>
        </div>
        `;
        clearInterval(id_timer);
        lastScore = document.getElementById('rar'+quiz_idd).getAttribute('value');
        console.log(lastScore);
        if(lastScore<totalcorrect){
          const xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function() {
          if(this.readyState===4 && this.status===200){
          }
          }
          xhr.open("GET", "assets/php/controller/quiz.php?setscore="+totalcorrect+"&quiz_id="+quiz_idd, true);
          xhr.send();
        }
        move_score();
        getQuiz_data();
      }
}
//  randooomm---------------------------------------
let randoom =(max) =>{
let newnum;
for(let i=1;i<=max;i++){
 newnum =  Math.floor(Math.random() * (max));
 while (arrRange.includes(newnum)){
  newnum =  Math.floor(Math.random() * (max));
 }
 arrRange.push(newnum);
}
}
// end timer ---------------------------------------
let timerfail = ()=>{
  fail.play();
  adaptProgress(arrObj.length,count);
  setTimeout(() => {move(29);
                    showQuestion(arrObj);
}, 100);
}
// check answer ---------------------------------------
let checkAnswer = (tag)=>{
  stopclick();
  if(correct==tag.id){
    tag.setAttribute("class", "color-seccess card");
    totalcorrect+=1;
    var success = new Audio('seccess.mp3');
    success.play();
  }else{
      tag.setAttribute("class", "color-fail card");
      document.getElementById(correct).setAttribute("class", "color-seccess card");
      var fail = new Audio('fail.mp3');
      fail.play();
    }
  adaptProgress(arrObj.length,count);
  setTimeout(() => {if(count<arrObj.length){
    move(29);}
    showQuestion(arrObj);
}, 700);
}
// add cancel selected choices----------------------
let  addSelected = (tag)=>{
  selected.push(tag.id);
  tag.setAttribute("class", "color-selected card");
  tag.setAttribute("onclick", "cancelSelected(this)");
  if(selected.length>=0){
    document.getElementById("btn_multi").style="transition: margin 0.1s;transition-delay: 0.1s;";
    document.getElementById("btn_multi").setAttribute("onmouseover","moveright()");
  }
}
let  cancelSelected = (tag)=>{
  tag.setAttribute("class", "color-regular card");
  tag.setAttribute("onclick", "addSelected(this)");
  for(i in selected){
    if(selected[i]==tag.id){
      selected.splice(i,1);
    }
  }
}
// add cancel selected choices----------------------

// check selected choices---------------------------
let checkMultiple = ()=>{
    document.getElementById("btn_multi").style.display="none";
  if(arrObj[range[count-1]].correct.sort().join() == selected.sort().join()){
    totalcorrect+=1;
    var success = new Audio('seccess.mp3');
    success.play();
    for(i of  selected){
      document.getElementById(i).setAttribute("class", "color-seccess card");
    }
  }
  else{
    var fail = new Audio('fail.mp3');
    fail.play();
    let corectar= arrObj[range[count-1]].correct
    let allCor_In= corectar.concat(selected);
    console.log(allCor_In)
    for(let i=1;i<=arrObj[range[count-1]].answer.length;i++){
      if(!allCor_In.find(elem => elem ==i)){
        document.getElementById(i).style='opacity: 0.4;';
      }
    }
    for(i of corectar){
          document.getElementById(i).setAttribute("class", "color-seccess card");
    }
    for(i of selected){
      if(corectar.find(elem => elem ==i)){
        document.getElementById(i).setAttribute("class", "color-seccess card");
      }
      else{
        document.getElementById(i).setAttribute("class", "color-fail card");
      }
  }
  }
  adaptProgress(arrObj.length,count);
  setTimeout(() => { if(count<arrObj.length){
    move(29);}
    showQuestion(arrObj);
}, 1000);
}
function  moveleft(){
  if(selected.length<=0){
    document.getElementById("btn_multi").style="margin-left:14rem;transition: margin 0.1s;transition-delay: 0.1s;";
    document.getElementById("btn_multi").setAttribute("onmouseover","moveright()");
  }
}
function  moveright(){
  if(selected.length<=0){
    document.getElementById("btn_multi").style="margin-left:-14rem;transition: margin 0.1s;transition-delay: 0.1s;";
    document.getElementById("btn_multi").setAttribute("onmouseover","moveleft()");
  }
}
function stopclick(){
  for(let i=1;i<=arrObj[range[count-1]].answer.length;i++){
    document.getElementById(i).setAttribute("onclick","");
   }
}
// check selected choices---------------------------

function showquestion(){
  document.getElementById("section1").style.display="none";
  document.getElementById("section").style.display="block";
}
let childrens = document.getElementsByClassName('quiz')
function showmore(tag){
   tag.style="height:15rem;transition: height 0.3s;";
   tag.setAttribute('onclick','showless(this)');
  for(child of childrens){
  if(child!=tag){
    child.style="transition: height 0.3s;";
  child.setAttribute('onclick','showmore(this)');
  }
  }
}
function showless(tag){
  tag.style="transition: height 0.3s;";
  tag.setAttribute('onclick','showmore(this)');
}
getQuiz_data();









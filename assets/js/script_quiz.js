// variables globale-----------------------
let id_timer;
let arrObj=[];
let range=[];
let count = 0;
let correct=null;
let totalcorrect=0;
let selected=[];
let arrRange=[];
// variables globale-----------------------

//  mover timer ---------------------------
function move(deley) {
    
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
function adaptProgress(lenArr,done){
  let progressRange = done*(100/lenArr)+"%";
  document.getElementById("Progress_bar").style.width=progressRange;
}
// ajax get questions  arr objects-----------------
function getJson_data(){
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
   if(this.readyState===4 && this.status===200){
    arrObj = JSON.parse(this.responseText);
    randoom(arrObj.length);
    range = arrRange;
    showQuestion(arrObj);
   }
  }
  xhr.open("GET", "assets/js/data.json", true);
  xhr.send();
}
// ajax get questions  arr objects-----------------

function showQuestion(arrObj){
       if(count<arrObj.length){
        correct =arrObj[range[count]].correct;
        document.getElementById("answers").innerHTML="";
        document.getElementById("question").innerText =arrObj[range[count]].question;
        if(Array.isArray(correct)){ 
          for(let i=0;i<arrObj[range[count]].answer.length;i++){
            document.getElementById("answers").innerHTML+=`
            <div onclick="addSelected(this)" name="card" class="card color-regular " id="${i+1}">
                    ${arrObj[range[count]].answer[i]}
            </div>
            `;
          }
          document.getElementById("answers").innerHTML+=`
            <button onclick="checkMultiple()" class="btn-primary" id="mutiple">Next
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
        document.getElementById("section").innerHTML=`<h2 class='center' style="margin-top:40px">You have finished Questions</h2>
        <h3 style="color:green;margin-top:20px">Your score is : ${totalcorrect}/${arrObj.length}  </h3>
        <div style="margin-top:20px center">
        `;
        let corectRange = (totalcorrect*100)/arrObj.length;
        if(corectRange<=25){
          document.getElementById("section").innerHTML+=`
        <img src="img/Frame-focus.png" class="img_vector center"  alt="">
        <h3 class="center"> Focus more you can do it</h3>
        `;

        }else if(corectRange<=55){
          document.getElementById("section").innerHTML+=`
        <img src="img/Frame-good.png" class="img_vector center"  alt="">
        <h3 class="center"> Good job continue</h3>
        `;

        }
        else if(corectRange<=90){
          document.getElementById("section").innerHTML+=`
        <img src="img/Frame-exelent.png" class="img_vector center"  alt="">
        <h3 class="center"> Exelent near to be Master</h3>
        `;

        }
        else{
          document.getElementById("section").innerHTML+=`
          <img src="img/Frame-boos.png" class="img_vector center"  alt="">
            <h3 class="center"> You are the Master</h3>
          `;

        }
        document.getElementById("section").innerHTML+=` <br>
        <a href="quiz.html" class="button-34"  role="button">Restart Quiz</a>
        <a href="index.html" class="button-34" style="margin-left:15px;" role="button">Home</a>
        </div>
        `;
      }
}
getJson_data();

//  randooomm---------------------------------------
function randoom(max){
let newnum;
for(let i=1;i<=max;i++){
 newnum =  Math.floor(Math.random() * (max));
 while (arrRange.includes(newnum)){
  newnum =  Math.floor(Math.random() * (max));
  
 }
 arrRange.push(newnum);
}
}
//  randooomm---------------------------------------

// end timer ---------------------------------------
function timerfail(){
  adaptProgress(arrObj.length,count);
  sleep(500).then(() => {
    move(29);
    showQuestion(arrObj);
});  
}
// end timer ---------------------------------------
function checkAnswer(tag){
 for(let i=1;i<=arrObj[range[count-1]].answer.length;i++){
  document.getElementById(i).setAttribute("onclick","");
 }
  if(correct==tag.id){
    tag.setAttribute("class", "color-seccess card");
    totalcorrect+=1;
  }else{
      tag.setAttribute("class", "color-fail card");
    }
  adaptProgress(arrObj.length,count);
  sleep(700).then(() => {
    if(count<arrObj.length){
    move(29);}
    showQuestion(arrObj);
});  
}
// end timer ---------------------------------------



// add cancel selected choices----------------------
function addSelected(tag){
  selected.push(tag.id);
  tag.setAttribute("class", "color-selected card");
  tag.setAttribute("onclick", "cancelSelected(this)");
  console.log(selected);
}
function cancelSelected(tag){
  tag.setAttribute("class", "color-regular card");
  tag.setAttribute("onclick", "addSelected(this)");
  for(i in selected){
    console.log(i)
    if(selected[i]==tag.id){
      selected.splice(i,1);
    }
  }
  console.log(selected);
}
// add cancel selected choices----------------------



// check selected choices---------------------------
function checkMultiple(){
  if(arrObj[range[count-1]].correct.sort().join() == selected.sort().join()){
    totalcorrect+=1;
    for(i of  selected){
      document.getElementById(i).setAttribute("class", "color-seccess card");
    }
  }
  else{
    let corectar= arrObj[range[count-1]].correct
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
  sleep(700).then(() => {
    if(count<arrObj.length){
    move(29);}
    showQuestion(arrObj);
});  
}
// check selected choices---------------------------







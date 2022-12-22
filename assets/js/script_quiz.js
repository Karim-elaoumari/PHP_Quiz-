// Credit: Mateusz Rybczonec

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES ={
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

const TIME_LIMIT = 30;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
    document.getElementById("app").innerHTML =`
<div class="base-timer">CountDown: 
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
  )}</span>
</div>
`;
function reloadTimer(){
  onTimesUp();
  timePassed = -1;
  timeLeft = TIME_LIMIT;
  const { alert, warning, info } = COLOR_CODES;
  document.getElementById("base-timer-label").classList.remove(alert.color);
  document.getElementById("base-timer-label").classList.add(info.color);
  startTimer();
}
function onTimesUp() {
  clearInterval(timerInterval);
}
function startTimer() {
    timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
    
      checkAnswer('<div>');
    }
  }, 1000);
}
function formatTime(time){
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
}
function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document.getElementById("base-timer-label").classList.remove(warning.color);
    document.getElementById("base-timer-label").classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document.getElementById("base-timer-label").classList.remove(info.color);
    document.getElementById("base-timer-label").classList.add(warning.color);
  }
}
function adaptProgress(lenArr,done){
  let progressRange = done*(100/lenArr)+"%";
  document.getElementById("Progress_bar").style.width=progressRange;
}
// function buttonHandler() {
//   // First create an XMLHttprequest object
//   const xhr = new XMLHttpRequest();
//   xhr.onreadystatechange = function() {
//     if(this.readyState===4 && this.status===200){

//       let obj = JSON.parse(this.responseText);

//       console.log(obj);
//     }
//   }
//   xhr.open("GET","assets/js/data.json",true);
//   xhr.send();
// }
// ajax get questions 
let arrObj=[];
let range=[];
function getJson_data(){
  // First create an XMLHttprequest object
  const xhr = new XMLHttpRequest();
  xhr.onload = function() {
    arrObj = JSON.parse(this.responseText);
    range = randomUniqueNum(arrObj.length-1);
    showQuestion(arrObj);
  }
  xhr.open("GET", "assets/js/data.json", true);
  xhr.send();
}
let count = 0;
let correct=null;
let totalcorrect=0;
let selected=[];
function showQuestion(arrObj){
       if(count<arrObj.length){
        correct =arrObj[range[count]].correct;
        document.getElementById("question").innerText =arrObj[range[count]].question;
        document.getElementById("answers").innerHTML="";
        if(Array.isArray(correct)){ 
          for(let i=0;i<arrObj.length;i++){
            document.getElementById("answers").innerHTML+=`
            <div onclick="addSelected(this)" class="color-regular card" id="${i+1}">
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
          for(let i=0;i<arrObj.length;i++){
            document.getElementById("answers").innerHTML+=`
            <div onclick="checkAnswer(this)"class="color-regular card" id="${i+1}"> 
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
        <div style="margin-top:20px">
        <a href="quiz.html" class="button-34"  role="button">Restart Quiz</a>
        <a href="index.html" class="button-34" style="margin-left:15px;" role="button">Home</a>
        </div>
        `;
      }
}
getJson_data();

function randomUniqueNum(outputCount) {

  let arr = []
  for (let i = 0; i <= outputCount; i++) {
    arr.push(i)
  }

  let result = [];

  for (let i = 0; i <= outputCount; i++) {
    const random = Math.floor(Math.random() * (outputCount - i));
    result.push(arr[random]);
    arr[random] = arr[outputCount - i];
  }
  return result;
}
function checkAnswer(tag){
  if(correct==tag.id){
    tag.setAttribute("class", "color-seccess card");
    totalcorrect+=1;
  }else{
    try{
      tag.setAttribute("class", "color-fail card");}
      
    catch{
    }
  }
  sleep(500).then(() => {
    adaptProgress(arrObj.length,count);
    if(count<arrObj.length){
    reloadTimer();

    }
    showQuestion(arrObj);
      
    
});  
  
}
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
function checkMultiple(){
  if(arrObj[range[count-1]].correct.sort().join() == selected.sort().join()){
    totalcorrect+=1;
  }
  sleep(500).then(() => {
    adaptProgress(arrObj.length,count);
    if(count<arrObj.length){
      reloadTimer();
      alert("good");
      }
    showQuestion(arrObj);
 
    
});  
}








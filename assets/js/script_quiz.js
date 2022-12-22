let id_timer;
function move(deley) {
    
    let barTime = document.getElementById("BarTime");
    let width = 100;
    let smout = 0.01;
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
        document.getElementById("answers").innerHTML="";
        document.getElementById("question").innerText =arrObj[range[count]].question;
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
function timerfail(){
  adaptProgress(arrObj.length,count);
  sleep(500).then(() => {
    move(28);
    showQuestion(arrObj);
});  

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
  adaptProgress(arrObj.length,count);
  sleep(700).then(() => {
    if(count<arrObj.length){
    move(28);}
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
    move(28);}
    showQuestion(arrObj);
});  
}








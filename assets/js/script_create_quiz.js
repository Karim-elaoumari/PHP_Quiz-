function addquestion(){
    document.getElementById("questions").innerHTML=`<input type="text"  class="fadeIn second" style='height:20px' name="user_name" placeholder=" Your Question">`;
    document.getElementById("questions").innerHTML=`<button class="btn btn-primary btn-animated font " onclick="addquestion()"> Add answer</button>`;
}option
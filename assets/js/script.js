

let img = document.getElementById('img_change')
function change(){
    sleep(200).then(() => {
        img.setAttribute("src","img/Frame2.png");
    });  
   
}
function change1(){
    sleep(300).then(() => {
        img.setAttribute("src","img/Frame.png");
        
    });  
}
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }


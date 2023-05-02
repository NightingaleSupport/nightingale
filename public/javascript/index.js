const splash = document.querySelector('.splash');
const input = document.getElementById("input-box");
const submit_button = document.getElementById("input-box");
const display = document.getElementById("display");
const question_container = document.getElementById('question')
document.addEventListener('DOMContentLoaded', (e)=>{
    setTimeout(() => {
        splash.classList.add('display-none');
    }, 2000);
});

input.addEventListener("keydown", function (e) {
    if (e.code === "Enter") { 
        sendRequest()
    }
});

function sendRequest(){
    console.log('hit');
    if(input.value == "") {
        console.log("Cannot send empy input!");
        return;
    }
    var text = input.value;
    input.value = '';
    question_container.innerText=text;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/askteche", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = () => {
        // In local files, status is 0 upon success in Mozilla Firefox
        if (xhr.readyState === XMLHttpRequest.DONE) {
          const status = xhr.status;
          if (status === 0 || (status >= 200 && status < 400)) {
            // The request has been completed successfully
            display.innerText = xhr.responseText;
          } 
        }
      };
    display.innerText = '...';
    xhr.send(JSON.stringify({
        value: text
    }));
}
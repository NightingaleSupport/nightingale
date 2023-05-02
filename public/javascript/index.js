const splash = document.querySelector('.splash');

document.addEventListener('DOMContentLoaded', (e)=>{
    setTimeout(() => {
        splash.classList.add('display-none');
    }, 2000);
});

var input = document.getElementById("input-box");
var display = document.getElementById("display");
input.addEventListener("keydown", function (e) {
    if (e.code === "Enter") { 
        if(e.target.value == "") {
            console.log("Cannot send empy input!");
            return;
        }
        var text = e.target.value;
        input.value = '';
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
});
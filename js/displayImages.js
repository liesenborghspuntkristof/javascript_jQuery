/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


window.onload = function () {
    var eHoofdknop = document.getElementById("hoofdknop");
    eHoofdknop.addEventListener("click", switchHide);
    var eDt = document.querySelectorAll("dt"); 
    var eDd = document.querySelectorAll("dd"); 
    for (var i = 0; i < eDd.length; i++) {
        console.log(eDd[i].hasChildNodes("img")); 
    }
    for (var i = 0; i < eDt.length; i++) {
        displayCaret(eDt[i], i); 
    }
 
};

function switchHide() {
//    var eStyle = document.getElementsByTagName("style");
//    console.log(eStyle);
    var eScreenshots = document.querySelectorAll(".screenshot");
    if (eScreenshots[0].getAttribute("style")) {
        for (var i = 0; i < eScreenshots.length; i++) {
            eScreenshots[i].removeAttribute("style"); 
        }
    } else {
        for (var i = 0; i < eScreenshots.length; i++) {
            eScreenshots[i].style.display = "none";  
        }    
    }
}

function displayCaret(e, i) {
    var eScreenshots = document.querySelectorAll(".screenshot");
    if (eScreenshots[i].getAttribute("style")) {
        var eDown = document.createElement("i"); 
        eDown.className = "fa fa-caret-square-o-down"; 
        e.innerHTML += "..............     "; 
        e.appendChild(eDown);
    } else {
        var eUp = document.createElement("i"); 
        eUp.className = "fa fa-caret-square-o-up";
        e.innerHTML += "..............     "; 
        e.appendChild(eUp);
    } 
}
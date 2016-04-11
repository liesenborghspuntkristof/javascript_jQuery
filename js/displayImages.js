/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var aKnop = [
    ["nederlands", "Alle schermen verbergen", "Alle schermen tonen"], 
    ["english", "Hide all screenshots", "Show all screenshots"], 
    ["français", "Masquer toutes les images", "afficher toutes les images"]
]; 



window.onload = function () {
    sVerbergTekst = aKnop[0][1]; 
    sToonTekst = aKnop[0][2]; 
    var eTaal = document.createElement("div");
    eTaal.id = "taal"; 
    var eIcon = document.createElement("i"); 
    eIcon.className = "fa fa-eye"; 
    eTaal.appendChild(eIcon);
    var nT; 
    for (nT = 0; nT < aKnop.length; nT++) {
        var eSpan = document.createElement("span"); 
        eSpan.className = "taalkeuze"; 
        eSpan.innerHTML = aKnop[nT][0];
        console.log(nT); 
        eSpan.addEventListener("click", function(){
            console.log(typeof nT);
            sVerbergTekst = aKnop[nT][1];
            sToonTekst = aKnop[nT][2]; 
        }); 
        eTaal.appendChild(eSpan);
    }
    var eArticle = document.getElementsByTagName("article")[0];
    eArticle.insertBefore(eTaal, eArticle.childNodes[2]); 
    
    var eHoofdknop = document.getElementById("hoofdknop");
    eHoofdknop.addEventListener("click", function () {
        switchHide(eHoofdknop);
    });
    var eImg = document.querySelectorAll(".screenshot");
    for (var i = 0; i < eImg.length; i++) {
        displayCaret(eImg[i].parentNode.parentNode.previousElementSibling, i);
    }
};

function switchHide(eKnop) {
    var eScreenshots = document.querySelectorAll(".screenshot");
    var eCarets = document.querySelectorAll(".dynamic");
    switch (eKnop.innerHTML) {
        case sToonTekst:
            for (var i = 0; i < eScreenshots.length; i++) {
                eScreenshots[i].removeAttribute("style");
            }
            eKnop.innerHTML = sVerbergTekst;
            for (var i = 0; i < eCarets.length; i++) {
                eCarets[i].className = "fa fa-caret-square-o-up dynamic"; 
            }
            break;
        case sVerbergTekst:
            for (var i = 0; i < eScreenshots.length; i++) {
                eScreenshots[i].style.display = "none";
            }
            eKnop.innerHTML = sToonTekst;
            for (var i = 0; i < eCarets.length; i++) {
                eCarets[i].className = "fa fa-caret-square-o-down dynamic"; 
            }
            break;
    }
}

function displayCaret(e, i) {
    var eScreenshots = document.querySelectorAll(".screenshot");
    var eCheck = e.querySelector("a.screenlink");
    console.log(eCheck);
    if (eCheck === null) {  // first time creating caret -links 
        var eLink = document.createElement("a");
        eLink.className = "screenlink";
        var eCaret = document.createElement("i");
        if (eScreenshots[i].getAttribute["style"]) {
            eCaret.className = "fa fa-caret-square-o-down dynamic";
        } else {
            eCaret.className = "fa fa-caret-square-o-up dynamic";
        }
        eLink.addEventListener("click", function () {
            switchCaret(eScreenshots[i], eLink, eCaret);
        });
        e.innerHTML += "..............     ";
        e.appendChild(eLink);
        eLink.appendChild(eCaret);
    }
}


function switchCaret(eImg, eA, eI) {
    switch (eI.className) {
        case "fa fa-caret-square-o-down dynamic":
            eImg.removeAttribute("style");
            eI.className = "fa fa-caret-square-o-up dynamic";
            eA.addEventListener("click", function () {
                eImg.style.display = "none";
            });
            break;
        case "fa fa-caret-square-o-up dynamic":
            eImg.style.display = "none";
            eI.className = "fa fa-caret-square-o-down dynamic";
            eA.addEventListener("click", function () {
                eImg.removeAttribute("style");
            });
            break;
    }
}

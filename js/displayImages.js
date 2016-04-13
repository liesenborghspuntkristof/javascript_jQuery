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

    for (var i = 0; i < aKnop.length; i++) {
        var eSpan = document.createElement("span");
        eSpan.className = "taalkeuze";
        eSpan.innerHTML = aKnop[i][0];
        eSpan.id = aKnop[i][0];
        eTaal.appendChild(eSpan);
        var nT = parseInt(i);
        
        // de volgende ingreep moet gebeuren om 'the closure behaviour' te omzeilen.
        // zonder deze ingreep krijgt iedere toegewezen eventHandler dezelfde waarde => namelijk de laatste (in dit geval de franse tekst)
        (function (nT) {
            eSpan.addEventListener("click", function () {
                switchLanguage(nT);           
            });
        })(nT);
        // einde ingreep
        // remember: Revealing Module Pattern        
    }

    var eArticle = document.getElementsByTagName("article")[0];
    eArticle.insertBefore(eTaal, eArticle.childNodes[2]);

    var eHoofdknop = document.getElementById("hoofdknop");
    eHoofdknop.innerHTML = sVerbergTekst;
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
//    console.log(sToonTekst); 
//    console.log(sVerbergTekst); 
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
//    console.log(eCheck);
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

function switchLanguage(n) {
//    console.log(n);
    var eHoofdknop = document.getElementById("hoofdknop");
    switch (eHoofdknop.innerHTML) {
        case sVerbergTekst:
            eHoofdknop.innerHTML = aKnop[n][1];
            break;
        case sToonTekst:
            eHoofdknop.innerHTML = aKnop[n][2];
            break;
    }
    sVerbergTekst = aKnop[n][1];
    sToonTekst = aKnop[n][2];
}


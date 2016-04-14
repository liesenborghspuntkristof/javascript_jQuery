/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



window.onload = function () {
    console.log(window.location.pathname + ": " + typeof window.location.pathname);
    if (localStorage.taalkeuze && window.location.pathname === "/javascript_jQuery/taken_PF/Taalkeuze.html") {
        window.location.assign("Kunstkeuze.html");
    } else {
        //elementen
        var eNed = document.getElementById("nederlands");
        var eFra = document.getElementById("frans");
        var eEng = document.getElementById("engels");
        eNed.addEventListener("click", function () {
            fnTaalkeuze("nederlands");
        });
        eFra.addEventListener("click", function () {
            fnTaalkeuze("frans");
        });
        eEng.addEventListener("click", function () {
            fnTaalkeuze("engels");
        });
        if (window.location.pathname === "/javascript_jQuery/taken_PF/Kunstkeuze.html"){
            console.log("aangekomen"); 
            var eReset = document.getElementById("reset"); 
            eReset.addEventListener("click", fnClearTaalkeuze);
            var eLeuze = document.getElementById("kunstleuze"); 
            var sLeuze = ""; 
            switch (localStorage.taalkeuze) {
                case "nederlands": 
                    sLeuze = "Dit is geen pijp"; 
                    break; 
                case "frans": 
                    sLeuze = "Ceci n'est pas une pipe"; 
                    break; 
                case "engels": 
                    sLeuze = "This is not a pipe"; 
                    break; 
                default: 
                    window.location.assign("Taalkeuze.html"); 
                    break
            }
            eLeuze.innerHTML = sLeuze; 
        }
    }

};

function fnTaalkeuze(s) {
    switch (s) {
        case "nederlands":
            localStorage.taalkeuze = "nederlands";
            break;
        case "frans":
            localStorage.taalkeuze = "frans";
            break;
        case "engels":
            localStorage.taalkeuze = "engels";
            break;
    }
    window.location.assign("Kunstkeuze.html");
}

function fnClearTaalkeuze() {
    localStorage.clear(); 
    window.location.assign("Taalkeuze.html"); 
}

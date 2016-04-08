/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var aFeatures = [
    "document.images", 
    "document.layers", 
    "document.all", 
    "document.getElementById", 
    "document.querySelector", 
    "document.styleSheets", 
    "document.createElement", 
    "document.createNodeIterator", 
    "document.implementation.createDocument", 
    "window.walkTheDog", 
    "window.focus", 
    "window.toonFeatures", 
    "window.ActiveXObject", 
    "window.XMLHttpRequest", 
    "window.localStorage", 
    "[].push", 
    "[].filter", 
    "Object.prototype", 
    "document.documentElement.style.WebkitBorderRadius", 
    "navigator.geolocation", 
    "document.documentElement.classList"
]; 

window.onload = function() {
    var eBversion = document.getElementById("bVersion");
    browserSensing(eBversion);  
    for(var i = 0; i < aFeatures.length; i++) {
            console.log(aFeatures[i] + ": " + Boolean(eval(aFeatures[i])));
    }
    toonFeatures(aFeatures); 
}; 




function browserSensing(e) {
    e.innerHTML = "<strong>Browser info: </strong>" + navigator.userAgent; 
}; 


function toonFeatures(a) {
    var eTabel = document.createElement('table'); 
    var eWrapper = document.getElementById("wrapper"); 
    eTabel.id = "featureTabel"; 
    eWrapper.appendChild(eTabel);
    for(var i = 0; i< a.length; i++) {
        var eRow = document.createElement("tr"); 
        var eFeaturetd = document.createElement("td"); 
        var eBooleantd = document.createElement("td"); 
        eTabel.appendChild(eRow); 
        eFeaturetd.innerHTML = a[i]; 
        var bSupport = Boolean(eval(a[i])); 
        if (bSupport) {
            eBooleantd.innerHTML = "Ja"; 
            eRow.className = "ja"; 
        } else {
            eBooleantd.innerHTML = "Nee"; 
            eRow.className = "nee"; 
        }
        eRow.appendChild(eFeaturetd); 
        eRow.appendChild(eBooleantd); 
    }
}

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// globale variabelen
var aoWinkels = [
    {naam: "de fruitmand", adres: "steenstraat 34", post: 8000, gemeente: "Brugge", tel: "050342218", manager: "Francine Lapoule"},
    {naam: "Jos & Anneke", adres: "visserijstraat 1", post: 8400, gemeente: "Oostende", tel: "059463689", manager: "Jos Leman"},
    {naam: "groene vingers", adres: "hoogstraat 108", post: 9000, gemeente: "Gent", tel: "091342218"},
    {naam: "de buurtwinkel", adres: "die laene 22", post: 2000, gemeente: "Antwerpen", tel: "0230342218", manager: "Bert Simoens"}
];

var aaGroenten = [
    ["aardappelen", 0.95, "kg"],
    ["avocado", 2.69, "stuk"],
    ["bloemkool", 1.93, "stuk"],
    ["brocoli", 1.29, "stuk"],
    ["champignons", 0.89, "250g"],
    ["chinese kool", 1.59, "stuk"],
    ["groene kool", 1.69, "stuk"],
    ["knolselder", 1.29, "stuk"],
    ["komkommer", 2.49, "stuk"],
    ["kropsla", 1.69, "stuk"],
    ["paprika", 0.89, "net"],
    ["prei", 2.99, "bundel"],
    ["princessenbonen", 1, "250g"],
    ["rapen", 0.99, "bundel"],
    ["kropsla", 1.69, "stuk"],
    ["rode kool", 1.39, "stuk"],
    ["sla iceberg", 1.49, "stuk"],
    ["spinazie vers", 1.89, "300g"],
    ["sjalot", 0.99, "500g"],
    ["spruiten", 1.86, "kg"],
    ["trostomaat", 2.99, "500g"],
    ["ui", 0.89, "kg"],
    ["witloof 1ste keus", 1.49, "700g"],
    ["wortelen", 2.59, "kg"],
    ["courgetten", 1.5, "stuk"]
];

// onload
window.onload = function () {
    //statische elementen
    var eWinkel = document.getElementById("winkel");
    var eGroente = document.getElementById("groente");
    var eAantal = document.getElementById("aantal");
    var eKnop = document.getElementById("toevoegen");

    //set Winkels
    for (var i = 0; i < aoWinkels.length; i++) {
        var oWinkel = aoWinkels[i];
        var eOption = document.createElement("option");
        eOption.innerHTML = oWinkel.naam;
        eOption.value = oWinkel.naam;
        eOption.title = oWinkel.adres + ", " + oWinkel.post + " " + oWinkel.gemeente;
        eWinkel.appendChild(eOption);
    }


    //set Groenten
    for (var i = 0; i < aaGroenten.length; i++) {
        var aGroente = aaGroenten[i];
        var sBenaming = aGroente[0];
//        console.log(sBenaming + ": " + typeof sBenaming); 
        var nPrijs = parseFloat(aGroente[1]);
//        console.log(nPrijs + ": " + typeof nPrijs); 
        var sEenheid = aGroente[2];
//        console.log(sEenheid + ": " + typeof sEenheid);
        var eOption = document.createElement("option");
        eOption.innerHTML = sBenaming + " (" + nPrijs + " €/" + sEenheid + ")";
        eOption.value = sBenaming;
        eGroente.appendChild(eOption);
    }

    //set Button
    eKnop.addEventListener("click", function () {
        // valideer invoer 
        switch (false) {
            case eWinkel.value !== "":
                alert("kies een winkel");
                break;
            case eGroente.value !== "":
                alert("kies een groente");
                break;
            case eAantal.value !== "":
                alert("kies een aantal/Gewicht");
                break;
            case eAantal.value > 0:
            case !isNaN(eAantal.value):
                alert("gelieve enkel nummers groter dan 0 in te geven");
                break;
            default:
                // functie vul winkelwagen
                fnVulWinkelwagen(eGroente.value, eAantal.value); 
                // clear aantal/gewicht waarde om bewuste invoer te garanderen
                eAantal.value = ""; 
        }
    });
};

function fnVulWinkelwagen(sGroente, nAantal) {
    //dynamische elementen
    var eWinkelmandje = document.getElementById("winkelmandje");
    var eLeeg = document.getElementById("leeg");
    var eTotaal = document.getElementById("totaal");
    var eTotNum = document.getElementById("totNum");
    
    //Prijs wordt via een needle in haystack functie opnieuw uit de globale variabel "aaGroenten" gehaald
    var nPrijs = fnInAaGroenten(sGroente);
    
    //valideer groenten -> als de groenteninvoer niet gevonden wordt zal nPrijs === false opleveren
    if (nPrijs === false) {
        alert("Dit is geen groenten uit de lijst");
        return;  
    }

    //Check nieuwe groenten of bestaande wijzigen; 
    if (document.getElementById(sGroente)) { // === bestaande element
        console.log("Wijzig");
        var eCel = document.getElementById(sGroente);
        var aeBestellijn = eCel.childNodes;
        aeBestellijn[1].innerHTML = parseFloat(aeBestellijn[1].innerHTML) + parseFloat(nAantal);
        aeBestellijn[2].innerHTML = (parseFloat(aeBestellijn[1].innerHTML) * nPrijs).toFixed(2);
    } else { // === nieuw element
        console.log("Nieuw");
        // create cell
        var eItem = document.createElement("div");
        eItem.className = "item";
        eItem.id = sGroente;
        eWinkelmandje.insertBefore(eItem, eTotaal);

        // create subcell groente
        var eItemNaam = document.createElement("div");
        eItemNaam.className = "cel cellinks";
        eItemNaam.innerHTML = sGroente;
        eItem.appendChild(eItemNaam);

        // create subcell aantal
        var eItemAantal = document.createElement("div");
        eItemAantal.className = "cel cellinksmidden";
        eItemAantal.innerHTML = nAantal;
        eItem.appendChild(eItemAantal);

        // create subcell subtotaal
        var eItemSom = document.createElement("div");
        var nSom = parseFloat(nAantal) * nPrijs;
        eItemSom.className = "cel celrechts subTot";
        eItemSom.innerHTML = nSom.toFixed(2);
        eItem.appendChild(eItemSom);

        // create subcell prijs
        var eItemPrijs = document.createElement("div");
        eItemPrijs.className = "cel cellinksrechts";
        eItemPrijs.innerHTML = nPrijs;
        eItem.appendChild(eItemPrijs);
    }

    // afhandeling
    //change total            
    var eSubtots = document.querySelectorAll("div.subTot");
    var nTotaal = 0;
//    console.log(eSubtots);
    for (var i = 0; i < eSubtots.length; i++) {
//        console.log(eSubtots[i].innerHTML);
        nTotaal += parseFloat(eSubtots[i].innerHTML);
    }
    eTotNum.innerHTML = nTotaal.toFixed(2);

    //Check lege winkelmand
    if (eTotNum.innerHTML > 0) {
        eLeeg.style.display = "none";
    } else {
        eLeeg.removeAttribute("style");
    }
}


// needle in haystack function;  TRUE ? returnt bijhorende prijs : return false; 
function fnInAaGroenten(sGroente) {
    var length = aaGroenten.length;
    for (var i = 0; i < length; i++) {
        if (aaGroenten[i][0] === sGroente) {
            return parseFloat(aaGroenten[i][1]);
        }
    }
    return false;
}


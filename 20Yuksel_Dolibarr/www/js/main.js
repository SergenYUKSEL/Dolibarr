
function GetParametre(parameterName) { 
    let parameters = new URLSearchParams(window.location.search);
    return parameters.get(parameterName);
};

let url = GetParametre("param1");
let sousdossier = GetParametre("param2");
/* probleme rencontré lors du transfert de l'url de la premiere page vers la deuxieme page : */
/* Faire attention, quand on déclare ces variables url et sousdossier a coté du token, étant donné qu'elles sont dans une fonction myfonction, elles ont comme valeur : null, pour eviter cela, on les met au dessus, hors d'une fonction */

function ResetInput() {
    document.getElementById("ddp").value = "";
    document.getElementById("libelle").value = "";
    document.getElementById("montant").value = "";
}

const caseSisi = document.querySelector('#sisi');
const envoie = document.getElementById('envoie');



envoie.addEventListener("click", myFunction);

function myFunction() {
    var date = new Date(document.getElementById("ddp").value);
    var dateTimestamp = date.getTime() / 1000;
    var libelle = document.getElementById("libelle").value;
    var montant = document.getElementById("montant").value;
    var mode = document.querySelector('#mode').value;

    token = GetParametre("token");
    httpRequest = new XMLHttpRequest();
    if (!httpRequest) {
        console.log('Erreur | Impossible de créer l\'instance XMLHttpRequest');
        return false;
    }

    httpRequest.onreadystatechange = alertContents; 
    
    httpRequest.open('POST', 'http://' + url + sousdossier + '/api/index.php/bankaccounts/1/lines');
    httpRequest.setRequestHeader('DOLAPIKEY', token);
    httpRequest.setRequestHeader("Content-Type", "application/json")
    httpRequest.send('{ "date": "' + dateTimestamp + '", "type": "' + mode + '", "label":"' + libelle + '",  "amount":' + parseInt(montant) + '}');

    function alertContents() {
        setTimeout(() => {

            if (httpRequest.status === 200) {

                caseSisi.innerHTML = "<p class='succes'> Votre demande a été prise avec succes</p>";

            } else {
                caseSisi.innerHTML = "<p class='warning'> Assure-vous d'avoir bien rempli toute les champs </p>";
            }

        }, 1000);

    }

    ResetInput();
};

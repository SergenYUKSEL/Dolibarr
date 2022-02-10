


const envoie = document.querySelector('#envoie');
const result = document.querySelector('#result');

let token;
let url ="";
let sousdossier = "";
var httpRequest;
document.getElementById("connexion").addEventListener('click', makeRequest);
const caseResult = document.getElementById('result');
const caseErreur = document.getElementById('erreur');

function makeRequest() {

  const identifiant = document.getElementById('identifiant').value;
  const mdp = document.getElementById('mdp').value;
   url = document.getElementById('url').value;
  sousdossier = document.getElementById('sousdossier').value;
  httpRequest = new XMLHttpRequest();

  if (!httpRequest) {
    console.log('Abandon :frowning: Impossible de créer une instance de XMLHTTP');
    return false;
  }

  httpRequest.onreadystatechange = alertContents;

  httpRequest.open('GET', "http://" + url  + sousdossier +  "/api/index.php/login?login=" + identifiant + "&password=" + mdp + "");

  httpRequest.send();

  test();
}

function alertContents() {

  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
      var rep = httpRequest.responseText;
      var repJSON = JSON.parse(rep);
      token = repJSON.success.token;
      id_user = repJSON.success.id;

    } else {
      caseErreur.innerHTML = "<p class='warning'> Mot de passe ou Identifiant incorrect // Ou probleme de requetes</p>";
    }
  }
}

function test() {

  setTimeout(() => {

    const Verif = new Promise((resolve, reject) => {
      if (typeof token != "undefined") {
        resolve();
      } else {
        reject();
      }
    })

    Verif.then(() => {
      alert('Bienvenue dans notre application ! Vous allez être rediriger vers la page du formulaire de remboursement')
      window.location.href = 'formulaire.html?token=' + token + '' + '&param1=' + url + '&param2=' + sousdossier ;

    }).catch(() => {
      caseErreur.innerHTML = "<p class='warning'> Mot de passe ou Identifiant incorrect // Ou probleme de requetes</p>";

    })

  }, 2000);
}

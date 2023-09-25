const envoie = document.getElementById("envoie");
const apiUrl = 'https://geo.api.gouv.fr/communes?codePostal=';
const cp = document.getElementById("cp");
const SelectVille = document.getElementById("SelectVille");
console.log(SelectVille)
const afficheProp = document.getElementById("afficheProp");

let url;
let ListeVille;

function test() {
    url = apiUrl + cp.value;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Traitement des données renvoyées par l'API ici
            ListeVille = data; //copie le tableau data dans une variable
            if (ListeVille && ListeVille.length >= 1) { //Si le nombre d'éléments de ListeVille (data) est sup à 1, alors il y a au moins une ville
                console.log("ici")


                ListeVille.forEach(v => {

                    let option = document.createElement("option");
                    option.textContent = v.nom;
                    option.value = v.code;
                    SelectVille.appendChild(option)
                    

                });
            }
        })
        .catch(error => {
            console.error('Erreur lors de la requête : ', error);
        });
}

envoie.addEventListener("click", test);

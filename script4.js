const envoie = document.getElementById("envoie");
const apiUrl = 'https://geo.api.gouv.fr/communes?codePostal=';
const cp = document.getElementById("cp");
const ville = document.getElementById("ville");
const villeListe = document.getElementById("villeListe");
const afficheProp = document.getElementById("afficheProp");
let url;
let ListeVille;

function test(){
    url = apiUrl+cp.value;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        // Traitemeent des données renvoyées par l'API ici
        ville.value = data[0].nom; //préremplie le contenue de l'input ville avec la première valeur de la ville
        ListeVille = data; //copie le tableau data dans une variable
    })
    .catch(error => {
        console.error('Erreur lors de la requête : ', error);
    });
}

function afficherVillesCorrespondantes(){
    //Permet d'afficher les propositions de villes quand on passe la souris sur l'input "ville"
    villeListe.innerHTML = ''; //Vide la liste
    if(ListeVille && ListeVille.length >= 1){ //Si le nombre d'éléments de ListeVille (data) est sup à 1, alors il y a au moins une ville
        const ul = document.createElement("ul"); //Va servir à stocker toutes les villes
        ListeVille.forEach(v => { //Parcours les éléments de ListeVille, en les stockant dans v
            const li = document.createElement("li"); //crée un élément
            li.textContent = v.nom; //Remplis cet élément avec le nom de la ville parcourue

            li.addEventListener("click", () => {
                //Fais en sorte que la liste disparaisse quand on clique sur une proposition de ville
                ville.value = v.nom; //l'input prend la valeur de l'élément cliqué
                villeListe.innerHTML = ''; //Cache la liste après avoir sélectionné une ville
            });

            ul.appendChild(li); //ajoute l'élément "li" à l'élément "ul"
        });
        villeListe.appendChild(ul); //ajoute ul à la l'élément villeListe
    }
}

envoie.addEventListener("click", test);
ville.addEventListener("mouseover", () => {
    afficherVillesCorrespondantes(); // Appelez la fonction pour afficher les villes correspondantes
});
afficheProp.addEventListener("mouseleave", () => {
    //permet de ne plus afficher les propositions de villes quand on clique l'input et les propositions
    villeListe.innerHTML = '';
});
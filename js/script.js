// Sélectionne l'élément HTML avec l'ID 'communeSelect'
const communeSelect = document.getElementById('SelectVille');
const envoie = document.getElementById("envoie");
const apiUrl = 'https://geo.api.gouv.fr/communes?codePostal=';
const cp = document.getElementById("cp");
const SelectVille = document.getElementById("SelectVille");
const nbjour = document.getElementById("nbjour");
const depardieu = document.getElementById("depardieu");
const SelectJour = document.getElementById("SelectJour");
const envoieNbJours = document.getElementById("envoyer2");



// Sélectionne l'élément HTML avec l'ID 'envoyer' et ajoute un écouteur d'événements 'click'
document.getElementById('envoyer').addEventListener('click',()=>{
    // Appelle la fonction de traitementMeteo lorsque le bouton est cliqué
    traitementMeteo();
})

envoieNbJours.addEventListener('click',()=>{
    //Appelle de la fonction de traitement meteo en fonction du jours choisi
    traitementMeteoJours();
})


//appelle fonction chercheCP pour liste commune

cp.addEventListener('change',()=>{
    let nb_cp = parseInt(cp.value)

    if(nb_cp > 9999){
        SelectVille.disabled = false
        chercheCP();
    }else{
        SelectVille.disabled = true
    }
});

nbjour.addEventListener('change', ()=>{
    let nb_j = parseInt(nbjour.value)

    if(nb_j >= 1  && nb_j <= 14){
        depardieu.style.display = 'block';
        SelectionJour();
    }
});

function SelectionJour(){
    SelectJour.innerHTML = '';
    const today = new Date();
    for(let i = 0; i < nbjour.value; i++){
        let option = document.createElement("option");
        option.textContent = "test";
        option.value = i;
        const dateOption = new Date(today);
        dateOption.setDate(today.getDate() + i); // Ajoute i jours à la date d'aujourd'hui
        option.textContent = formatDate(dateOption); // Formatte la date comme souhaité
        SelectJour.appendChild(option);
    }
}

function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
}

//fonction qui gère la liste des communes 
//fonction qui gère la liste des communes 
function chercheCP() {
    SelectVille.innerHTML = ''; //vide le SelectVille pour éviter les bugs
    let url; //définie la variable url
    url = apiUrl + cp.value; //fusionne dans url Le contenue d'apiURL avec un code postal
    fetch(url) //utilise l'url obtenue pour le fetch, et mettre le tableau qu'il contient dans data
        .then(response => response.json())
        .then(data => {
            // Traitement des données renvoyées par l'API ici
            if (data && data.length >= 1) { //Si le nombre d'éléments de data est sup à 1, alors il y a au moins une ville
                data.forEach(v => { //parcours le tableau data. v prend la valeur de chaque ville
                    //crée un élément "option", qui va prendre une valeur égal au code postal, et un nom égal au nom de la ville
                    let option = document.createElement("option");
                    option.textContent = v.nom;
                    option.value = v.code;
                    SelectVille.appendChild(option)
                });
            }
        })
        .catch(error => { //gestion erreur
            console.error('Erreur lors de la requête : ', error);
        });
}


// Définit une fonction de traitement pour la météo
function traitementMeteo(){
    // Récupère la valeur sélectionnée dans la liste déroulante communeSelect
    const commune= communeSelect.value;
    if(commune!=null){
            // Effectue une requête fetch pour obtenir les données météorologiques
        fetch(`https://api.meteo-concept.com/api/forecast/daily/0?token=78566df65679384cb5aef99952feed7743b1c622f6cf67fb152c48716c77bce9&insee=${commune}`).then(response=> 
            response.json().then(data => {
                console.log(data);
                document.getElementById('tMin').textContent=data.forecast.tmin + "°C"; //met à jour la température minimal de la ville sélectionnée 
                document.getElementById('tMax').textContent=data.forecast.tmax + "°C"; //met à jour la température maximal de la ville sélectionnée 
                document.getElementById('probabilite').textContent=data.forecast.probarain+ "%"; //met à jour la probabilité de pluie en % de la ville sélectionnée 
                document.getElementById('latitude').textContent=data.city.latitude; //met à jour la latitude de la ville sélectionnée 
                document.getElementById('longitude').textContent=data.city.longitude; //met à jour la longitude de la ville sélectionnée 
                let date= new Date(Date.now());
                document.getElementById('date').textContent=creer_date(date); //met à jour la date d'aujourd'hui de la ville sélectionnée 
                document.getElementById('ville').textContent=data.city.name; //met à jour le nom de la ville sélectionnée sur la page html 
                //document.getElementById('vitesse').textContent=data.forecast.wind10m+" km/h"; //met à jour la vitesse du vent de la ville sélectionnée 
                document.getElementById('tempsSoleil').textContent=data.forecast.sun_hours +" h"; //met à jour le temps d'ensoleillement de la ville sélectionnée 
                //document.getElementById('direction').textContent=data.forecast.dirwind10m+" °"; //met à jour le degrès de direction du vent de la ville sélectionnée 
                //document.getElementById('precipitation').textContent=data.forecast.rr10+" mm";//met à jour le cumul de pluie sur la journée en mm de la ville sélectionnée 
            })
        ).catch((err)=>console.log('Erreur : '+ err));
    }
}

// Définit une fonction de traitement pour la météo
function traitementMeteoJours(){
    // Récupère la valeur sélectionnée dans la liste déroulante communeSelect
    const commune= communeSelect.value;
    const jour=SelectJour.value;
    if(commune!=null){
            // Effectue une requête fetch pour obtenir les données météorologiques pour le jour choisi et la ville choisi
        fetch(`https://api.meteo-concept.com/api/forecast/daily?token=78566df65679384cb5aef99952feed7743b1c622f6cf67fb152c48716c77bce9&insee=${commune}`).then(response=> 
            response.json().then(data => {
                console.log(data);
                document.getElementById('tMin').textContent=data.forecast[jour].tmin + "°C"; //met à jour la température minimal de la ville sélectionnée 
                document.getElementById('tMax').textContent=data.forecast[jour].tmax + "°C"; //met à jour la température maximal de la ville sélectionnée 
                document.getElementById('probabilite').textContent=data.forecast[jour].probarain + "%"; //met à jour la probabilité de pluie en % de la ville sélectionnée 
                document.getElementById('latitude').textContent=data.city.latitude; //met à jour la latitude de la ville sélectionnée 
                document.getElementById('longitude').textContent=data.city.longitude; //met à jour la longitude de la ville sélectionnée 
                let date= new Date(data.forecast[jour].datetime);
                document.getElementById('date').textContent=creer_date(date); //met à jour la date d'aujourd'hui de la ville sélectionnée 
                document.getElementById('ville').textContent=data.city.name; //met à jour le nom de la ville sélectionnée sur la page html 
                //document.getElementById('vitesse').textContent=data.forecast.wind10m+" km/h"; //met à jour la vitesse du vent de la ville sélectionnée 
                document.getElementById('tempsSoleil').textContent=data.forecast[jour].sun_hours +" h"; //met à jour le temps d'ensoleillement de la ville sélectionnée 
                //document.getElementById('direction').textContent=data.forecast.dirwind10m+" °"; //met à jour le degrès de direction du vent de la ville sélectionnée 
                //document.getElementById('precipitation').textContent=data.forecast.rr10+" mm";//met à jour le cumul de pluie sur la journée en mm de la ville sélectionnée */
            })
        ).catch((err)=>console.log('Erreur : '+ err));
    }
}



function creer_date(date){
    let chaine_date = "";

    //Ajout du jour de la semaine
    if(date.getDay()== 1){
        chaine_date += "Lundi";
    }else if(date.getDay()== 2){
        chaine_date += "Mardi";
    }else if(date.getDay()== 3){
        chaine_date += "Mercredi";
    }else if(date.getDay()== 4){
        chaine_date += "Jeudi";
    }else if(date.getDay()== 5){
        chaine_date += "Vendredi";
    }else if(date.getDay()== 6){
        chaine_date += "Samedi";
    }else if(date.getDay()== 7){
        chaine_date += "Dimanche";
    }

    //Ajout du numéro du jour dans le mois
    chaine_date += " " + date.getUTCDate(); 

    //Ajout du mois
    switch(date.getMonth() + 1){
        case 1: chaine_date += " " + "Janvier";
        break;
        case 2: chaine_date += " " + "Février";
        break;
        case 3: chaine_date += " " + "Mars";
        break;
        case 4: chaine_date += " " + "Avril";
        break;
        case 5: chaine_date += " " + "Mai";
        break;
        case 6: chaine_date += " " + "Juin";
        break;
        case 7: chaine_date += " " + "Juillet";
        break;
        case 8: chaine_date += " " + "Août";
        break;
        case 9: chaine_date += " " + "Septembre";
        break;
        case 10: chaine_date += " " + "Octobre";
        break;
        case 11: chaine_date += " " + "Novembre";
        break;
        case 12: chaine_date += " " + "Décembre";
    }

    //Ajout de l'année
    chaine_date += " " + date.getFullYear();

    return chaine_date;
}

function scrollToSection2() {
    const section2 = document.getElementById('section2');
    section2.scrollIntoView({ behavior: 'smooth' });
}
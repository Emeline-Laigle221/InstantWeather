// Sélectionne l'élément HTML avec l'ID 'communeSelect'
const communeSelect = document.getElementById('SelectVille');
const envoie = document.getElementById("envoie");
const apiUrl = 'https://geo.api.gouv.fr/communes?codePostal=';
const cp = document.getElementById("cp");
const SelectVille = document.getElementById("SelectVille");

//Traduction des codes météos
const meteoCode = { 0: "Soleil",
    1: "Peu nuageux",
    2: "Ciel voilé",
    3: "Nuageux",
    4: "Très nuageux",
    5: "Couvert",
    6: "Brouillard",
    7: "Brouillard givrant",
    10: "Pluie faible",
    11: "Pluie modérée",
    12: "Pluie forte",
    13: "Pluie faible verglaçante",
    14: "Pluie modérée verglaçante",
    15: "Pluie forte verglaçante",
    16: "Bruine",
    20: "Neige faible",
    21: "Neige modérée",
    22: "Neige forte",
    30: "Pluie et neige mêlées faibles",
    31: "Pluie et neige mêlées modérées",
    32: "Pluie et neige mêlées fortes",
    40: "Averses de pluie locales et faibles",
    41: "Averses de pluie locales",
    42: "Averses locales et fortes",
    43: "Averses de pluie faibles",
    44: "Averses de pluie",
    45: "Averses de pluie fortes",
    46: "Averses de pluie faibles et fréquentes",
    47: "Averses de pluie fréquentes",
    48: "Averses de pluie fortes et fréquentes",
    60: "Averses de neige localisées et faibles",
    61: "Averses de neige localisées",
    62: "Averses de neige localisées et fortes",
    63: "Averses de neige faibles",
    64: "Averses de neige",
    65: "Averses de neige fortes",
    66: "Averses de neige faibles et fréquentes",
    67: "Averses de neige fréquentes",
    68: "Averses de neige fortes et fréquentes",
    70: "Averses de pluie et neige mêlées localisées et faibles",
    71: "Averses de pluie et neige mêlées localisées",
    72: "Averses de pluie et neige mêlées localisées et fortes",
    73: "Averses de pluie et neige mêlées faibles",
    74: "Averses de pluie et neige mêlées",
    75: "Averses de pluie et neige mêlées fortes",
    76: "Averses de pluie et neige mêlées faibles et nombreuses",
    77: "Averses de pluie et neige mêlées fréquentes",
    78: "Averses de pluie et neige mêlées fortes et fréquentes",
    100: "Orages faibles et locaux",
    101: "Orages locaux",
    102: "Orages fort et locaux",
    103: "Orages faibles",
    104: "Orages",
    105: "Orages forts",
    106: "Orages faibles et fréquents",
    107: "Orages fréquents",
    108: "Orages forts et fréquents",
    120: "Orages faibles et locaux de neige ou grésil",
    121: "Orages locaux de neige ou grésil",
    122: "Orages locaux de neige ou grésil",
    123: "Orages faibles de neige ou grésil",
    124: "Orages de neige ou grésil",
    125: "Orages de neige ou grésil",
    126: "Orages faibles et fréquents de neige ou grésil",
    127: "Orages fréquents de neige ou grésil",
    128: "Orages fréquents de neige ou grésil",
    130: "Orages faibles et locaux de pluie et neige mêlées ou grésil",
    131: "Orages locaux de pluie et neige mêlées ou grésil",
    132: "Orages fort et locaux de pluie et neige mêlées ou grésil",
    133: "Orages faibles de pluie et neige mêlées ou grésil",
    134: "Orages de pluie et neige mêlées ou grésil",
    135: "Orages forts de pluie et neige mêlées ou grésil",
    136: "Orages faibles et fréquents de pluie et neige mêlées ou grésil",
    137: "Orages fréquents de pluie et neige mêlées ou grésil",
    138: "Orages forts et fréquents de pluie et neige mêlées ou grésil",
    140: "Pluies orageuses",
    141: "Pluie et neige mêlées à caractère orageux",
    142: "Neige à caractère orageux",
    210: "Pluie faible intermittente",
    211: "Pluie modérée intermittente",
    212: "Pluie forte intermittente",
    220: "Neige faible intermittente",
    221: "Neige modérée intermittente",
    222: "Neige forte intermittente",
    230: "Pluie et neige mêlées",
    231: "Pluie et neige mêlées",
    232: "Pluie et neige mêlées",
    235: "Averses de grêle",
};


// Sélectionne l'élément HTML avec l'ID 'envoyer' et ajoute un écouteur d'événements 'click'
document.getElementById('envoyer').addEventListener('click',()=>{
    // Appelle la fonction de traitementMeteo lorsque le bouton est cliqué
traitementMeteo();
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
        fetch(`https://api.meteo-concept.com/api/forecast/daily/0?token=a40f714d88661e3a21d0b715f5867d5953a2231d2b9beefa5838800b5fc40d8d&insee=${commune}`).then(response=> 
            response.json().then(data => {
                console.log(data);
                document.getElementById('tMin').textContent=data.forecast.tmin; //met à jour la température minimal de la ville sélectionnée 
                document.getElementById('tMax').textContent=data.forecast.tmax; //met à jour la température maximal de la ville sélectionnée 
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
                changer_image_meteo(data.forecast.weather);
                changer_libelle_meteo(data.forecast.weather);
            })
        ).catch((err)=>console.log('Erreur : '+ err));
    }
}


//Fonction créant la date affiché à droite dans l'élément html "date"
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

//Fonction changeant l'image de gauche en fonction de la météo
function changer_image_meteo(numero){
    const image = document.getElementById("icone");
    //Chaque numéro correspond à une météo référencé sur : https://api.meteo-concept.com/documentation#code-temps
    //La boucle suivante change l'image de gauche en fonction du code météo
    switch(numero){
        case 0 : 
            image.src = "image/sun-solid.svg";
            image.alt = "Soleil";
            break;
        case 1:
        case 2: 
            image.src = "image/cloud-sun-solid.svg";
            image.alt = "Soleil derrière un nuage";
            break;
        case 3:
        case 4:
        case 5: 
            image.src = "image/cloud-solid.svg";
            image.alt = "Nuage";
            break;
        case 6:
        case 7: 
            image.src = "image/smog-solid";
            image.alt = "Brouillard";
            break;
        case 10:
        case 11:
        case 40:
        case 46:
        case 210 : 
            image.src = "image/cloud-sun-rain-solid.svg";
            image.alt = "Solei derrière un nuage pluvieux";
            break;
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 41:
        case 42:
        case 43:
        case 44:
        case 45:
        case 47:
        case 48:
        case 211:
        case 212: 
            image.src = "image/cloud-showers-heavy-solid.svg";
            image.alt = "Pluie";
            break;
        case 20:
        case 21:
        case 22:
        case 30:
        case 31:
        case 32:
        case 60:
        case 61:
        case 62:
        case 63:
        case 64:
        case 65:
        case 66:
        case 67:
        case 68:
        case 70:
        case 71:
        case 72:
        case 73:
        case 74:
        case 75:
        case 76:
        case 78:
        case 79:
        case 220:
        case 221:
        case 222:
        case 230:
        case 231:
        case 232:
        case 235 : 
            image.src = "image/snowflake-regular.svg";
            image.alt = "Flocon de neige";
            break;
        default : 
            image.src = "image/cloud-bolt-solid.svg";
            image.alt = "Nuage orageux";
            break;
    }
}

//Fonction modifiant le libelle "etat" en fontion du code météo obtenu
function changer_libelle_meteo(numero){
    document.getElementById("etat").textContent = meteoCode[numero];
}
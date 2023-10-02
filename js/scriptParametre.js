// Éléments de la page paramètre
const valider = document.getElementById("valider");
const coordonees = document.getElementById("coordonnees");
const longitude = document.getElementById("longitude");
const latitude = document.getElementById("latitude");
const vent = document.getElementById("vent");
const vitesse = document.getElementById("vitesse");
const direction = document.getElementById("direction");
const pluie = document.getElementById("pluie");
const probabilite = document.getElementById("probabilite");
const precipitation = document.getElementById("precipitation");

// longitude.checked = localStorage.getItem('longitude');
// latitude.checked = localStorage.getItem('latitude');
// direction.checked = localStorage.getItem('direction');
// vitesse.checked = localStorage.getItem('vitesse');
// probabilite.checked = localStorage.getItem('probabilite');
// precipitation.checked = localStorage.getItem('precipitation');
// console.log(localStorage.getItem('longitude'));

if(localStorage.getItem('longitude') == 'true'){
    longitude.checked = true;
    if(localStorage.getItem('latitude') == 'true'){
        coordonees.checked = true;
    }
}

if(localStorage.getItem('latitude') == 'true'){
    latitude.checked = true;
    if(localStorage.getItem('longitude') == 'true'){
        coordonees.checked = true;
    }
}

if(localStorage.getItem('direction') == 'true'){
    direction.checked = true;
    if(localStorage.getItem('vitesse') == 'true'){
        vent.checked = true;
    }
}

if(localStorage.getItem('vitesse') == 'true'){
    vitesse.checked = true;
    if(localStorage.getItem('direction') == 'true'){
        vent.checked = true;
    }
}

if(localStorage.getItem('probabilite') == 'true'){
    plui.checked = true;
    if(localStorage.getItem('precipitation') == 'true'){
        pluie.checked = true;
    }
}

if(localStorage.getItem('precipitation') == 'true'){
    precipitation.checked = true;
    if(localStorage.getItem('probabilite') == 'true'){
        pluie.checked = true;
    }
}

// Selection des paramètre de coordonnées
coordonees.addEventListener('change', ()=>{
    if(coordonees.checked){
        longitude.checked = coordonees.checked;
        latitude.checked = coordonees.checked;
    }
    else{
        longitude.checked = coordonees.checked;
        latitude.checked = coordonees.checked;
    }
});

// Selection des paramètre de vent
vent.addEventListener('change', ()=>{
    if(vent.checked){
        vitesse.checked = vent.checked;
        direction.checked = vent.checked;
    }
    else{
        vitesse.checked = vent.checked;
        direction.checked = vent.checked;
    }
});

// // Selection des paramètre de pluie
pluie.addEventListener('change', ()=>{
    if(pluie.checked){
        probabilite.checked = pluie.checked;
        precipitation.checked = pluie.checked;
    }
    else{
        probabilite.checked = pluie.checked;
        precipitation.checked = pluie.checked;
    }
});

valider.addEventListener('click', ()=>{
    localStorage.setItem('longitude', longitude.checked);
    localStorage.setItem('latitude', latitude.checked);
    localStorage.setItem('vitesse', vitesse.checked);
    localStorage.setItem('direction', direction.checked);
    localStorage.setItem('probabilite', probabilite.checked);
    localStorage.setItem('precipitation', precipitation.checked);
});


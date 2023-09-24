
//const communeSelect = document.getElementById('communeSelect');
//let rechercher=document.getElementById('rechercher');

//rechercher.addEventListener('click',()=>{
//    traitementMeteo();
//});

window.onload= ()=>{
    traitementMeteo();
}

function traitementMeteo(){
    //const commune= communeSelect.value;
    //if(commune!=null){
        let city='Rouen';
        let url ='https://api.meteo-concept.com/api/forecast/daily/0?token=78566df65679384cb5aef99952feed7743b1c622f6cf67fb152c48716c77bce9&insee='+city;
        fetch(url).then(response=> 
            response.json().then(data => {
                console.log(data);
                document.getElementById('tMin').textContent=data.forecast.tmin;
                document.getElementById('tMax').textContent=data.forecast.tmax;
                document.getElementById('direction').textContent=data.forecast.probarain;
                document.getElementById('latitude').textContent=data.city.latitude;
                document.getElementById('longitude').textContent=data.city.longitude;
                let date= new Date(Date.now());
                document.getElementById('date').textContent=date;
                //document.getElementById('ensoleillement').textContent='${displayHours(data.forecast.sun_hours)}';
            })
        ).catch((err)=>console.log('Erreur : '+ err));
    //}
}




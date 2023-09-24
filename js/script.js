const communeSelect = document.getElementById('communeSelect');
let rechercher=document.getElementById('rechercher');

rechercher.addEventListener('click',()=>{
    traitementMeteo();
});


function traitementMeteo(){
    const commune= communeSelect.value;
    if(commune!=null){
        let url ='https://api.meteo-concept.com/api/forecast/daily/0?token=78566df65679384cb5aef99952feed7743b1c622f6cf67fb152c48716c77bce9&insee=${commune}';
        fetch(url).then(response=> 
            response.json().then(data => {
                document.getElementById('tMin').textContent='${data.forecast.tmin}';
                document.getElementById('tMax').textContent='${data.forecast.tmax}';
                document.getElementById('direction').textContent='${data.forecast.probarain}';
                document.getElementById('ensoleillement').textContent='${displayHours(data.forecast.sun_hours)}';
            })
        ).catch((err)=>console.log('Erreur : '+ err));
    }
}




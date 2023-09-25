
const communeSelect = document.getElementById('communeSelect');




function traitementMeteo(){
    const commune= communeSelect.value;
    //if(commune!=null){
        fetch(`https://api.meteo-concept.com/api/forecast/daily/0?token=a40f714d88661e3a21d0b715f5867d5953a2231d2b9beefa5838800b5fc40d8d&insee=${commune}`).then(response=> 
            response.json().then(data => {
                console.log(data);
                document.getElementById('tMin').textContent=data.forecast.tmin;
                document.getElementById('tMax').textContent=data.forecast.tmax;
                document.getElementById('direction').textContent=data.forecast.probarain;
                document.getElementById('latitude').textContent=data.city.latitude;
                document.getElementById('longitude').textContent=data.city.longitude;
                let date= new Date(Date.now());
                document.getElementById('date').textContent=date;
                document.getElementById('ville').textContent=data.city.name;
                //document.getElementById('ensoleillement').textContent='${displayHours(data.forecast.sun_hours)}';
            })
        ).catch((err)=>console.log('Erreur : '+ err));
    //}
}
let envoyer = document.getElementById('envoyer').addEventListener('click',()=>{
    traitementMeteo();
})




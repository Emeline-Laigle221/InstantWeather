/**
 * Auteur : Vladimir Rekaï
 */

//Éléments du document html
const cp_entre = document.getElementById("code_postal")
const commune_entre = document.getElementById("commune")

cp_entre.addEventListener('change',()=>{
    console.log("listener !")
    let entre = "" +cp_entre.value
    let nb_cp = parseInt(entre)
    console.log(nb_cp)
    if(nb_cp > 9999){
        commune_entre.disabled = false
    }else{
        commune_entre.disabled = true
    }
});
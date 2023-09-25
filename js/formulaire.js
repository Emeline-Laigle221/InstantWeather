/**
 * Auteur : Vladimir Rekaï
 */

//Éléments du document html
const cp_entre = document.getElementById("code_postal")
const commune_entre = document.getElementById("SelectVille")

/**
 * Écouteur sur le champ du code postal, permet d'activer le champ Commune lorsqu'un code postal valide est rentré. 
 */
cp_entre.addEventListener('change',()=>{
    let nb_cp = parseInt(cp_entre.value)

    if(nb_cp > 9999){
        commune_entre.disabled = false
    }else{
        commune_entre.disabled = true
    }
    
});
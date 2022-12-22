// Récupération du numéro de commande
const lienProduit = window.location.search;
const parametres = new URLSearchParams(lienProduit);
let orderId = parametres.get("orderId");

afficherNumeroCommande();

function afficherNumeroCommande () {
    let numeroCommande = document.getElementById("orderId");
    numeroCommande.innerHTML = `<br>${orderId}<br>Avec nos remerciements`;
    parametres.set("orderId", "");
    orderId = "";
    return 
}






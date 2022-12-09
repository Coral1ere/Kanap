
const lienProduit = window.location.search
const parametres = new URLSearchParams(lienProduit)
const orderId = parametres.get("orderId")

let numeroCommande = afficherNumeroCommande()
function afficherNumeroCommande () {
    let numeroCommande = document.getElementById("orderId");
    numeroCommande.textContent = orderId;
    numeroCommande = parametres.get("orderId");
}
localStorage.clear();


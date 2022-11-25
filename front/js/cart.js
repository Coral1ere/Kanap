"user strict";
let cart = window.localStorage.getItem("panier");
let cartArray= JSON.parse(cart);
console.log(cart);

function produitsSauvegardes(couleur,quantite) {
    const panier = {
        id: idProduit,
        colors: couleur,
        quantity: Number (quantite),  
    }
    localStorage.setItem(idProduit, JSON.stringify(panier))
    document.location.reload() 
}
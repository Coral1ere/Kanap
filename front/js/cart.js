"user strict";

    function produitsSauvegardes(couleur,quantite) {
        const existe = localStorage.getItem(`${idProduit}-${couleur}`)
    
            if(existe){
                quantite = Number(quantite) + Number(JSON.parse(existe).quantity)    
            }

        const idCouleur = `${idProduit}-${couleur}`
        const panier = {
            id: idProduit,
            colors: couleur,
            quantity: Number (quantite), 
        }    
        localStorage.setItem(idCouleur, JSON.stringify(panier))
    } 

    const cart = []
    
    function faireArticle(article) {
        const article = document.createElement("article")
        article.classList.add("cart__item")
    }
  

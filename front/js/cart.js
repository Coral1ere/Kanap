"user strict";
const cart = [];
    // Récupération du localStorage de la page Produits
    function produitsSauvegardes(couleur,quantite) {
        const existe = localStorage.getItem(`${idProduit}-${couleur}`);
    
            if(existe) {
                quantite = Number(quantite) + Number(JSON.parse(existe).quantity);   
            }

        const idCouleur = `${idProduit}-${couleur}`;
        const panier = {
            id: idProduit,
            colors: couleur,
            quantity: Number (quantite), 
        }    
        localStorage.setItem(idCouleur, JSON.stringify(panier));
    } 
    function recuperations(donnees) {
        donnees.forEach((canapes) => {
            const {article, div1, div2, div3, div4, div5, div6, imageUrl, altTxt, nom, color, price, quantites} = canapes
            const cartItem = faireArticle(article);
            const cartItemImg = faireDiv(div1);
            const cartItemContent = faireDiv2(div2);
            const cartItemContentDescription = faireDiv3(div3);
            const cartItemContentSettings = faireDiv4(div4);
            const cartItemContentSettingsQuantity = faireDiv5(div5);
            const cartItemContentSettingsDelete = faireDiv6(div6);
            const image = faireImage(imageUrl, altTxt);
            const h2 = faireH2(nom);
            const paragraphe = faireParagraphe(color);
            const paragraphe2 = faireParagraphe2(price);
            const input = faireInput(quantites);
            recupSection(section);
            }
        )}

    function recupSection(section) {
        const cartItems = document.getElementById("cart__items"); 
        cartItems.appendChild("cartItem");
        }

    function faireArticle(article) {
        const cartItem = document.createElement("article");
        cartItem.classList.add("cart__item");
        cartItem.setAttribute("data-id", "product-ID");
        cartItem.setAttribute("data-color", "product-color");
        cartItem.appendChild(cartItemImg);
        cartItem.appendchild(cartItemContent);
        
        return cartItem
    }

    function faireDiv(div1) {
        const cartItemImg = document.createElement("div");
        cartItemImg.classList.add("cart__item__img");
        
        if (cartItemImg) {
            cartItemImg.appendChild(image);
            }
        return cartItemImg
    }
    function faireImage(imageUrl, altTxt) {
        const image = document.createElement("img");
        image.src = imageUrl;
        image.alt = altTxt;
        return image
    }
    function faireDiv2(div2) {
        const cartItemContent = document.createElement("div");
        cartItemContent.classList.add("cart__item__content");
        
        if (cartItemContent) {  
            cartItemContent.appendChild(cartItemContentDescription);
            cartItemContent.appendChild(cartItemContentSettings);
        }
        return cartItemContent
    }
    function faireDiv3(div3) {
        const cartItemContentDescription = document.createElement("div");
        cartItemContentDescription.classList.add("cart__item__content__description");
        cartItemContentDescription.appendChild(h2);
        cartItemContentDescription.appendChild(paragraphe);
        cartItemContentDescription.appendChild(paragraphe2);
        return cartItemContentDescription
    }
    function faireH2(nom) {
        const h2 = document.createElement("h2");
        h2.textContent = "nom du produit";
        return h2
    }
    function faireParagraphe(color) {
        const paragraphe = document.createElement("p");
        paragraphe.textContent = "color";
        return paragraphe;
    }
    function faireParagraphe2(price) {
        const paragraphe2 = document.createElement("p");
        paragraphe2.textContent = "price";
        return paragraphe2
    }
    function faireDiv4(faireDiv4) {
        const cartItemContentSettings = document.createElement("div");
        cartItemContentSettings.classList.add("cart__item__content__settings");
        cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);
        cartItemContentSettings.appendChild(cartItemContentSettingsDelete);
        return cartItemContentSettings
    }
    function faireDiv5(faireDiv5) {
        const cartItemContentSettingsQuantity = document.createElement("div");
        cartItemContentSettingsQuantity.classList.add("cart__item__content__settings__Quantity");
        cartItemContentSettingsQuantity.appendChild(paragraphe3);
        cartItemContentSettingsQuantity.appendChild(input);
        return cartItemContentSettingsQuantity
    }
    function faireParagraphe3(quantité) {
    const paragraphe3 = document.createElement("p");
    paragraphe3.textContent = "Qté";
    return paragraphe3
    }
    function faireInput(quantites) {
        const input = document.createElement("input");
        input.classList.add("itemQuantity");
        input.setAttribute("type", "number");
        input.setAttribute("name", "itemQuantity");
        input.setAttribute("value", quantites);
        input.setAttribute("min", "1");
        input.setAttribute("max", "100");
        return input
    }
    function faireDiv6(div6) {
        const cartItemContentSettingsDelete = document.createElement("div");
        cartItemContentSettingsDelete.classList.add("cart__item__settings__delete");
        cartItemContentSettingsDelete.appendChild(deleteItems);
        return cartItemContentSettingsDelete
    }
    function faireParagraphe4(supprimer) {
        const deleteItems = document.createElement("p");
        deleteItems.classlist.add("deleteItem");
        deleteItems.textContent = "Supprimer";
    }

  

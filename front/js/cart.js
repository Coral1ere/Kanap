//"use strict"; // révèle les erreurs

const cart = [];
recupObjets();

cart.forEach((item) => afficherObjets(item))

function recupObjets() {
    const nombreObjets = localStorage.length
    for (let i = 0; i < nombreObjets; i++) {
        
        const item = localStorage.getItem(localStorage.key(i))
        const itemObjets = JSON.parse(item); // passer le string en objet
        cart.push (itemObjets) // permet d'ajouter les objets au tableau
        
    }
}

    function afficherObjets(item) {
        const article = faireArticles(item);
        faireImageDiv(item);
        afficherArticles(article)
        const div = faireImageDiv(item)
        article.appendChild(div)
        const cartItemContent = faireDivs2(item)
        article.appendChild(cartItemContent)
        const cartItemContentSettings = faireDivs4(item)
        cartItemContent.appendChild(cartItemContentSettings)
        const totalQuantity = totalQuantite()
        const totalPrice = totalPrix()
        
        
    } 

    function faireDivs2(item) {
        const cartItemContent = document.createElement("div");
        cartItemContent.classList.add("cart__item__content");
        
        const cartItemContentDescription = document.createElement("div");
        cartItemContentDescription.classList.add("cart__item__content__description");
        
        const h2 = document.createElement("h2");
        h2.textContent = item.name;
        cartItemContentDescription.appendChild(h2);

        const paragraphe = document.createElement("p");
        paragraphe.textContent = item.color;
        cartItemContentDescription.appendChild(paragraphe);

        const paragraphe2 = document.createElement("p");
        paragraphe2.textContent = item.price + "€";
        cartItemContentDescription.appendChild(paragraphe2);  
        cartItemContent.appendChild(cartItemContentDescription)
        return cartItemContent
    }
    function faireArticles(item) {
        const article = document.createElement("article");
        afficherArticles(article);
        article.classList.add("cart__item");
        article.dataset.id = item.id;
        article.dataset.color = item.color;
        return article 
    }
  
    function afficherArticles(article) {
        document.getElementById("cart__items").appendChild(article);
    }

    function faireImageDiv(item) {
        const div = document.createElement("div")
        div.classList.add ("cart__item__img")
        const image = document.createElement("img");
        image.src = item.imageUrl;
        image.alt = item.altTxt;
        div.appendChild(image)
        return div
    }
    
    function faireDivs4(item) {
        const cartItemContentSettings = document.createElement("div");
        cartItemContentSettings.classList.add("cart__item__content__settings");

        const cartItemContentSettingsQuantity = faireDivs5(item);
        cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);
        const cartItemContentSettingsDelete = faireDivs6(item);
        cartItemContentSettings.appendChild(cartItemContentSettingsDelete);    
        return cartItemContentSettings
    }
  
    function faireParagraphe3() {
    const paragraphe3 = document.createElement("p");
    paragraphe3.textContent = "Qté : ";
    return paragraphe3
    }
    function totalQuantite() {
        const totalQuantity = document.getElementById("totalQuantity");
        const total = cart.reduce((total, item) => total + item.quantity, 0)
        totalQuantity.textContent = total;
    
    }  
    function totalPrix() { 
        const totalPrice = document.getElementById("totalPrice")
        const total = cart.reduce((total, item) => total + item.quantity * item.price, 0)
        totalPrice.textContent = total;
         
    }
    function faireDivs5(item) {
        const cartItemContentSettingsQuantity = document.createElement("div");
        cartItemContentSettingsQuantity.classList.add("cart__item__content__settings__Quantity");
        
        const paragraphe3 = faireParagraphe3(item);
        cartItemContentSettingsQuantity.appendChild(paragraphe3);

        const input = faireInput(item);
        cartItemContentSettingsQuantity.appendChild(input);
        return cartItemContentSettingsQuantity
    }
    function faireInput(item) {
        const input = document.createElement("input");
        input.classList.add("itemQuantity");
        input.type = "number";
        input.name = "itemQuantity";
        input.value = item.quantity;
        input.min = "1";
        input.max = "100";
        input.addEventListener("change" , () => majQuantitePrix(item.id, input.value, item));
        return input;
    }
    
    // Mise à jour nouvelles quantités
    function majQuantitePrix(id, nouvelleValeur, item) {
        const maj = cart.find((item) => item.id === id);
        maj.total = Number(nouvelleValeur);
        item.quantity = maj.total;
        totalQuantite();
        totalPrix();
        changementQuantite(item)
    }
         //Enregistrer le changement
    function changementQuantite(item) {
        const panier = JSON.stringify(item);
        const key = `${item.id}-${item.color}`; 
        localStorage.setItem(key, panier);
    
    }

    function faireDivs6(item) {
        const cartItemContentSettingsDelete = document.createElement("div");
        cartItemContentSettingsDelete.classList.add("cart__item__content__settings__delete");
        cartItemContentSettingsDelete.addEventListener("click", () => supprimerArticle(item))
        
        const deleteItems = document.createElement("p");
        deleteItems.classList.add("deleteItem");
        deleteItems.textContent = "Supprimer";
        cartItemContentSettingsDelete.appendChild(deleteItems);
       
        totalQuantite(item)
        totalPrix(item)
        changementQuantite(item)
        return cartItemContentSettingsDelete
    }
        function supprimerArticle(item) {
            const articleSupprime = cart.findIndex((product) => product.id === item.id && product.color === item.color)
            cart.splice(articleSupprime);
            totalQuantite();
            totalPrix();
            effaceSauvegarde(item);
            effaceArticle(item);
            
        }
    function effaceSauvegarde(item) {
        const idCouleur = `${item.id}-${item.color}`; 
        localStorage.removeItem("idCouleur"); 
        return;
    }
    function effaceArticle(item) {
        const articleSupprime = document.querySelector(
            `article[data-id="${item.id}"][data-color="${item.color}"]`
            )
            articleSupprime.remove();
    }


// Formulaire
    const boutonCommander = document.getElementById("order");
    boutonCommander.addEventListener("click", (e) => recupFormulaire(e));

function recupFormulaire(e) {
    e.preventDefault();
    if (cart.length === 0) {
        alert("Sélectionner article !");
        return 
    }
    if (invalidationFormulaire()) return;
    if (invalidationEmail()) return;

    const demande = faireDemande();
    function invalidationFormulaire() {
        const form = document.querySelector(".cart__order__form");
        const inputs = document.querySelectorAll("input");
        inputs.forEach((input) => {
            if (input.value === "") {
                alert ("Veuillez renseigner tous les champs");
                return true;
            }
                return false;
        })
    }
    function invalidationEmail() {
        const email = document.querySelector("#email").value;
        const verif = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;
                   if (verif.exec(email) === null) {
                    alert("Votre email est incorrect");
                    return true;
                }			
                    return false;
    }
   
        const requete = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(demande),
        };
    fetch("http://localhost:3000/api/products/order", requete)
    
    .then((response) => response.json())
    .then((response2) => {
    // Envoi du orderId sur la page confirmation
        const orderId = response2.orderId;
        window.location.href = "./confirmation.html" + "?orderId=" + orderId;
       
        
    })  
    .catch((error) => console.log(error))  
    }
 

// Création des éléments du formulaire
function faireDemande() {
    const form = document.querySelector(".cart__order__form");
    const firstName = form.elements.firstName.value;
    const lastName = form.elements.lastName.value;
    const address = form.elements.address.value;
    const city = form.elements.city.value;
    const email = form.elements.email.value;
    const demande = {
        contact: {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: email,
        },
        products: articlesAchetes(),
    }
    return demande;
}

function articlesAchetes() {
    const nombreArticles = localStorage.length;
    const articles = [];
    for (let i = 0; i < nombreArticles; i++) {
    const key = localStorage.key(i);
    const article = key.split("-")[0];
    articles.push(article)
    }
    return articles;
}


    
    
        


  

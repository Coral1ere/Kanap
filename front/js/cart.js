const cart = [];
recupObjets();

cart.forEach((item) => afficherObjets(item))

function recupObjets() {
    const nombreObjets = localStorage.length
    for (let i = 0; i < nombreObjets; i++) {
        // Récupération dans le localStorage
        const item = localStorage.getItem(localStorage.key(i))
        const itemObjets = JSON.parse(item) // passer le string en objet
        cart.push (itemObjets) // permet d'ajouter les objets au tableau   
    }
}
    // Création des différents éléments
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
        cartItemContent.appendChild(cartItemContentDescription);
        return cartItemContent
    }

    function faireArticles(item) {
        const article = document.createElement("article");
        afficherArticles(article);
        article.classList.add("cart__item");
        // dataset pour récupérer les données data de l'Id et couleur
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
        // reduce transforme le tableau en une seule valeur
        const total = cart.reduce((total, item) => total + item.quantity, 0)
        totalQuantity.textContent = total;
        return totalQuantity   
    }  
 
    function totalPrix() { 
        const totalPrice = document.getElementById("totalPrice");
        const total = cart.reduce((total, item) => total + item.quantity * item.price, 0)
        totalPrice.textContent = total;
        return totalPrice
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
    // Creation de l'input et ajout des attributs
    function faireInput(item) {
        const input = document.createElement("input");
        input.classList.add("itemQuantity");
        input.type = "number";
        input.name = "itemQuantity";
        input.value = item.quantity;
        input.min = "1";
        input.max = "100";
        // Ecoute des changements de quantités
        input.addEventListener("change" , () => majQuantitePrix(item.id, input.value, item));
        return input;
    }
   
    // Mise à jour nouvelles quantités, prix
    function majQuantitePrix(id, nouvelleValeur, item) {
    /*On cherche dans le cart s'il y a un produit dont 
    l'id est égal à l'id du produit qui a été ajouté. */
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
        // Ecoute le click sur l'option supprimer
        cartItemContentSettingsDelete.addEventListener("click", () => supprimerArticle(item))
        
        const deleteItems = document.createElement("p");
        deleteItems.classList.add("deleteItem");
        deleteItems.textContent = "Supprimer";
        cartItemContentSettingsDelete.appendChild(deleteItems);
       
        totalQuantite()
        totalPrix()
        changementQuantite(item)
        return cartItemContentSettingsDelete
    }
    function supprimerArticle(item) {
        // findIndex renvoie le premier indice du cart si conditions respectées
        const articleSupprime = cart.findIndex((product) => product.id === item.id && product.color === item.color)
        // splice retire l'élément supprimé du cart
        cart.splice(articleSupprime, 1);
        totalQuantite();
        totalPrix();
        effaceSauvegarde(item);
        effaceArticle(item);
    }

    function effaceSauvegarde(item) {
        // Pour différencier les couleurs d'un même article
        const idCouleur = `${item.id}-${item.color}`; 
        // removeItem supprime l'article du localStorage
        localStorage.removeItem(idCouleur); 
    }
    // Supprime l'article du panier
    function effaceArticle(item) {
        const articleSupprime = document.querySelector(
            `article[data-id="${item.id}"][data-color="${item.color}"]`
            )
            articleSupprime.remove();
    }


// Formulaire
    const boutonCommander = document.getElementById("order");
    // Ecoute du click sur le bouton commander !
    boutonCommander.addEventListener("click", (e) => recupFormulaire(e));
    
function recupFormulaire(e) {
    // preventDefault pour empecher le chargement de la page si...
    e.preventDefault();
    if (cart.length === 0) {
        alert("Sélectionner article !");
        return 
    }
   
    for (let i = 0; i < cart.length; i++) {
        const id = cart[i].id;
        const verifPrix = cart[i].price; 
        fetch(`http://localhost:3000/api/products/${id}`)
        .then(response => response.json())
        .then(x => verifierPrix(x.price))

        function verifierPrix (prixCatalogue) {
            console.log("catalogue:" + prixCatalogue + " prix: " + verifPrix)        
            if (verifPrix != prixCatalogue) {  
                alert("Le prix est faux. Votre panier n'est pas validé")    
                return true;
            }
        }
    }

    // Pour ne pas recharger la page
    if (invalidationFormulaire()) return;
    if (invalidationEmail()) return;
    if (invalidationPrenom()) return;
    if (invalidationNom()) return;
    if (invalidationAdresse()) return;
    if (invalidationVille()) return;

    const demande = faireDemande();
    function invalidationFormulaire() {
        const form = document.querySelector(".cart__order__form");
        const inputs = document.querySelectorAll("input");
        // Boucle si un champ du formulaire est vide, alert
        inputs.forEach((input) => {
            if (input.value === "") {
                alert ("Veuillez renseigner tous les champs");
                return true;
            }
                return false;
        })
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
    /* split divise le string en tableau pour pouvoir
    retirer la couleur qui suit l'id */
    const article = key.split("-")[0];
    // Ajoute les articles
    articles.push(article)
    }
    return articles;
}

    // Utilisation des regex pour les différents champs
    function invalidationPrenom() {
        const prenom = document.querySelector("#firstName").value;
        const verif = /^(?:[^\d\W][\-\s\']{0,1}){2,20}$/i;
            if(verif.exec(prenom) === null) {
                const alert = document.querySelector("#firstNameErrorMsg");
                alert.textContent = "Votre prénom est incorrect";
                alert.style.backgroundColor = "red";
                return true;
            }
                return false;
    }
    function invalidationNom() {
        const nom = document.querySelector("#lastName").value;
        const verif = /^[a-zA-Z ]+$/;
            if (verif.exec(nom) === null) {
                const alert = document.querySelector("#lastNameErrorMsg");
                alert.textContent = "Votre nom est incorrect";
                alert.style.backgroundColor = "red";
                return true;
            }
                return false;
    } 
    function invalidationAdresse() {
        const adresse = document.querySelector("#address").value;
        const verif = /^([1-9][0-9]*(?:-[1-9][0-9]*)*)[\s,-]+(?:(bis|ter|qua)[\s,-]+)?([\w]+[\-\w]*)[\s,]+([-\w].+)$/gmiu;   
        if (verif.exec(adresse) === null) {
                const alert = document.querySelector("#addressErrorMsg")
                alert.textContent = "Votre adresse est incorrecte";
                alert.style.backgroundColor = "red";
                return true;
            }
            return false
    } 
    function invalidationVille() {
        const ville = document.querySelector("#city").value;
        const verif = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
            if (verif.exec(ville) === null) {
                const alert = document.querySelector("#cityErrorMsg")
                alert.textContent = "Votre ville est incorrecte";
                alert.style.backgroundColor = "red";
                return true;
            }
                return false;
    }         
    function invalidationEmail() {
        const email = document.querySelector("#email").value;
        const verif = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;
                if (verif.exec(email) === null) {
                    const alert = document.querySelector("#emailErrorMsg");
                alert.textContent = "Votre email est incorrect";
                alert.style.backgroundColor = "red";
                return true;
                }			
                return false;
    }  
        // Transmission des informations utilisateur au serveur avec la méthode post
        const requete = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // stringify transforme un objet en string(JSON)
            body: JSON.stringify(demande),
        };
        // Envoi de la requete
    fetch("http://localhost:3000/api/products/order", requete)
    
    .then((response) => response.json())
    .then((response2) => {
        const orderId = response2.orderId;
        // Envoi du orderId sur la page confirmation
        window.location.href = "./confirmation.html" + "?orderId=" + orderId;
        console.log("confirmation success");       
    })  
    // Pour être averti des erreurs
    .catch((error) => console.log(error))  
    // Pour vider le localStorage
    localStorage.clear();
}  
 


    
    
        


  

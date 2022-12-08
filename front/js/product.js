const lienProduit = window.location.search
const parametres = new URLSearchParams(lienProduit)
const idProduit = parametres.get("id")
if (idProduit != null) {
    let refPrix = 0
    let imagesUrl, altTexte
    let titre
}


fetch(`http://localhost:3000/api/products/${idProduit}`)
.then(response => response.json())
.then(response2 => pageProduit(response2))


function pageProduit(canapes) {

    const {altTxt, colors, description, imageUrl, name, price} = canapes
    titre = name
    imagesUrl = imageUrl
    altTexte = altTxt
    refPrix = price
    noms(name)
    tarif(price)
    descriptif(description)
    couleurs(colors)
    faireImage(imageUrl, altTxt)
}

function faireImage(imageUrl, altTxt) {

    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt

    const item = document.querySelector(".item__img")
        if (item) {
            item.appendChild(image)  
        }  
        return image
}

function noms(name) {
    const nom = document.getElementById("title");
    nom.textContent = name;
    nom.classList.add("title");
    return nom
}
function tarif(price) {
    const prix = document.getElementById("price");
    prix.textContent = price;
    prix.classList.add("price");
    return prix
}
function descriptif(description) {
    const desc = document.getElementById("description")
    desc.textContent = description
    desc.classList.add("description")
    return desc
}
function couleurs(colors) {
    const couleur = document.getElementById("colors")
    if (couleur != 0) {
        colors.forEach((color) => {
            const option = document.createElement("option")
            option.value = color
            option.text = color 
            couleur.appendChild(option)
            return option
        
        });
        return colors
    }   
}


const bouton = document.getElementById("addToCart")
    if (bouton != 0) {
        bouton.addEventListener("click", (e) => {

        const couleur = document.getElementById("colors").value 
        const quantite = document.getElementById("quantity").value 
    
   if (couleur === 0 || couleur === ""  || quantite === 0) {
        return alert("manque quantité et couleur")    
    } 
    produitsSauvegardes(couleur, quantite)  

})
}
function produitsSauvegardes(couleur,quantite) {
    const existe = localStorage.getItem(`${idProduit}-${couleur}`)

        if(existe){
            quantite = Number(quantite) + Number(JSON.parse(existe).quantity)    
        } 
    // Pour différencier la couleur de l'Id
    const idCouleur = `${idProduit}-${couleur}`
    // Tout ce qu'on sauvegarde
    const panier = {
        id: idProduit,
        color: couleur,
        quantity: Number (quantite), 
        price: refPrix,
        imageUrl: imagesUrl,
        altTxt: altTexte,
        name: titre,
    }    
    // Pour enregistrer ce qui est dans le panier
    localStorage.setItem(idCouleur, JSON.stringify(panier))
    alert("produit ajouté");
    document.location.reload() 

}









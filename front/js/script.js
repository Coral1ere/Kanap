fetch("http://localhost:3000/api/products")
.then(response => response.json())
.then((response2) => recuperations(response2))

function recuperations(donnees) { 
    donnees.forEach((canape) => {   
   
    const {_id, imageUrl, altTxt, name, description} = canape
    const h3 = faireH3(name)
    const image = faireImage(imageUrl, altTxt)
    const ancre = faireAncre(_id) 
    const article = document.createElement("article")
    const p = faireParagraphe(description)
    article.appendChild(image)
    article.appendChild(h3)
    article.appendChild(p)
    ajout(ancre, article)
    
}); 
}

function faireAncre(_id)  { 

 const ancre = document.createElement("a")
 ancre.href = "./product.html?id=" + _id  
 return ancre
}

function ajout(ancre, article){

    const items = document.getElementById("items")
     {
        if (items) {
        items.appendChild(ancre)
        ancre.appendChild(article)
        console.log(items)
        }
    }
}

function faireImage (imageUrl, altTxt) {

    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    return image
} 

function faireH3 (name) {

    const h3 = document.createElement("h3")
    h3.textContent = name
    h3.classList.add("productName")
    return h3
}

function faireParagraphe (description) {

    const p = document.createElement("p")
    p.textContent = description
    p.classList.add("productDescription")
    return p
}
/*altTxt
: 
"Photo d'un canapé bleu, deux places"
colors
: 
(3) ['Blue', 'White', 'Black']
description
: 
"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
imageUrl
: 
"http://localhost:3000/images/kanap01.jpeg"
name
: 
"Kanap Sinopé"
price
: 
1849
_id
: 
"107fb5b75607497b96722bda5b504926"*/

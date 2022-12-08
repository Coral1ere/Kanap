const lienProduit = window.location.search
const parametres = new URLSearchParams(lienProduit)
const orderId = parametres.get("orderId")
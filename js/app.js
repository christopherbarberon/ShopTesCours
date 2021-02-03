// Management of the add to cart button
function addToCartButtons() {
    var addToCartButtons = document.getElementsByClassName('add-to-cart');
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', event => {
            let panier = getLocalStorage();
            let id = event.target.getAttribute('data-id');
            panier.push(id);
            localStorage.setItem('panier', JSON.stringify(panier));
            addToCartClicked(event);
            console.log(panier);
            Mymsg(COURSES[id].title + " a été ajouté au panier !", 3000);
        }) 
    }
}

addToCartButtons();

// Retrieving the information of the articles selected thanks to the button "add to cart"
//Param String
function addToCartClicked(event) {
    var button = event.target;
    var dataId = button.getAttribute('data-id');
    var shopItem = button.parentNode;
    var title = shopItem.getElementsByTagName('h4')[0].innerText;
    var price = shopItem.getElementsByClassName('discount')[0].innerText;
    var getImg = shopItem.parentNode;
    var img = getImg.getElementsByTagName('img')[0];
    var src = img.getAttribute('src');
    addItemToCart(src, title, price);

}

// Add items to cart 
// Param Src , String, String
function addItemToCart(img, title, price) {
    var cartTableBody = document.getElementsByTagName('tbody')[0];
    var newTr = cartTableBody.insertRow(-1);
    var newTdImg = newTr.insertCell(0);
    var newSrc = document.createElement('img');
    newSrc.src = img;
    newTdImg.appendChild(newSrc);
    var newTdTitle = newTr.insertCell(-1);
    newTdTitle.innerHTML = title;
    var newTdPrice = newTr.insertCell(-1);
    newTdPrice.innerHTML = price;
    var newTdQuantity = newTr.insertCell(-1);
    newTdQuantity.innerHTML = "1";
}

// Backup of the cart thanks to localStorage
function getLocalStorage() {
    let panier = localStorage.getItem('panier');
    if(panier == null) return [];
    else return JSON.parse(panier);
}

// Allows you to empty the cart and the localStorage
function clearCart() {
    let buttonclearCart = document.getElementById('empty-cart');
    let cartTableBody = document.getElementById('cart-table');
    buttonclearCart.addEventListener('click', event => {
        localStorage.clear();
        var tbody = cartTableBody.childNodes[3];
        tbody.innerHTML = "";
        Mymsg("Vous avez supprimé tous les articles de votre panier ! ", 3000);
    }) 
    
}

clearCart();

// Display the localStorage information in the shopping cart after refreshing the page
function retrieveCart() {
    var panier = getLocalStorage();
    for (var i = 0; i < panier.length; i++) {
        var src = "../img/courses/" + COURSES[panier[i]].img;
        addItemToCart(src, COURSES[panier[i]].title, COURSES[panier[i]].price);
    }
}

retrieveCart();

function Mymsg(msg,duration) {
    var alt = document.createElement("div");
    alt.setAttribute("style","position:absolute;top:5%;left:80%;border:1px solid rgba(0,0,0,0.25);padding:1% 5% 1% 5%;box-shadow:0 14px 28px rgba(0,0,0,0.25),0 10px 10px rgba(0,0,0,0.22);margin-right:1%");
    alt.innerHTML = msg;
    setTimeout(function(){ alt.parentNode.removeChild(alt);},duration);
    document.body.appendChild(alt);
}
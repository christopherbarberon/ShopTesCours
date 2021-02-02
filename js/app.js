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
        }) 
    }
}

addToCartButtons();

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
    //window.alert('Votre produit a été ajouté avec succès');
}

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

function getLocalStorage() {
    let panier = localStorage.getItem('panier');
    if(panier == null) return [];
    else return JSON.parse(panier);
}

function clearCart() {
    let buttonclearCart = document.getElementById('empty-cart');
    let cartTableBody = document.getElementById('cart-table');
    buttonclearCart.addEventListener('click', event => {
        localStorage.clear();
        var tbody = cartTableBody.childNodes[3];
        tbody.innerHTML = "";
    }) 
}

clearCart();
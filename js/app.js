function addToCartButtons() {
    var addToCartButtons = document.getElementsByClassName('add-to-cart');
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', event => {
            console.log("id : " + event.target.getAttribute('data-id'));
            addToCartClicked(event);
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
    alert('Votre produit a été ajouté avec succès');
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
<<<<<<< Updated upstream
=======
}

function quantityInputs() {
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', function quantityChanged(event) {
            var input = event.target
            if (isNaN(input.value) || input.value <= 0) {
                input.value = 1
            }
        })
    }
>>>>>>> Stashed changes
}
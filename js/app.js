
function addToCartButtons() {
    var addToCartButtons = document.getElementsByClassName('add-to-cart');
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener('click', event => {
            console.log("id : " + event.target.getAttribute('data-id'));
            console.log("click");
            addToCartClicked(event)
            //addItemToCart(event);
        })
    }
}

addToCartButtons();


function addToCartClicked(event) {
    var button = event.target;
    var dataId = button.getAttribute('data-id');
    var shopItem = button.parentNode;
    var title = shopItem.getElementsByTagName('h4')[0].innerText;
    console.log(title);
    var price = shopItem.getElementsByClassName('discount')[0].innerText;
    console.log(price);
    addItemToCart(title, price);
}


function addItemToCart(title, price) {
    var cartTableBody = getElementsByTagName('tbody');
    console.log(cartTableBody);
    var newTr = createElement('tr');
    cartTableBody.appendChild(newTr);

    var newTdTitle = createElement('td');
    newTdTitle.innerHTML = title;
    newTdTitle = newTr.insertCell(0);

    var newTdPrice = createElement('td');
    newTdPrice.innerHTML = price;
    newTdPrice = newTr.insertCell(-1);
}
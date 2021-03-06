// Management of the add to cart button : recovery of the localStorage + notification message 
function addToCartButtons() {
    var addToCartButtons = document.getElementsByClassName('add-to-cart');
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        var px = 0;
        button.addEventListener('click', event => {
            let id = event.target.getAttribute('data-id');
            addToCartClicked(event);

            if (px <= 60) {
                if (px == 0) {
                    Mymsg(COURSES[id].title + " a été ajouté au panier !", 3000, px);
                } else {
                    Mymsg(COURSES[id].title + " a été ajouté au panier !", 3000, px);
                }
                px = px +15;
            } else {
                px = 0;
                Mymsg(COURSES[id].title + " a été ajouté au panier !", 3000, px);
                px = px + 15;
            }
        }) 
    }
}

// Retrieving the information of the articles selected thanks to the button "add to cart"
// Param event(object) : corresponds to the event produced at the time of the click
function addToCartClicked(event) {
    var button = event.target;
    var dataId = button.getAttribute('data-id');
    var shopItem = button.parentNode;
    var title = shopItem.getElementsByTagName('h4')[0].innerText;
    var price = shopItem.getElementsByClassName('discount')[0].innerText;
    var getImg = shopItem.parentNode;
    var img = getImg.getElementsByTagName('img')[0];
    var src = img.getAttribute('src');
    let panier = getLocalStorage();
    panier.push({
        id: dataId,
        title: title,
        price: price,
        src: src,
        stock: 1
    });
    localStorage.setItem('panier', JSON.stringify(panier));
    addItemToCart(src, title, price, dataId);
}
    
// Add items to cart 
// Param img (Src) : corresponds to the image of the course
// Param title(String) : corresponds to the title of the course
// Param price(String) : corresponds to the price of the course
function addItemToCart(img, title, price, dataId) {
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
    var newBtnDelete = newTr.insertCell(-1);
    var del = document.createElement('button');
    del.setAttribute('style', 'background-color:#E74C3C; color:white;');
    del.setAttribute('class', 'btnDelete');
    del.setAttribute('data-id', dataId);
    del.innerHTML = 'Supprimer';
    newBtnDelete.appendChild(del);
    removeCartItemButtons();
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
    let px = 0;
    buttonclearCart.addEventListener('click', event => {
        localStorage.clear();
        var tbody = cartTableBody.childNodes[3];
        tbody.innerHTML = "";
        Mymsg("Vous avez supprimé tous les articles de votre panier ! ", 3000, px);
    }) 
}

// Display the localStorage information in the shopping cart after refreshing the page
function retrieveCart() {
    var panier = getLocalStorage();
    for (var i = 0; i < panier.length; i++) {
        addItemToCart(panier[i].src, panier[i].title, panier[i].price, panier[i].id);
    }
}

// Delete button event management 
function removeCartItemButtons() {
    var removeCartItemButtons = document.getElementsByClassName('btnDelete');
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i];
        button.addEventListener('click', event => {
            removeCartItem(event);
        });
    }
}
    
// Deletion of a course from the cart and localStorage
// Param event(object) : corresponds to the event produced at the time of the click
function removeCartItem(event) {
    var buttonClicked = event.target;
    var panier = getLocalStorage();
    for (let i = 0; i < panier.length; i++) {
        if (panier[i].id === buttonClicked.getAttribute('data-id')) {
            panier.splice(i, 1);
            break;
        }
    }
    localStorage.setItem("panier", JSON.stringify(panier));
    buttonClicked.parentElement.parentElement.remove();
}

// Display a notification when an item is added to the cart
// Param msg(String) : corresponds to the message of the notification
// Param duration(int) : corresponds to the duration of the notification
// Param px(int) : corresponds to the position of the notification, starting from the top
function Mymsg(msg,duration, px) {
    var alt = document.createElement("div");
    alt.setAttribute("style","position:absolute;top:"+px+"%;left:80%;border:1px solid rgba(0,0,0,0.25);padding:1% 5% 1% 5%;box-shadow:0 14px 28px rgba(0,0,0,0.25),0 10px 10px rgba(0,0,0,0.22);margin-right:1%;margin-top:1%");
    alt.innerHTML = msg;
    setTimeout(function(){ alt.parentNode.removeChild(alt);},duration);
    document.body.appendChild(alt);
}

// Addition of the order button
function addOrderButton() {
    var cart = document.getElementById('cart');
    var emptyCart = document.getElementById('empty-cart');
    var buttonOrder = document.createElement('a');
    buttonOrder.setAttribute('href', 'commande.html');
    buttonOrder.setAttribute('class', 'button u-full-width');
    buttonOrder.setAttribute('id', 'buttonOrder');
    buttonOrder.innerHTML = 'Commander';
    cart.insertBefore(buttonOrder, emptyCart);
}

// Creation of the DOM dynamically
function createCourseItem() {
    var coursesContainer = document.getElementsByClassName('courses__container')[0];

    for (var i = 1; i < Object.keys(COURSES).length+1; i++) {
        var newDivCourseItem = document.createElement('div');
        newDivCourseItem.setAttribute('class', 'course__item');
        coursesContainer.appendChild(newDivCourseItem);

        var newFigureCours = document.createElement('figure');
        newFigureCours.setAttribute('class', 'course_img');
        newDivCourseItem.appendChild(newFigureCours);

        var newImgCours = document.createElement('img');
        newImgCours.setAttribute('src', 'img/courses/' + COURSES[i].img);
        newFigureCours.appendChild(newImgCours);

        var newDivInfoCard = document.createElement('div');
        newDivInfoCard.setAttribute('class', 'info__card');
        newDivCourseItem.appendChild(newDivInfoCard);

        var newTitle = document.createElement('h4');
        newTitle.innerHTML = COURSES[i].title;
        newDivInfoCard.appendChild(newTitle);

        var newFigureMark = document.createElement('figure');
        newFigureMark.setAttribute('class', 'mark m_' + COURSES[i].mark);
        newDivInfoCard.appendChild(newFigureMark);

        var newImgRates = document.createElement('img');
        newImgRates.setAttribute('src', 'img/rates.png');
        newFigureMark.appendChild(newImgRates);

        var newPPrice = document.createElement('p');
        newDivInfoCard.appendChild(newPPrice);
        
        var newSpanPrice = document.createElement('span');
        newSpanPrice.setAttribute('class', 'price');
        newSpanPrice.innerHTML = COURSES[i].initial_price;
        newPPrice.appendChild(newSpanPrice);

        var newSpanDiscount = document.createElement('span');
        newSpanDiscount.setAttribute('class', 'discount');
        newSpanDiscount.innerHTML = COURSES[i].price;
        newPPrice.appendChild(newSpanDiscount);

        var newPQuantity = document.createElement('p');
        newDivInfoCard.appendChild(newPQuantity);

        var newSpanQuantity = document.createElement('span');
        newSpanQuantity.setAttribute('class', 'stock');
        newSpanQuantity.innerHTML = 'Disponible: ' + COURSES[i].stock;
        newPQuantity.appendChild(newSpanQuantity);
        
        newAAddToCart = document.createElement('a');
        newAAddToCart.setAttribute('href', '#');
        newAAddToCart.setAttribute('class', 'add-to-cart');
        newAAddToCart.setAttribute('data-id', COURSES[i].id);
        newAAddToCart.innerHTML = 'Ajouter au panier ';

        newIFa = document.createElement('i');
        newIFa.setAttribute('class', 'fa fa-cart-plus');

        newAAddToCart.appendChild(newIFa);
        newDivInfoCard.appendChild(newAAddToCart);
    }
}

clearCart();
retrieveCart();
addOrderButton();
createCourseItem();
addToCartButtons();
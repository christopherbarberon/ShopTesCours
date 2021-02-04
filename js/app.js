// Management of the add to cart button : recovery of the localStorage + notification message 
function addToCartButtons() {
    var addToCartButtons = document.getElementsByClassName('add-to-cart');
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        var px = 0;
        button.addEventListener('click', event => {
            let panier = getLocalStorage();
            let id = event.target.getAttribute('data-id');
            panier.push(id);
            localStorage.setItem('panier', JSON.stringify(panier));
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
    addItemToCart(src, title, price);

}

// Add items to cart 
// Param img (Src) : corresponds to the image of the course
// Param title(String) : corresponds to the title of the course
// Param price(String) : corresponds to the price of the course
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
    let px = 0;
    buttonclearCart.addEventListener('click', event => {
        localStorage.clear();
        var tbody = cartTableBody.childNodes[3];
        tbody.innerHTML = "";
        Mymsg("Vous avez supprimé tous les articles de votre panier ! ", 3000, px);
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

function addOrderButton() {
    var cart = document.getElementById('cart');
    var buttonOrder = document.createElement('a');
    buttonOrder.setAttribute('href', 'commande.html');
    buttonOrder.setAttribute('class', 'button u-full-width');
    buttonOrder.setAttribute('id', 'buttonOrder');
    buttonOrder.innerHTML = 'Commander';
    cart.appendChild(buttonOrder);

/*
    var panier = getLocalStorage();
    var buttonOrder = getElementById('buttonOrder');
    if (panier.length == 0) {
        console.log('DANS LE IF ' + panier.length);
        buttonOrder.setAttribute('href', 'javascript: void(0)');
    } else {
        console.log('DANS LE ELSE ' + panier.length);
        buttonOrder.setAttribute('href', 'commande.html');
    }
*/
}

addOrderButton();

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

createCourseItem();

addToCartButtons();

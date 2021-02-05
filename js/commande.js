// Allows css display
function cssForm() {
    var blocContact = document.getElementById('blocOrder');
    blocContact.setAttribute('style', "display:flex;justify-content:center;align-items:center;");
    var formContact = document.getElementById('formOrder');
    formContact.setAttribute('style', "padding: 20px;border: 1px solid #ccc;border-radius: 5px;width:400px;");
    var submit = document.getElementById('submit');
    submit.setAttribute('style', "width: 100%; margin-top:4%");
    var caseName = document.getElementById('name');
    caseName.setAttribute('style', "background-color: #f8f9fa;width: 100%;");
    var caseAdresse = document.getElementById('adresse');
    caseAdresse.setAttribute('style', "background-color: #f8f9fa;width: 100%;");
    var option1 = document.getElementById('option1');
    option1.setAttribute('style', "display:flex;");
    var option2 = document.getElementById('option2');
    option2.setAttribute('style', "display:flex;");
    var abonnement = document.getElementById('abonnement');
    abonnement.setAttribute('style', "margin-right:2%");
    var noAbonnement = document.getElementById('noAbonnement');
    noAbonnement.setAttribute('style', "margin-right:2%;");
}

cssForm();

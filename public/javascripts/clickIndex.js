/**
 * Created by Phil on 2015-04-03.
 */

function recupererMDP(){
    document.body.innerHTML +='<div id="dInsert" onclick="clickClose()"></div>';
    document.body.innerHTML +='<div id="dGetIndex" style="width:400px;text-align: justify;"><button id="bGlossaire" onclick="clickClose()" style="float: right;">Fermer</button><br>' +
    "<h3>Récupération des informations</h3>"+
        "Si vous avez oublié le nom d'utilisateur ou le mot de passe de votre compte, veuillez entrer dans le champ ci-dessous " +
        "l'adresse courriel utilisée lors de l'inscription."+
        " Une copie de votre nom d'utilisateur et de votre mot de passe sera envoyée à l'adresse entrée."+
        "<br><label>Adresse courriel : </label><input id='iText' type='text' name='emailRec' placeholder='Courriel'>"+
        "<br><div style='text-align: center;'><button id='button' onclick='envoyer()'>Envoyer</button></div>"
    "</div>";
}

function envoyer(){

    var emailRec = document.getElementsByName('emailRec')[0].value;

    var requete = '{"email":"'+ emailRec +'"}';

    $.ajax({
        url: "/recuperationMDP",
        type: "POST",
        dataType: 'html',
        contentType: 'application/json; charset=UTF-8',
        data: requete,
        success: function (resp) {
            //console.log(resp);
            document.getElementById('dGetIndex').innerHTML = resp;
        }
    });
}

function inscription(){
    document.getElementById('lNom').classList.add('lTextIns');
    document.getElementById('lNom').classList.remove('lTextInsOK');
    document.getElementById('lPass').classList.add('lTextIns');
    document.getElementById('lPass').classList.remove('lTextInsOK');
    document.getElementById('lPassCon').classList.add('lTextIns');
    document.getElementById('lPassCon').classList.remove('lTextInsOK');
    document.getElementById('lEmail').classList.add('lTextIns');
    document.getElementById('lEmail').classList.remove('lTextInsOK');
    var indice = document.getElementsByName('index')[0].value;
    var requete = '{"user":"'+
        document.getElementsByName('userInsc')[0].value
        +'","password":"'+
        document.getElementsByName('passwordInsc')[0].value
        +'","email":"'+
        document.getElementsByName('emailInsc')[0].value
        +'","index":"'+ indice +'"}';

    $.ajax({
        url: "/inscriptionUtilisateur",
        type: "POST",
        dataType: 'html',
        contentType: 'application/json; charset=UTF-8',
        data: requete,
        success: function (resp) {
            //console.log(resp);
            document.body.innerHTML +='<div id="dInsert" onclick="clickClose()"></div>';
            document.body.innerHTML +='<div id="dGetIndex" style="width:400px;text-align: justify;"><button id="bGlossaire" onclick="clickClose()" style="float: right;">Fermer</button><br>' +
            resp+
            "</div>";
        }
    });
}

function afficheNotice(){
    document.body.innerHTML +='<div id="dInsert" onclick="clickClose()"></div>';
    document.body.innerHTML +='<div id="dGetIndex" style="width:900px;"><button id="bGlossaire" onclick="clickClose()" style="float: right;">Fermer</button><br>' +
    "<h3>NOTES IMPORTANTES</h3>Ce logiciel peut être utilisé sur tout appareil (téléphone, tablette ou ordinateur) muni d’un "+
    "navigateur."+
    "<h3>Navigateurs</h3>"+
    "Pour optimiser l'utilisation de ce logiciel, nous vous recommandons d'utiliser les navigateurs Firefox 19.0 ou "+
    "Google Chrome 28.0.1500."+
    "<br>"+
    "Cependant, il est possible de faire fonctionner ce logiciel avec des versions antérieures ou d'autres "+
    "navigateurs comme Internet Explorer ou Safari, mais avec le risque d'obtenir un mauvais affichage à "+
    "l'écran. Veuillez procéder à une vérification avant de l'utiliser."+
    "<h3>Projection</h3>"+
    "Ce logiciel a été conçu pour être utilisé avec un projecteur pour grand écran ou un tableau "+
    "numérique interactif (TNI)."+
    "<br>"+
    "Il est donc important de régler la définition de votre écran au moment de le brancher à un "+
    "projecteur de façon à obtenir une projection sur grand écran pleine grandeur, c'est-à-dire "+
    "fidèle aux proportions que vous obtenez sur votre écran d'ordinateur." +
    "<h3>Soutien du C.I.EAU</h3>"+
    "Vous éprouvez des difficultés dans l'utilisation de ce logiciel?"+
    "<br>"+
    "Vous pouvez consulter les rubriques AIDE en cliquant sur le bouton «?» "+
    "situé dans le haut de chaque page."+
    "<br>"+
    "Vous pouvez également obtenir le soutien du C.I.EAU au 450 963-6463 ou à " +
    "<a href='mailto:info@cieau.qc.ca' target='_top'>info@cieau.qc.ca</a>"+
    "."+
    "<h3>Au sujet de la nouvelle orthographe</h3>"+
    "La trousse a été entièrement rédigée selon les nouvelles règles d'écriture du français (orthographe rectifiée)."+
    "<br>"+
    "Cependant, comme ce logiciel s'adresse à un plus large public ainsi qu'à des présentateurs provenant " +
    "de l'extérieur du milieu scolaire, nous avons préféré maintenir l'ancienne orthographe pour rédiger tous les textes."+
    "</div>";
}

function clickClose(){
    $("#dGetIndex").remove();
    $("#dInsert").remove();
}
/**
 * Created by France on 2015-02-02.
 */
function afficheAvis(){
    document.body.innerHTML +='<div id="dInsert" onclick="clickClose()"></div>';
    document.body.innerHTML +='<div id="dGet"><button id="bGlossaire" onclick="clickClose()" style="float: right;">Fermer</button>' +
    '<h2>Avis</h2><p id="divIntroCopyright">Toutes les stations de production d’eau potable du Québec sont différentes. '+
    'Les procédés expliqués dans la présente présentation '+
    'peuvent différer de ceux que l’on trouve à la station de votre '+
    'municipalité; nous préférons vous en aviser.</p>'+
    '<p id="divIntroCopyright"> Les illustrations, photos et vidéos utilisés dans ce logiciel ont été choisies pour leur valeur pédagogique; '+
    'nous remercions leurs auteurs. Toutefois, ceux qui préféreraient que leur œuvre ne soit pas utilisée '+
    'à cette fin ou qui aimeraient en proposer d’autres peuvent en faire la requête à '+
    '<a href="mailto:info@cieau.qc.ca">info@cieau.qc.ca</a></p></div>';
}

function clickClose(){
    $("#dGet").remove();
    $("#dInsert").remove();
}
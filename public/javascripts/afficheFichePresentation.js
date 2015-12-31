/**
 * Created by Phil on 2015-01-04.
 */
var zoom = 1;
var myDiv;
var scrollLeft = 0;

function imageClick(){
    myDiv = document.getElementById('divNavProc');
    scrollLeft = myDiv.scrollLeft;
    document.body.innerHTML +='<div id="dInsert" onclick="clickClose()"></div>';
    document.body.innerHTML +='<div id="dGetImage"><button id="bGlossaire" onclick="clickClose()" style="float: right;">Fermer</button></div>';
    $('#divNavProc').scrollLeft(scrollLeft);
    var iconSelect;
    var procede;
    var selected;
    if(document.getElementsByClassName('dIconNavSelect')[0]){
        procede = document.getElementsByClassName('dIconNavSelect')[0].children[0].title
    }else{
        procede = '';
    }
    if(document.title == 'Présentation'){
        selected = document.getElementsByClassName('dIconNavSelect')[0].children[0].id;
    }else{
        selected = document.getElementsByClassName('dFicheNavSelect')[0].children[0].id;
    }
    iconSelect = '{"fiche":{"iconselect":"'+selected+'","procede":"'+
        procede +'"}}';
    //iconSelect = '{"iconselect":"'+document.getElementsByClassName('dIconRevisionSelect')[0].childNodes[0].id+'"}';
    //console.log(iconSelect);
    $.ajax({
        url: "/imageList",
        type: "POST",
        dataType: 'html',
        contentType: 'application/json; charset=UTF-8',
        data: iconSelect,
        success: function (resp) {
            document.getElementById('dGetImage').innerHTML += resp;
        },
        error: function(resp) {
            alert("error occurred.");
        }
    });
}


function mouseClickEvent(clickEvent){
    //alert(document.getElementsByClassName);
    var arrayItemSelect = document.getElementsByClassName('dIconNavSelect');
    var nbItemSelect = arrayItemSelect.length;
    if(clickEvent.target.parentNode.classList.toString() === 'dIconNav') {

        if(nbItemSelect > 0){
            for(i = 0; i < nbItemSelect; i++){
                arrayItemSelect[i].classList.add('dIconNav');
                arrayItemSelect[i].classList.remove('dIconNavSelect');
            }
        }
        clickEvent.target.parentNode.classList.add('dIconNavSelect');
        clickEvent.target.parentNode.classList.remove('dIconNav');
        afficheFicheAjax(clickEvent);
    }
}

function mouseClickEventDosage(clickEvent){
    //alert(document.getElementsByClassName);
    var arrayItemSelect = document.getElementsByClassName('dFicheNavSelect');
    var nbItemSelect = arrayItemSelect.length;
    if(clickEvent.target.parentNode.classList.toString() === 'dFicheNav') {

        if(nbItemSelect > 0){
            for(i = 0; i < nbItemSelect; i++){
                arrayItemSelect[i].classList.add('dFicheNav');
                arrayItemSelect[i].classList.remove('dFicheNavSelect');
            }
        }
        clickEvent.target.parentNode.classList.add('dFicheNavSelect');
        clickEvent.target.parentNode.classList.remove('dFicheNav');
        afficheFicheAjax(clickEvent);
    }
}

function afficheFicheAjax(clickEvent){
    myDiv = document.getElementById('divNavProc');
    scrollLeft = myDiv.scrollLeft;
    /*if(clickEvent.target.id == 'fin'){
        document.cookie = "fiche=debut";
        document.cookie = "position=0";
    }else{*/
    if(document.title == 'Présentation') {
        document.cookie = "fiche=" + clickEvent.target.id;
        document.cookie = "position=" + scrollLeft;
    }
    //}
    getFiche(clickEvent.target.id);
}

function getFiche(ficheID){
    var indice = document.getElementsByName('index')[0].value;
    var nomAffiche = '{"index":"'+ indice +'", "nom":"'+ficheID+'"}';
    $.ajax({
        url: "/getFiche",
        type: "POST",
        dataType: 'html',
        contentType: 'application/json; charset=UTF-8',
        data: nomAffiche,
        success: function (resp) {
            document.getElementById('divProcede').innerHTML = resp;
            unlockMenuButton(nomAffiche);
            ajusteFiche();
            /*if(ficheID == 'fin'){
                enbSuivant(true);
            }else{
                enbSuivant(false);
            }*/
            //console.log(resp);
            //alert("Fiche");
        },
        error: function (resp) {
            console.log(resp);
            //alert("error");
        }
    });
}


function enbSuivant(enb){
    //alert('enbSuivant');
    if (enb) {
        $('.btnSuivant')[0].id = 'buttonPresentation';
        $('.btnSuivant')[0].disabled = false;
    } else {
        $('.btnSuivant')[0].id = 'buttonPresentationDisabled';
        $('.btnSuivant')[0].disabled = true;
    }
}

function unlockMenuButton(nomAffiche){
    $.ajax({
        url: "/getButtonUnlock",
        type: "POST",
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        data: nomAffiche,
        success: function (resp) {
            //document.getElementById('divProcede').innerHTML = resp;
            var respUnlock = JSON.parse(resp);
            //iniZoom();
            unlockButton(respUnlock);
            //alert("Fiche");
        },
        error: function (resp) {
            console.log(resp);
            //alert("error");
        }
    });
}

function unlockButton(respUnlock){
    if(respUnlock.description == 'oui'){
        unlock('iButtonExplication');
    }else{
        lock('iButtonExplication');
    }
    if(respUnlock.photo == 'oui'){
        unlock('iButtonImgProc');
    }else{
        lock('iButtonImgProc');
    }
    if(respUnlock.lien == 'oui'){
        unlock('iButtonVideo');
    }else{
        lock('iButtonVideo');
    }
    if(respUnlock.dosage == 'oui'){
        unlock('iButtonDosage');
    }else{
        lock('iButtonDosage');
    }
}

function iniZoom(){
    var imageObj = document.getElementById('imgFiche');
    if(imageObj) {
        imageObj.style.height = (imageObj.height * zoom)+"px";
    }
}

function zoomPlus(){
    var imageObj = document.getElementById('imgFiche');

    if((imageObj) && (zoom <= 1.8)) {
        zoom = zoom + 0.05;
        imageObj.style.height = (imageObj.height * 1.05)+"px";
    }
}

function zoomMinus(){
    var imageObj = document.getElementById('imgFiche');
    if((imageObj) && (zoom >= 0.2)){
        zoom = zoom - 0.05;
        imageObj.style.height = (imageObj.height * 0.95)+"px";
    }
}

function ajusteFiche(){
    var imageObj = document.getElementById('imgFiche');
    console.log(imageObj);
    //var boutonMenu = document.getElementsByClassName('iBoutonMenuDis');
    if(window.innerHeight < 850){
        var diff = 870 - window.innerHeight;
        /*for(i = 0; i < boutonMenu.length; i++){
            console.log(boutonMenu[i].width);
            boutonMenu[i].style.width = toString(boutonMenu[i].width*ratio);
            boutonMenu[i].style.height = toString(boutonMenu[i].height*ratio);
        }*/
        //imageObj.width = imageObj.width * ratio;
        imageObj.style.height = (634 - diff) + "px";
    }
    else{
        imageObj.style.height = "634px";
    }
}

function unlock(buttonID){
    document.getElementById(buttonID).disabled = false;
    document.getElementById(buttonID).classList.add('iButtonMenu');
    document.getElementById(buttonID).classList.remove('iBoutonMenuDis');
}

function lock(buttonID){
    document.getElementById(buttonID).disabled = true;
    document.getElementById(buttonID).classList.add('iBoutonMenuDis');
    document.getElementById(buttonID).classList.remove('iButtonMenu');
}
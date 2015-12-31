/**
 * Created by Phil on 2014-12-17.
 */
var pageLienMap = '';
var pageVilleMap = '';
var pageLienYoutube = [];
var pageImages = [];
var imageWindow = false;

function mouseClickEvent(clickEvent){
    //alert(document.getElementsByClassName);
    var arrayItemSelect = document.getElementsByClassName('dIconRevisionSelect');
    var nbItemSelect = arrayItemSelect.length;
    if(clickEvent.target.parentNode.classList.toString() === 'dIconRevision') {

        if(nbItemSelect > 0){
            for(i = 0; i < nbItemSelect; i++){
                arrayItemSelect[i].classList.add('dIconRevision');
                arrayItemSelect[i].classList.remove('dIconRevisionSelect');
            }
        }
        clickEvent.target.parentNode.classList.add('dIconRevisionSelect');
        clickEvent.target.parentNode.classList.remove('dIconRevision');
        document.getElementById('buttonLeft').disabled = false;
        document.getElementById('buttonRight').disabled = false;
        //document.getElementById('iButtonVideo').disabled = false;
        //document.getElementById('iButtonVideo').classList.add('iButtonMenu');
        //document.getElementById('iButtonVideo').classList.remove('iBoutonMenuDis');
    }else{
        clickEvent.target.parentNode.classList.add('dIconRevision');
        clickEvent.target.parentNode.classList.remove('dIconRevisionSelect');
        document.getElementById('buttonLeft').disabled = true;
        document.getElementById('buttonRight').disabled = true;
        //document.getElementById('iButtonVideo').disabled = true;
        //document.getElementById('iButtonVideo').classList.add('iBoutonMenuDis');
        //document.getElementById('iButtonVideo').classList.remove('iButtonMenu');
    }
}

function deplaceGauche(clickEvent){
    var arrayItemSelect = document.getElementsByClassName('dIconRevisionSelect');
    var nbItemSelect = arrayItemSelect.length;
    var numDiv;
    var innerHtmlChild;
    //console.log(typeof (numDiv));
    if(nbItemSelect > 0){
        for(i = 0; i < nbItemSelect; i++){
            numDiv = parseInt(arrayItemSelect[i].id.substr(5,arrayItemSelect[i].id.length));
            //console.log(typeof (numDiv));
            if(numDiv > 1){
                innerHtmlChild = document.getElementById('dIcon'+(numDiv-1).toString()).innerHTML;
                document.getElementById('dIcon'+(numDiv-1).toString()).innerHTML = arrayItemSelect[i].innerHTML;
                arrayItemSelect[i].innerHTML = innerHtmlChild;

                document.getElementById('dIcon'+(numDiv-1).toString()).classList.add('dIconRevisionSelect');
                document.getElementById('dIcon'+(numDiv-1).toString()).classList.remove('dIconRevision');
                document.getElementById('dIcon'+(numDiv).toString()).classList.add('dIconRevision');
                document.getElementById('dIcon'+(numDiv).toString()).classList.remove('dIconRevisionSelect');
            }
        }
    }
}

function deplaceDroite(clickEvent){
    var arrayItemSelect = document.getElementsByClassName('dIconRevisionSelect');
    var arrayItem = document.getElementsByClassName('dIconRevision');
    var nbItemSelect = arrayItemSelect.length;
    var nbItem = arrayItem.length;
    var totalItem = nbItemSelect+nbItem;
    var numDiv = 0;
    var innerHtmlChild;
    //console.log(typeof (numDiv));
    if(nbItemSelect > 0){
        for(i = 0; i < nbItemSelect; i++){
            numDiv = parseInt(arrayItemSelect[i].id.substr(5,arrayItemSelect[i].id.length));
            //console.log(typeof (numDiv));
            if(numDiv < totalItem){
                innerHtmlChild = document.getElementById('dIcon'+(numDiv+1).toString()).innerHTML;
                document.getElementById('dIcon'+(numDiv+1).toString()).innerHTML = arrayItemSelect[i].innerHTML;
                arrayItemSelect[i].innerHTML = innerHtmlChild;

                document.getElementById('dIcon'+(numDiv+1).toString()).classList.add('dIconRevisionSelect');
                document.getElementById('dIcon'+(numDiv+1).toString()).classList.remove('dIconRevision');
                document.getElementById('dIcon'+(numDiv).toString()).classList.add('dIconRevision');
                document.getElementById('dIcon'+(numDiv).toString()).classList.remove('dIconRevisionSelect');
            }
        }
    }
}

function imageStationClick(clickEvent){
    var arrayItemSelect = document.getElementsByClassName('imageSelect');
    var nbItemSelect = arrayItemSelect.length;
    if(clickEvent.target.classList.toString() === 'imageNotSelect') {
        /*if(nbItemSelect > 0){
            for(i = 0; i < nbItemSelect; i++){
                arrayItemSelect[i].classList.add('imageNotSelect');
                arrayItemSelect[i].classList.remove('imageSelect');
            }
        }*/
        clickEvent.target.classList.add('imageSelect');
        clickEvent.target.classList.remove('imageNotSelect');
    }else{
        clickEvent.target.classList.add('imageNotSelect');
        clickEvent.target.classList.remove('imageSelect');
    }
}

/*function mapsClick(){
    document.body.innerHTML +='<div id="dInsert" onclick="clickClose()"></div>';
    document.body.innerHTML +='<div id="dGet">' +
    '<p id="pDivSel">Adresse de la station pour Google Maps</p>'+
    '<input id="iText" type="text" name="maps" placeholder="Adresse de la station" size=40 class="linkMaps"><br>' +
    '<input id="iText" type="text" name="maps" placeholder="Ville de la station" size=40 class="linkMaps"><br>' +
    '<p></p><button id="bInsertMaps">Insérer</button>' +
    '<button id="bClose" onclick="clickClose()">Fermer</button> </p></div>';
    document.getElementsByClassName('linkMaps')[0].value = retriveLien();
    document.getElementsByClassName('linkMaps')[1].value = retriveVille();
}*/

/*function imageClick(){
    document.body.innerHTML +='<div id="dInsert" onclick="clickClose()"></div>';
    document.body.innerHTML +='<div id="dGetImage"></div>';
    var iconSelect;
    /*console.log(document.getElementsByClassName('dIconRevisionSelect')[0].childNodes.length);
    for(i=0; i<document.getElementsByClassName('dIconRevisionSelect')[0].childNodes.length; i++){
        console.log(document.getElementsByClassName('dIconRevisionSelect')[0].childNodes[i]);
    }*/
    //console.log(document.getElementsByClassName('dIconRevisionSelect')[0].childNodes);
   /* if(document.getElementsByClassName('dIconRevisionSelect')[0].childNodes.length >1 ){
        iconSelect = '{"iconselect":"'+document.getElementsByClassName('dIconRevisionSelect')[0].childNodes[1].id+'"}';
    }else{
        iconSelect = '{"iconselect":"'+document.getElementsByClassName('dIconRevisionSelect')[0].childNodes[0].id+'"}';
    }
    //iconSelect = '{"iconselect":"'+document.getElementsByClassName('dIconRevisionSelect')[0].childNodes[0].id+'"}';
    $.ajax({
        url: "/imageList",
        type: "POST",
        dataType: 'html',
        contentType: 'application/json; charset=UTF-8',
        data: iconSelect,
        success: function (resp) {
            document.getElementById('dGetImage').innerHTML = resp;
            document.getElementById('dGetImage').innerHTML += '<br><button id="bInsertPictures">Insérer</button>' +
            '<button id="bClose" onclick="clickClose()">Fermer</button> </div>';
        },
        error: function(resp) {
            alert("error occurred.");
        }
    });
}*/

function youtubeClick(){
    document.body.innerHTML +='<div id="dInsert" onclick="clickClose()"></div>';
    document.body.innerHTML +='<div id="dGet"></div>';
    var iconSelect;
    if(document.getElementsByClassName('dIconRevisionSelect')[0].childNodes.length >1 ){
        iconSelect = '{"iconselect":"'+document.getElementsByClassName('dIconRevisionSelect')[0].childNodes[1].id+'"}';
    }else{
        iconSelect = '{"iconselect":"'+document.getElementsByClassName('dIconRevisionSelect')[0].childNodes[0].id+'"}';
    }
    //var iconSelect = '{"iconselect":"'+document.getElementsByClassName('dIconRevisionSelect')[0].childNodes[0].id+'"}';
    $.ajax({
        url: "/linkList",
        type: "POST",
        dataType: 'html',
        contentType: 'application/json; charset=UTF-8',
        data: iconSelect,
        success: function (resp) {
            document.getElementById('dGet').innerHTML = resp;
            document.getElementById('dGet').innerHTML += '<p id="pControl"><button id="bPlusYoutube" onclick="addYoutubeLink()">+</button>' +
            '<button id="bInsertYoutube">Insérer</button>' +
            '<button id="bClose" onclick="clickClose()">Fermer</button> </p></div>';
        },
        error: function(resp) {
            alert("error occurred.");
        }
    });
    /*if(pageLienYoutube.length > 0){
        for (i = 0; i < pageLienYoutube.length; i++){
            document.getElementById('dGet').innerHTML += '<input id="iText" type="text" value="'+pageLienYoutube[i]+'" name="youtube" placeholder="Lien YouTube" size=40 class="linksYoutube">';
        }
    }
    document.getElementById('dGet').innerHTML += '<input id="iText" type="text" name="youtube" placeholder="Lien YouTube" size=40 class="linksYoutube">';*/

}

function retourSelection(){
    if(imageWindow == true) {
        history.go(-5);
    }else{
        history.go(-4);
        imageWindow = false;
    }

}

function addYoutubeLink(){
    var liens = document.getElementsByClassName('linksYoutube');
    $("#pControl").remove();
    //$("#bInsertYoutube").remove();
    //$("#bClose").remove();
    pageLienYoutube = [];
    for(i=0; i < liens.length - 1; i++) {
        if(liens[i].value != '') {
            pageLienYoutube.push(liens[i].value);
        }
    }
    if(liens[liens.length - 1].value != '') {
        pageLienYoutube.push(liens[liens.length - 1].value);
    }
    document.getElementById('dGet').innerHTML += '<input id="iText" type="text" name="link" placeholder="Liens internet" size=40 class="linksYoutube">' +
    '<p id="pControl"><button id="bPlusYoutube" onclick="addYoutubeLink()">+</button>' +
    '<button id="bInsertYoutube">Insérer</button>' +
    '<button id="bClose" onclick="clickClose()">Fermer</button> </p></div>';
    //console.log(pageLienYoutube);
    if(pageLienYoutube.length > 0){
        for (j = 0; j < pageLienYoutube.length; j++){
            liens[j].value = pageLienYoutube[j];
        }
    }
}

function progressHandlingFunction(e){
    if(e.lengthComputable){
        $('progress').attr({value:e.loaded,max:e.total});
    }
}

/*function uploadImage(){
    imageWindow = true;
    document.body.innerHTML +='<div id="dInsert" onclick="clickClose()"></div>';
    document.body.innerHTML +="<div id='dGet'><p>Téléversement d'une image de la station</p>"+
    '<iframe src="/fileUpload"></iframe>'+
    '<p><button id="bClose" onclick="clickClose()">Fermer</button></p></div>';
}*/

function clickClose(){
    $("#dGetImage").remove();
    $("#dGet").remove();
    $("#dInsert").remove();
}

function storeLien(lien){
    pageLienMap = lien;
}

function storeVille(ville){
    pageVilleMap = ville;
}

function retriveLien(){
    return pageLienMap;
}

function retriveVille(){
    return pageVilleMap;
}
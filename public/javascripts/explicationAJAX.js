/**
 * Created by Phil on 2015-01-05.
 */
var myDiv;
var myVar;
var scrollLeft = 0;
var $nav = $("#divNavProc");

$(document).ready(function() {

    $(window).resize(function () {
        ajusteFiche();
    });

    var x = document.cookie;
    var posPV = x.indexOf(';');
    var ficheRendu = '';
    var position;
    if(document.title == 'Présentation') {
        if (posPV != -1) {
            ficheRendu = x.substring(6, posPV);
            position = x.substring(posPV + 11, x.length);
        }
    }
    //console.log(ficheRendu);
    //console.log(position);


    $(document).on('click', '#iButtonExplication', function () {
        //myDiv = document.getElementById('divNavProc');
        scrollLeft = $('#divNavProc').scrollLeft();
        document.body.innerHTML +='<div id="dInsert" onclick="clickClose()"></div>';
        document.body.innerHTML +='<div id="dGet"><button id="bGlossaire" onclick="clickClose()" style="float: right;">Fermer</button><br></div>';
        //console.log(scrollLeft);
        //$('#divNavProc').scrollLeft(scrollLeft);

        //console.log();
        var iconSelect;
        var selected;
        if(document.title == 'Présentation'){
            selected = document.getElementsByClassName('dIconNavSelect')[0].children[0].id;
        }else{
            selected = document.getElementsByClassName('dFicheNavSelect')[0].children[0].id;
        }
        //if(document.getElementsByClassName('dIconNavSelect')[0].childNodes.length >1 ){
            iconSelect = '{"iconselect":"'+selected+'"}';
        //}else{
            //iconSelect = '{"iconselect":"'+document.getElementById('divProcede').children[0].id+'"}';
        //}
        $.ajax({
            url: "/getExplication",
            type: "POST",
            dataType: 'html',
            contentType: 'application/json; charset=UTF-8',
            data: iconSelect,
            success: function (resp) {
                document.getElementById('dGet').innerHTML += resp;
                document.getElementById('dGet').innerHTML += '<button id="bGlossaire" onclick="clickPlus()">Plus</button>';
                $('#divNavProc').scrollLeft(scrollLeft);
            },
            error: function(resp) {
                alert("error occurred.");
            }
        });

    });

    $(document).on('click', '#iButtonVideo', function () {
        var indice = document.getElementsByName('index')[0].value;
        myDiv = document.getElementById('divNavProc');
        scrollLeft = myDiv.scrollLeft;
        document.body.innerHTML +='<div id="dInsert" onclick="clickClose()"></div>';
        document.body.innerHTML +='<div id="dGetLien"></div>';
        $('#divNavProc').scrollLeft(scrollLeft);
        var iconSelect;
        var selected;
        if(document.title == 'Présentation'){
            selected = document.getElementsByClassName('dIconNavSelect')[0].children[0].id;
        }else{
            selected = document.getElementsByClassName('dFicheNavSelect')[0].children[0].id;
        }
        //if(document.getElementsByClassName('dIconNavSelect')[0].childNodes.length >1 ){
        iconSelect = '{"index":"'+ indice +'","nom":"'+selected+'"}';
        //}else{
        //iconSelect = '{"iconselect":"'+document.getElementById('divProcede').children[0].id+'"}';
        //}
        $.ajax({
            url: "/getLienFiche",
            type: "POST",
            dataType: 'html',
            contentType: 'application/json; charset=UTF-8',
            data: iconSelect,
            success: function (resp) {
                document.getElementById('dGetLien').innerHTML = '<button id="bGlossaire" onclick="clickClose()" style="float: right;">Fermer</button><br>' + resp;
            },
            error: function(resp) {
                alert("error occurred.");
            }
        });

    });

    $(document).on('click', '#labelLienGlossaire', function (event) {
        $("#dGetTooltip").remove();
        if(document.getElementById('dGet')) {
            document.getElementById('dGet').style.zIndex = 99;
        }
        if(document.getElementById('dGetPlus')) {
            document.getElementById('dGetPlus').style.zIndex = 99;
        }
        myDiv = document.getElementById('divNavProc');
        scrollLeft = myDiv.scrollLeft;
        var myDiv2 = document.getElementById('dExplication');
        var scrollTop = myDiv2.scrollTop;
        document.body.innerHTML +='<div id="dGetGlossaire" style="'+ determineGlossairePositionY(event.pageY) +'px; left:'+ event.pageX +'px; text-align: justify;"><button id="bGlossaire" onclick="clickClose()" style="float: right;">Fermer</button><br>'+
        '<h3>'+ arrangeTitreGlossaire(this.innerHTML) +'</h3><p>'+ this.getAttribute('data-tooltip') +
        '</p><form action="/glossaire" method="post" target="_blank"><button id="bGlossaire">Glossaire complet</button></form></div>';
        $('#divNavProc').scrollLeft(scrollLeft);
        $('#dExplication').scrollTop(scrollTop);
        //console.log(this.getAttribute('data-tooltip'));
    });

    $(document).on('mouseenter', '#labelLienGlossaire', function(event){
        if (!document.getElementById('dGetTooltip')) {
            //$("#dGetTooltip").remove();
            myVar = setTimeout(function(args){
                myDiv = document.getElementById('divNavProc');
                scrollLeft = myDiv.scrollLeft;
                var myDiv2 = document.getElementById('dExplication');
                var scrollTop = myDiv2.scrollTop;
                document.body.innerHTML += '<div id="dGetTooltip" style="top:' + (parseInt(event.pageY) + 20) + 'px; left:' + event.pageX + 'px; text-align: justify;">' +
                args.getAttribute('data-tooltip') + '</div>';
                ajusteToolTip();
                $('#divNavProc').scrollLeft(scrollLeft);
                $('#dExplication').scrollTop(scrollTop);
            }, 1000, this);
        }
    });

    $(document).on('mouseleave', '#labelLienGlossaire', function(){
        //console.log('exit');
        $("#dGetTooltip").remove();
        clearTimeout(myVar);
    });

    $(document).on('mouseenter', '#dInsert', function(){
        //console.log('exit');
        $("#dGetTooltip").remove();
        clearTimeout(myVar);
    });

    if(document.getElementById('divProcede').children.length > 0){
        var indice = document.getElementsByName('index')[0].value;
        var selected;
        if(document.title == 'Présentation'){
            selected = document.getElementsByClassName('dIconNavSelect')[0].children[0].id;
        }else{
            selected = document.getElementsByClassName('dFicheNavSelect')[0].children[0].id;
        }
        var nomAffiche = '{"index":"'+ indice +'","nom":"'+selected+'"}';
        unlockMenuButton(nomAffiche);
    }
    if(document.title == 'Présentation') {
        if (ficheRendu != '') {
            var arrayItemSelect = document.getElementsByClassName('dIconNavSelect');
            var nbItemSelect = arrayItemSelect.length;

            if (nbItemSelect > 0) {
                for (i = 0; i < nbItemSelect; i++) {
                    arrayItemSelect[i].classList.add('dIconNav');
                    arrayItemSelect[i].classList.remove('dIconNavSelect');
                }
            }

            arrayItemSelect = document.getElementsByClassName('dIconNav');
            nbItemSelect = arrayItemSelect.length;
            if (nbItemSelect > 0) {
                var maxItem = nbItemSelect;
                for (i = 0; i < maxItem; i++) {
                    if (arrayItemSelect[i].childNodes[1].id == ficheRendu) {
                        arrayItemSelect[i].classList.add('dIconNavSelect');
                        arrayItemSelect[i].classList.remove('dIconNav');
                        maxItem = maxItem - 1;
                    }
                }
            }

            getFiche(ficheRendu);
            //console.log(position);
            $('#divNavProc').scrollLeft(parseInt(position));
            //$('#divNavProc').scrollLeft(position);
        }
    }
});

function ajusteToolTip(){
    var largeur = window.innerWidth/3;
    myDiv = document.getElementById('dGetTooltip');
    if(largeur < myDiv.clientWidth){
        var style = myDiv.getAttribute("style");
        myDiv.setAttribute("style","width:"+ largeur +"px;"+style);
    }
}

function determineGlossairePositionY(posSourisY){
    console.log(window.innerHeight-posSourisY);
    if(posSourisY > (window.innerHeight*0.66)){
        return "bottom:" + (window.innerHeight-posSourisY-20);
    }
    else{
        return "top:" + posSourisY;
    }
}

/*function afficheTooltip(labelEvent){
    //setTimeout(function() {
        myDiv = document.getElementById('divNavProc');
        scrollLeft = myDiv.scrollLeft;
        if (!document.getElementById('dGetTooltip')) {
            document.body.innerHTML += '<div id="dGetTooltip" style="top:' + (parseInt(labelEvent.pageY) + 20) + 'px; left:' + labelEvent.pageX + 'px; text-align: justify;">' +
            this.getAttribute('data-tooltip') + '</div>';
        }
        $('#divNavProc').scrollLeft(scrollLeft);
    //}, 1000);
    //console.log('enter');
}*/
/*function effaceTooltip(){
    //console.log('exit');
    $("#dGetTooltip").remove();
}*/

function arrangeTitreGlossaire(sTitreOri) {
    var exeption;
    //sTitreOri = sTitreOri.substring(7, sTitreOri.length-8);
    exeption = glossaireException(sTitreOri);

    if(exeption[0] == 'oui'){
        return exeption[1];
    }else {
         var sTitre = '';
         for (var i = 0; i < sTitreOri.length; i++) {
            if (sTitreOri[i] != 's') {
                sTitre += sTitreOri[i];
            } else {
                if ((i < sTitreOri.length - 1) && (sTitreOri[i + 1] != ' ')) {
                    sTitre += sTitreOri[i];
                }
            }
         }
         return sTitre[0].toUpperCase()+ sTitre.substr(1, sTitre.length-1);
    }
}

function glossaireException(sTitreOri){
    var exeption = ['non', ''];
    switch (sTitreOri){
        case '<i>Giardia</i>':
            exeption[0] = 'oui';
            exeption[1] = sTitreOri.substring(0,3) + sTitreOri[3].toUpperCase() + sTitreOri.substr(4, sTitreOri.length - 1);
            break;
        case '<i>Cryptosporidium</i>':
            exeption[0] = 'oui';
            exeption[1] = sTitreOri.substring(0,3) + sTitreOri[3].toUpperCase() + sTitreOri.substr(4, sTitreOri.length - 1);
            break;
        case 'puits tubulaire foré':
            exeption[0] = 'oui';
            exeption[1] = sTitreOri[0].toUpperCase()+ sTitreOri.substr(1, sTitreOri.length-1);
            break;
        case 'mailles très serrées':
            exeption[0] = 'oui';
            exeption[1] = sTitreOri[0].toUpperCase()+ sTitreOri.substr(1, sTitreOri.length-1);
            break;
        case 'microtamis à mailles très serrées':
            exeption[0] = 'oui';
            exeption[1] = sTitreOri[0].toUpperCase()+ sTitreOri.substr(1, sTitreOri.length-1);
            break;
        case 'mailles':
            exeption[0] = 'oui';
            exeption[1] = sTitreOri[0].toUpperCase()+ sTitreOri.substr(1, sTitreOri.length-1);
            break;
        case 'pH':
            exeption[0] = 'oui';
            exeption[1] = sTitreOri;
            break;
        case "résines échangeuses d'ions":
            exeption[0] = 'oui';
            exeption[1] = "Résine échangeuse d'ions";
            break;
        case "boues":
            exeption[0] = 'oui';
            exeption[1] = sTitreOri[0].toUpperCase()+ sTitreOri.substr(1, sTitreOri.length-1);
            break;
        case "virus":
            exeption[0] = 'oui';
            exeption[1] = sTitreOri[0].toUpperCase()+ sTitreOri.substr(1, sTitreOri.length-1);
            break;
        case "sédiments":
            exeption[0] = 'oui';
            exeption[1] = sTitreOri[0].toUpperCase()+ sTitreOri.substr(1, sTitreOri.length-1);
            break;
        case "procédés de traitement":
            exeption[0] = 'oui';
            exeption[1] = sTitreOri[0].toUpperCase()+ sTitreOri.substr(1, sTitreOri.length-1);
            break;
        case "niveaux d'eau":
            exeption[0] = 'oui';
            exeption[1] = "Niveau d'eau";
            break;
        case "tamis":
            exeption[0] = 'oui';
            exeption[1] = sTitreOri[0].toUpperCase()+ sTitreOri.substr(1, sTitreOri.length-1);
            break;
        case "matières en suspension":
            exeption[0] = 'oui';
            exeption[1] = "Matières en suspension";
            break;
        case "en suspension":
            exeption[0] = 'oui';
            exeption[1] = "Matières en suspension";
            break;
        case "suspension":
            exeption[0] = 'oui';
            exeption[1] = "Matières en suspension";
            break;
        case "régénéré":
            exeption[0] = 'oui';
            exeption[1] = "Régénérer";
            break;
        case "colmatent":
            exeption[0] = 'oui';
            exeption[1] = "Colmater";
            break;
        case "bactéries pathogènes":
            exeption[0] = 'oui';
            exeption[1] = "Bactéries pathogènes";
            break;

    }
    return exeption;
}


function imageOriginal(event){
    //console.log(event.target.src);
    var hauteur = window.innerHeight - 150;
    var ratio;
    //console.log(hauteur + 'x' + largeur);
    myDiv = document.getElementById('divNavProc');
    scrollLeft = myDiv.scrollLeft;
    document.body.innerHTML +='<div id="dGetOri"><button id="bGlossaire" onclick="clickClose()" style="float: right;">Fermer</button><br><img class="imgOri" src="'+ event.target.src +'"></div>';
    document.getElementById('dGetImage').style.zIndex = 99;
    $('#divNavProc').scrollLeft(scrollLeft);
    var imageObj = document.getElementsByClassName('imgOri').item(0);

    if(imageObj.height > hauteur){
        ratio = imageObj.width/imageObj.height;
        imageObj.height = hauteur;
        imageObj.width = hauteur*ratio;
    }
}

function clickClose(){
    if(document.getElementById('dGetGlossaire')) {
        $("#dGetGlossaire").remove();
        if (document.getElementById('dGet')) {
            document.getElementById('dGet').style.zIndex = 101;
        }
        if (document.getElementById('dGetPlus')) {
            document.getElementById('dGetPlus').style.zIndex = 101;
        }
    }else if(document.getElementById('dGetOri')){
        $("#dGetOri").remove();
        document.getElementById('dGetImage').style.zIndex = 101;
    }else{
        $("#dGetLien").remove();
        $("#dGetPlus").remove();
        $("#dGet").remove();
        $("#dGetImage").remove();
        $("#dGetTooltip").remove();
        $("#dInsert").remove();
    }

}

function clickPlus(){
    var selected;
    if(document.title == 'Présentation'){
        selected = document.getElementsByClassName('dIconNavSelect')[0].children[0].id;
    }else{
        selected = document.getElementsByClassName('dFicheNavSelect')[0].children[0].id;
    }
    var iconSelect = '{"iconselect":"'+selected+'"}';
    $.ajax({
        url: "/getExplicationPlus",
        type: "POST",
        dataType: 'html',
        contentType: 'application/json; charset=UTF-8',
        data: iconSelect,
        success: function (resp) {
            myDiv = document.getElementById('divNavProc');
            scrollLeft = myDiv.scrollLeft;
            $("#dGet").remove();
            document.body.innerHTML +='<div id="dGetPlus"><button id="bGlossaire" onclick="clickClose()" style="float: right;">Fermer</button><br>' + resp + '</div>';
            ajusterDGetPlus();
            $('#divNavProc').scrollLeft(scrollLeft);
        },
        error: function(resp) {
            alert("error occurred.");
        }
    });
}

function ajusterDGetPlus(){
    var hauteur = window.innerHeight - 150;
    myDiv = document.getElementById('dExplication');
    if(hauteur < myDiv.clientHeight){
        var style = myDiv.getAttribute("style");
        console.log(style);
        myDiv.setAttribute("style","height:"+ hauteur +"px;"+style);
        myDiv.style.overflowY = 'scroll';
    }

}
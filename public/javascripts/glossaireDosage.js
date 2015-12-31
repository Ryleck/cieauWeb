/**
 * Created by Phil on 2015-01-18.
 */

var myVar;

$(document).ready(function() {
    /*$(document).on('click', '#labelLienGlossaire', function (event) {
        document.body.innerHTML +='<div id="dInsert" onclick="clickClose()"></div>';
        document.body.innerHTML +='<div id="dGetGlossaire" style="top:'+ (event.pageY-190) +'px;left:'+ event.pageX +'px; text-align: justify;"><button id="bGlossaire" onclick="clickClose()">Fermer</button>'+
        '<h3>Doseur</h3><p>'+ this.title +
        '</p><p><form action="/glossaire" method="post" target="_blank"><button id="bGlossaire">Glossaire complet</button></form></p></div>';
        //alert(this.title);
    });*/

    $(document).on('click', '#labelLienGlossaire', function (event) {
        $("#dGetTooltip").remove();
        /*if(document.getElementById('dGet')) {
            document.getElementById('dGet').style.zIndex = 99;
        }*/
        if(document.getElementById('dGetPlusDosage')) {
            document.getElementById('dGetPlusDosage').style.zIndex = 99;
        }else{
            document.body.innerHTML +='<div id="dInsert" onclick="clickClose()"></div>';
        }
        document.body.innerHTML +='<div id="dGetGlossaire" style="'+ determineGlossairePositionY(event.pageY) +'px; '+ determineGlossairePositionX(event.pageX) +'px; text-align: justify;"><button id="bGlossaire" onclick="clickClose()" style="float: right;">Fermer</button><br>'+
        '<h3>'+ arrangeTitreGlossaire(this.innerHTML) +'</h3><p>'+ this.getAttribute('data-tooltip') +
        '</p><form action="/glossaire" method="post" target="_blank"><button id="bGlossaire">Glossaire complet</button></form></div>';
        //console.log(this.getAttribute('data-tooltip'));
    });

    $(document).on('mouseenter', '#labelLienGlossaire', function(event){
        if (!document.getElementById('dGetTooltip')) {
            myVar = setTimeout(function(args){
                document.body.innerHTML += '<div id="dGetTooltip" style="top:' + (parseInt(event.pageY) + 20) + 'px; left:' + event.pageX + 'px; text-align: justify;">' +
                args.getAttribute('data-tooltip') + '</div>';
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

});

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
    }
    return exeption;
}

function determineGlossairePositionY(posSourisY){
    //console.log(window.innerHeight-posSourisY);
    if(posSourisY > (window.innerHeight*0.66)){
        return "bottom:" + (window.innerHeight-posSourisY-20);
    }
    else{
        return "top:" + posSourisY;
    }
}

function determineGlossairePositionX(posSourisX){
    //console.log(window.innerHeight-posSourisY);
    if(posSourisX > (window.innerWidth*0.50)){
        return "left:" + (posSourisX-400);
    }
    else{
        return "left:" + posSourisX;
    }
}

function clickPlus(){
    var iconSelect = '{"iconselect":"dosage"}';
    $.ajax({
        url: "/getExplicationPlus",
        type: "POST",
        dataType: 'html',
        contentType: 'application/json; charset=UTF-8',
        data: iconSelect,
        success: function (resp) {
            //myDiv = document.getElementById('divNavProc');
            //scrollLeft = myDiv.scrollLeft;
            document.body.innerHTML +='<div id="dInsert" onclick="clickClose()"></div>';
            document.body.innerHTML +='<div id="dGetPlusDosage"><button id="bGlossaire" onclick="clickClose()" style="float: right;">Fermer</button><br>' + resp + '</div>';
            //$('#divNavProc').scrollLeft(scrollLeft);
        },
        error: function(resp) {
            alert("error occurred.");
        }
    });
}

function clickClose(){
    if(document.getElementById('dGetGlossaire')) {
        $("#dGetGlossaire").remove();
        if (document.getElementById('dGetPlusDosage')) {
            document.getElementById('dGetPlusDosage').style.zIndex = 101;
        }else{
            $("#dGetTooltip").remove();
            $("#dInsert").remove();
        }
    }else {
        $("#dGetPlusDosage").remove();
        $("#dGetTooltip").remove();
        $("#dInsert").remove();
    }
}
/**
 * Created by Phil on 2014-12-21.
 */

var myVar;
$(document).ready(function(){
    //Make ajax call to fetch data
    //console.log('ready');
    if ($("#refresh").val() == 'yes') {
        var indice = document.getElementsByName('index')[0].value;
        var req = '{"index":"'+ indice +'"}';
        //alert('refresh');
        $.ajax({
            url: "/listeFichiers",
            type: "POST",
            dataType: 'html',
            contentType: 'application/json; charset=UTF-8',
            data: req,
            success: function (resp) {
                document.getElementById('dExistantes').innerHTML = resp;
            },
            error: function (resp) {
                alert("error occurred.");
            }
        });

    } else {
        $('#refresh').val('yes');
    }

    $(document).on('click', "#iButtonDelete", function() {
        var r = confirm("Voulez-vous vraiment supprimer la présentation " + this.name);
        var indice = document.getElementsByName('index')[0].value;
        //console.log(indice);
        if(r == true) {
            var varDeleteButton = '{"deletebutton":"' + this.name + '","index":"'+ indice +'"}';
            //alert('Click delete');
            $.ajax({
                url: "/deletePresentation",
                type: "POST",
                dataType: 'html',
                contentType: 'application/json; charset=UTF-8',
                data: varDeleteButton,
                success: function (resp) {
                    document.getElementById('dExistantes').innerHTML = resp;
                },
                error: function (resp) {
                    alert("error occurred.");
                }
            });
        }
    });

    $(document).on('click', '#buttonInfo', function(event) {
        var indice = document.getElementsByName('index')[0].value;
        var utilisateur = document.getElementsByName('utilisateur')[0].value;
        var infoFichier = '{"fichier":"' + this.value + '","index":"'+ indice +'","utilisateur":"'+utilisateur+'"}';
        $.ajax({
            url: "/resumeFichier",
            type: "POST",
            dataType: 'html',
            contentType: 'application/json; charset=UTF-8',
            data: infoFichier,
            success: function (resp) {
                //if (!document.getElementById('dGetTooltip')) {
                //myVar = setTimeout(function(args){
                $("#dGetTooltip").remove();
                document.body.innerHTML += '<div id="dGetTooltip" style="top:' + (parseInt(event.pageY) + 20) + 'px; right:' + (window.innerWidth - parseInt(event.pageX)) + 'px; text-align: justify;">' +
                '<button id="bGlossaire" onclick="$(\'#dGetTooltip\').remove()" style="float: right;">Fermer</button><br>' + resp + '</div>';
                ajusteToolTip();
                //}, 1000, resp);
                //}
                //document.getElementById('dExistantes').innerHTML = resp;
            },
            error: function (resp) {
                alert("error occurred.");
            }
        });

    });

    $(document).on('click', '#buttonInfoAdmin', function(event) {
        var indice = document.getElementsByName('index')[0].value;
        var infoFichier = '{"fichier":"' + this.value + '","index":"'+ indice +'","utilisateur":"admin"}';
        $.ajax({
            url: "/resumeFichier",
            type: "POST",
            dataType: 'html',
            contentType: 'application/json; charset=UTF-8',
            data: infoFichier,
            success: function (resp) {
                //if (!document.getElementById('dGetTooltip')) {
                //myVar = setTimeout(function(args){
                $("#dGetTooltip").remove();
                document.body.innerHTML += '<div id="dGetTooltip" style="top:' + (parseInt(event.pageY) + 20) + 'px; right:' + (window.innerWidth - parseInt(event.pageX)) + 'px; text-align: justify;">' +
                '<button id="bGlossaire" onclick="$(\'#dGetTooltip\').remove()" style="float: right;">Fermer</button><br>' + resp + '</div>';
                ajusteToolTip();
                //}, 1000, resp);
                //}
                //document.getElementById('dExistantes').innerHTML = resp;
            },
            error: function (resp) {
                alert("error occurred.");
            }
        });

    });

    /*$(document).on('mouseleave', 'label', function(){
        //console.log('exit');
        $("#dGetTooltip").remove();
        clearTimeout(myVar);
    });*/

    /*$(document).on('mouseenter', 'input', function(){
        //console.log('exit');
        $("#dGetTooltip").remove();
        clearTimeout(myVar);
    });**/

});

function ajusteToolTip(){
    var largeur = window.innerWidth/3;
    myDiv = document.getElementById('dGetTooltip');
    if(largeur < myDiv.clientWidth){
        var style = myDiv.getAttribute("style");
        myDiv.setAttribute("style","width:"+ largeur +"px;"+style);
    }
}
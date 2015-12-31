/**
 * Created by Phil on 2015-01-15.
 */
function imageOriginal(event){
    //console.log(event.target.src);
    var hauteur = $(document).height() - 150;
    var ratio;
    //console.log(hauteur + 'x' + largeur);
    document.body.innerHTML +='<div id="dInsert" onclick="clickClose()"></div>';
    document.body.innerHTML +='<div id="dGetOri"><button id="bGlossaire" onclick="clickClose()" style="float: right; margin: 10px;">Fermer</button><br><img class="imgOri" src="'+ event.target.src +'" height="'+hauteur+'"></div>';

    /*var imageObj = document.getElementsByClassName('imgOri').item(0);
    ratio = imageObj.width/imageObj.height;
    imageObj.height = hauteur;
    imageObj.width = hauteur*ratio;*/
}

function clickClose(){
    $("#dGetOri").remove();
    $("#dInsert").remove();
}
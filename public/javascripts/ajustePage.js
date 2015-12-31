/**
 * Created by Phil on 2015-03-07.
 */

var hauteurBase = 667;
var largeurBase = 1024;

$(document).ready(function() {
    var hauteur = window.innerHeight;
    var largeur = window.innerWidth;
    var diff = hauteur - hauteurBase;
    var diffL = largeur - largeurBase;
    var resolution = hauteur * largeur;
    /*if(diff > 0){
        //console.log(getInt(document.getElementById("bGlossaire").style.top)+"px");
        document.getElementById("bGlossaire").style.top = 640 - diff + "px";
        if((148 - diff) > 0) {
            document.getElementById("divPresentation").style.top = 148 - diff + "px";
        }else{
            document.getElementById("divPresentation").style.top = "0px";
        }

    }*/
    //console.log(diffL);
    if(diffL > 0){
        /*if(diffL < 100)
        {
            document.getElementById("iProf3").style.width = 270 - diffL + "px";
            document.getElementById("iOndine").style.width = 120 - diffL + "px";
            document.getElementById("iWalter").style.width = 120 - diffL + "px";
        }
        else{
            document.getElementById("iProf3").style.width = 170 + "px";
            document.getElementById("iOndine").style.width = 90 + "px";
            document.getElementById("iWalter").style.width = 90 + "px";
        }*/
        document.getElementById("fProf3").style.left = 805 + diffL + "px";
        if((580 + diffL) < 800) {
            document.getElementById("divPresentation").style.width = 520 + diffL + "px";
            document.getElementById("divGouttes").style.width = 580 + diffL + "px";
        }else{
            document.getElementById("divPresentation").style.width = "740px";
            document.getElementById("divGouttes").style.width = "800px";
        }
        if(largeur > 1250){
            console.log(largeur);
            if((260 + (largeur - 1250)) < 420) {
                //console.log("2");
                document.getElementById("divPresentation").style.left = 290 + (largeur - 1250) + "px";
                document.getElementById("divGouttes").style.left = 260 + (largeur - 1250) + "px";
            }else{
                document.getElementById("divPresentation").style.left = "450px";
                document.getElementById("divGouttes").style.left = "420px";
            }
        }else{
            document.getElementById("divPresentation").style.left = "290px";
            document.getElementById("divGouttes").style.left = "260px";
        }
    }
    $('#labelResolution').text(largeur + ' X ' + hauteur);
    $(window).resize(function () {
        hauteur = window.innerHeight;
        diff = hauteur - hauteurBase;
        largeur = window.innerWidth;
        diffL = largeur - largeurBase;
        /*if(diff > 0){
            document.getElementById("bGlossaire").style.top = 640 - diff + "px";
            if((148 - diff)  > 0){
                document.getElementById("divPresentation").style.top = 148 - diff + "px";
            }else{
                document.getElementById("divPresentation").style.top = "0px";
            }

        }*/
        if(diffL > 0){
            /*if(diffL < 100)
            {
                document.getElementById("iProf3").style.width = 270 - diffL + "px";
            }
            else{
                document.getElementById("iProf3").style.width = 170 + "px";
            }*/
            //console.log(getInt(document.getElementById("divGouttes").style.left));
            document.getElementById("fProf3").style.left = 805 + diffL + "px";
            if((580 + diffL) < 800) {
                document.getElementById("divPresentation").style.width = 520 + diffL + "px";
                document.getElementById("divGouttes").style.width = 580 + diffL + "px";
            }else{
                document.getElementById("divPresentation").style.width = "740px";
                document.getElementById("divGouttes").style.width = "800px";
            }
            if(largeur > 1250){
                if((260 + (largeur - 1250)) < 420) {
                    document.getElementById("divPresentation").style.left = 290 + (largeur - 1250) + "px";
                    document.getElementById("divGouttes").style.left = 260 + (largeur - 1250) + "px";
                }else{
                    document.getElementById("divPresentation").style.left = "450px";
                    document.getElementById("divGouttes").style.left = "420px";
                }
            }else{
                document.getElementById("divPresentation").style.left = "290px";
                document.getElementById("divGouttes").style.left = "260px";
            }
        }
        $('#labelResolution').text(largeur + ' X ' + hauteur);
    });

    document.cookie = "fiche=debut";
    document.cookie = "position=0";
});

function getInt(varString){
    return parseInt(varString.substring(0,varString.length-2));
}
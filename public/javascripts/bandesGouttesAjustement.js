/**
 * Created by Phil on 2015-02-14.
 */


$(document).ready(function(){
    var h = window.innerHeight;
    var w = window.innerWidth;
    $("#divGouttesG").height(h-60);
    $("#divGouttesD").height(h-60);
    if(w > h) {
        $("#imgProf").height(h / 1.75);
        $("#imgOndine").height(h / 3);
        $("#imgWalter").height(h / 3);
    }else{
        $("#imgProf").height(w / 1.75);
        $("#imgOndine").height(w / 3);
        $("#imgWalter").height(w / 3);
    }
    $(window).resize(function(){
        h = window.innerHeight;
        w = window.innerWidth;
        $("#divGouttesG").height(h-60);
        $("#divGouttesD").height(h-60);
        if(w > h) {
            $("#imgProf").height(h / 1.75);
            $("#imgOndine").height(h / 3);
            $("#imgWalter").height(h / 3);
        }else{
            $("#imgProf").height(w / 1.75);
            $("#imgOndine").height(w / 3);
            $("#imgWalter").height(w / 3);
        }
    });

    $(document).on('click', '.classChkBoxProcedes', function(){
        document.getElementsByName('modifie')[0].value = 'oui';
    });

    $(document).on('change', '#selectAlim2', function(){
        document.getElementsByName('modifie')[0].value = 'oui';
    });
});



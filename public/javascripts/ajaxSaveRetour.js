/**
 * Created by Phil on 2015-01-27.
 */

/*$(window).onhashchange = function() {
    alert('test');
};*/

$(document).ready(function() {

    $(document).on('click', '.bPrecedentInfo', function () {
        $.ajax({
            url: "/enregistrementRetourInfo",
            type: "POST",
            data:$("#formInfo").serialize(),
            dataType: 'json',
            success: function (resp) {
                //alert('La présentation a été enregistrée sous le nom ' + retourneNomFichier(resp));
                //console.log(retourneNomFichier(resp));
                history.back();
                //alert("Enregistrement");
            }
        });
    });

    $(document).on('click', '.bPrecedentSource', function () {
        $.ajax({
            url: "/enregistrementRetourSource",
            type: "POST",
            data:$("#formInfo").serialize(),
            dataType: 'json',
            success: function (resp) {
                //alert('La présentation a été enregistrée sous le nom ' + retourneNomFichier(resp));
                //console.log(retourneNomFichier(resp));
                history.back();
                //alert("Enregistrement");
            }
        });
    });

    $(document).on('click', '.bPrecedentProcedes', function () {
        history.back();
        /*$.ajax({
            url: "/enregistrementRetourProcedes",
            type: "POST",
            data:$("#formInfo").serialize(),
            dataType: 'json',
            success: function (resp) {
                //alert('La présentation a été enregistrée sous le nom ' + retourneNomFichier(resp));
                //console.log(retourneNomFichier(resp));

                //alert("Enregistrement");
            }
        });*/
    });
});
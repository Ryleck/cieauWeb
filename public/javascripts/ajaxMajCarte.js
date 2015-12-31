/**
 * Created by Phil on 2015-01-24.
 */
$(document).ready(function(){
    $(document).on('click','#buttonMajCarte', function() {
        var indice = document.getElementsByName('index')[0].value;
        varLieuJson = '{"index":"'+ indice +'","lieu":{"rue":"'+ $(".adrLieuPresentation")[0].value +'","ville":"'+ $(".adrLieuPresentation")[1].value +'"}}';
        $.ajax({
            url: "/majCarte",
            type: "POST",
            dataType: 'html',
            contentType: 'application/json; charset=UTF-8',
            data: varLieuJson,
            success: function (resp) {
                $('iframe')[0].src = resp;
            }
        });
    });
});
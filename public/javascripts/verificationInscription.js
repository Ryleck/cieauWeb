/**
 * Created by Phil on 2015-04-03.
 */
$(document).ready(function() {
    $(document).on('keyup', '#iTextNom', function () {
        //console.log(document.getElementById('iTextNom').value);
        if(document.getElementById('iTextNom').value != '') {
            document.getElementById('lNom').classList.add('lTextInsOK');
            document.getElementById('lNom').classList.remove('lTextIns');
        }else{
            document.getElementById('lNom').classList.add('lTextIns');
            document.getElementById('lNom').classList.remove('lTextInsOK');
        }
        enabledInscription();
    });
    $(document).on('change', '#iTextNom', function () {
        //console.log(document.getElementById('iTextNom').value);
        if(document.getElementById('iTextNom').value != '') {
            document.getElementById('lNom').classList.add('lTextInsOK');
            document.getElementById('lNom').classList.remove('lTextIns');
        }else{
            document.getElementById('lNom').classList.add('lTextIns');
            document.getElementById('lNom').classList.remove('lTextInsOK');
        }
        enabledInscription();
    });
    $(document).on('keyup', '#iTextPass', function () {
        //console.log(document.getElementById('iTextNom').value);
        if(document.getElementById('iTextPass').value != '') {
            document.getElementById('lPass').classList.add('lTextInsOK');
            document.getElementById('lPass').classList.remove('lTextIns');
        }else{
            document.getElementById('lPass').classList.add('lTextIns');
            document.getElementById('lPass').classList.remove('lTextInsOK');
        }
        enabledInscription();
    });
    $(document).on('keyup', '#iTextPassCon', function () {
        //console.log(document.getElementById('iTextNom').value);
        if((document.getElementById('iTextPassCon').value == document.getElementById('iTextPass').value)
            && (document.getElementById('iTextPassCon').value != '')) {
            document.getElementById('lPassCon').classList.add('lTextInsOK');
            document.getElementById('lPassCon').classList.remove('lTextIns');
        }else{
            document.getElementById('lPassCon').classList.add('lTextIns');
            document.getElementById('lPassCon').classList.remove('lTextInsOK');
        }
        enabledInscription();
    });
    $(document).on('keyup', '#iTextEmail', function () {
        //console.log(document.getElementById('iTextNom').value);
        if(document.getElementById('iTextEmail').value.search('@') != -1) {
            document.getElementById('lEmail').classList.add('lTextInsOK');
            document.getElementById('lEmail').classList.remove('lTextIns');
        }else{
            document.getElementById('lEmail').classList.add('lTextIns');
            document.getElementById('lEmail').classList.remove('lTextInsOK');
        }
        enabledInscription();
    });
    $(document).on('change', '#iTextEmail', function () {
        //console.log(document.getElementById('iTextNom').value);
        if(document.getElementById('iTextEmail').value.search('@') != -1) {
            document.getElementById('lEmail').classList.add('lTextInsOK');
            document.getElementById('lEmail').classList.remove('lTextIns');
        }else{
            document.getElementById('lEmail').classList.add('lTextIns');
            document.getElementById('lEmail').classList.remove('lTextInsOK');
        }
        enabledInscription();
    });
});

function enabledInscription(){
    //console.log(document.getElementsByName('btnInscription')[0]);
    if(document.getElementsByClassName('lTextInsOK').length == 4){
        document.getElementsByName('btnInscription')[0].id = 'button';
        document.getElementsByName('btnInscription')[0].disabled = false;
    }else{
        document.getElementsByName('btnInscription')[0].id = 'buttonDisabled';
        document.getElementsByName('btnInscription')[0].disabled = true;
    }
}
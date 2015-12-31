/**
 * Created by Phil on 2015-01-22.
 */

$(document).ready(function() {

    for (var i = 0; i < $('.chekboxDosage').length; i++){
        if($('.chekboxDosage')[i].checked == true){
            $('.chekboxDosage')[i].classList.add('chekboxDosageCheck');
            $('.chekboxDosage')[i].classList.remove('chekboxDosage');
        }
    }
    enbSuivant();
});

function clickDosage(checkbox) {
    //console.log(checkbox);
    if (checkbox.classList.toString() === 'chekboxDosage') {
        checkbox.classList.add('chekboxDosageCheck');
        checkbox.classList.remove('chekboxDosage');
    } else {
        checkbox.classList.add('chekboxDosage');
        checkbox.classList.remove('chekboxDosageCheck');
    }
    enbSuivant();
}

function enbSuivant(){
    //alert('enbSuivant');
    if ($('.chekboxDosageCheck').length > 0) {
        $('.btnSuivant')[0].id = 'buttonPresentation';
        $('.btnSuivant')[0].disabled = false;
    } else {
        $('.btnSuivant')[0].id = 'buttonPresentationDisabled';
        $('.btnSuivant')[0].disabled = true;
    }
}
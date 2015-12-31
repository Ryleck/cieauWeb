/**
 * Created by Phil on 2015-04-10.
 */
function supprimerUtilisateur(event){
    var nom = event.target.name;
    varJson = '{"user":"'+ nom +'"}';
    console.log(varJson);
    $.ajax({
        url: "/supprimerUtilisateur",
        type: "POST",
        dataType: 'html',
        contentType: 'application/json; charset=UTF-8',
        data: varJson,
        success: function (resp) {
            document.getElementById('divUtilisateurs').innerHTML = resp;
        }
    });
}
/**
 * Created by Phil on 2014-12-21.
 */

function retourneNomFichier(sJson){
    var nomFichier;
    var n = sJson.indexOf('nom') + 6;
    var m = sJson.lastIndexOf('"') - 4;
    nomFichier = sJson.substring(n,m);
    return nomFichier;
}

/*function ctrlSave(event){
    if (event.ctrlKey && event.keyCode == 83) {
        event.preventDefault();
        enregistre();
    }
}*/

function enregistre(){
    var indice = document.getElementsByName('index')[0].value;
    var lienPhoto = document.getElementById('image_public_id').value;
    var varOrdreJson = '{"index":"'+ indice +'","photo":"'+lienPhoto+'","ordre":[';
    var ordrePresentation = document.getElementById('dRevision').getElementsByClassName('iIconRevision');
    for(i=1; i< ordrePresentation.length-2; i++){
        varOrdreJson = varOrdreJson + '{"fiche":"' + ordrePresentation[i].id + '"},';
    }
    varOrdreJson = varOrdreJson + '{"fiche":"' + ordrePresentation[ordrePresentation.length-2].id + '"}';
    //console.log(ordrePresentation[0].id);
    //console.log(ordrePresentation[5].id);
    varOrdreJson = varOrdreJson + ']}';

    $.ajax({
        url: "/enregistrement",
        type: "POST",
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        data: varOrdreJson,
        success: function (resp) {
            alert('La présentation a été enregistrée sous le nom ' + retourneNomFichier(resp));
            document.getElementById('bouttonRevSel').disabled = false;
            document.getElementById('bouttonRevPre').disabled = false;
            //$('#').id.d = false;
            //console.log(retourneNomFichier(resp));
            //alert("Enregistrement");
        }
    });
}

//document.addEventListener('onkeypress', ctrlSave, false);


$(document).ready(function(){

    $.cloudinary.config({ cloud_name: 'dno3dfbgx', api_key: '997542646619133'});


    $('.cloudinary-fileupload').bind('cloudinarydone', function(e, data) {
        $('.preview').html(
            $.cloudinary.image(data.result.public_id,
                { format: data.result.format, version: data.result.version,
                    crop: 'fill', width: 150, height: 100 })
        );
        $('.image_public_id').val(data.result.public_id);
        alert('Image téléversée');
        return true;
    });

    $(document).on('keydown', function(e){
        if(e.ctrlKey && e.which === 83){
            console.log('Ctrl+S!');
            e.preventDefault();
            enregistre();
        }
    });
    /*$('#formUpload').submit( function() {
        //var formData = new FormData($('form')[0]);
        console.log(formData);
        $(this).ajaxSubmit({

            error: function(xhr) {
                status('Error: ' + xhr.status);
            },

            success: function(response) {
                console.log(response);
            }
        });
        /*$.ajax( {
         url: '/uploadimage',  //Server script to process data
         type: 'POST',
         /*xhr: function() {  // Custom XMLHttpRequest
         var myXhr = $.ajaxSettings.xhr();
         if(myXhr.upload){ // Check if upload property exists
         myXhr.upload.addEventListener('progress',progressHandlingFunction, false); // For handling the progress of the upload
         }
         return myXhr;
         },*/
        //Ajax events
        //beforeSend: beforeSendHandler,
        /*success: function (resp) {
         console.log(resp);
         //alert("Enregistrement");
         },
         //error: errorHandler,
         // Form data
         data: formData,
         //Options to tell jQuery not to process data or worry about content-type.
         cache: false,
         contentType: false,
         processData: false
         } );*/
       /* return false;
        clickClose();
    });*/

    //Make ajax call to fetch data
    $(document).on('click','#iButtonSave', function() {
        enregistre();
    });

    $(document).on('click','.bPrecedent', function() {
        var indice = document.getElementsByName('index')[0].value;
        var lienPhoto = document.getElementById('image_public_id').value;
        var varOrdreJson = '{"index":"'+ indice +'","photo":"'+lienPhoto+'","ordre":[';
        //var varOrdreJson = '{"index":"'+ indice +'","ordre":[';
        var ordrePresentation = document.getElementById('dRevision').getElementsByClassName('iIconRevision');
        for(i=1; i< ordrePresentation.length-2; i++){
            varOrdreJson = varOrdreJson + '{"fiche":"' + ordrePresentation[i].id + '"},';
        }
        varOrdreJson = varOrdreJson + '{"fiche":"' + ordrePresentation[ordrePresentation.length-2].id + '"}';
        //console.log(ordrePresentation[0].id);
        //console.log(ordrePresentation[5].id);
        varOrdreJson = varOrdreJson + ']}';
        $.ajax({
            url: "/enregistrement",
            type: "POST",
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            data: varOrdreJson,
            success: function (resp) {
                //alert('La présentation a été enregistrée sous le nom ' + retourneNomFichier(resp));
                //console.log(retourneNomFichier(resp));
                history.back();
                //alert("Enregistrement");
            }
        });
    });

    $(document).on('click','#bInsertMaps', function() {
        var lien = document.getElementsByClassName('linkMaps')[0].value;
        var ville = document.getElementsByClassName('linkMaps')[1].value;
        if ((lien != '') && (ville != '')){
            console.log(lien);
            storeLien(lien);
            storeVille(ville);
            $.ajax({
                url: "/insertionMaps",
                type: "POST",
                dataType: 'json',
                contentType: 'application/json; charset=UTF-8',
                data: '{"lien":[{"adr":"'+lien+'","ville":"'+ville+'"}]}',
                success: function (resp) {
                    console.log(resp);
                    //alert("Enregistrement");
                }
            });
            clickClose();
        }
    });

   /* $(document).on('click','#uploadImage',function() {
        //var data = $('#formUpload').serialize();
        var file = document.getElementById('myFile').files[0];
        if (file) {
            // create reader
            var reader = new FileReader();
            reader.readAsBinaryString(file);
            reader.onload = function(e) {
                // browser completed reading file - display it
                $.ajax({
                    url: "/uploadimage",
                    type: "POST",
                    contentType: 'multipart/form-data',
                    data: e.file,
                    success: function (resp) {
                        console.log(resp);
                        //alert("Enregistrement");
                    }
                });
                //console.log(e.target.result);
            };
        }

        /*this.ajaxForm(function() {
            alert("Thank you for your comment!");
            //history.back();
            //return false;
        });*/
        /*$.post(
         '/uploadimage',
         {data: data},
         function(response){
         console.log(response);
         }
         );
         $.getElementById('formUpload').ajaxSubmit({

         error: function(xhr) {
         status('Error: ' + xhr.status);
         },

         success: function(response) {
         console.log(response);
         }
         });

        clickClose();
    });*/

    $(document).on('click','#bInsertYoutube', function() {
        var liens = document.getElementsByClassName('linksYoutube');
        var procAss = document.getElementsByClassName('dIconRevisionSelect');
        var dataLien;
        if(procAss[0].childNodes.length >1 ){
            dataLien = '{"procAss":"'+ procAss[0].childNodes[1].id +'", "liens":[';
        }else{
            dataLien = '{"procAss":"'+ procAss[0].childNodes[0].id +'", "liens":[';
        }
        //var dataLien = '{"procAss":"'+ procAss[0].childNodes[1].id +'", "liens":['
        pageLienYoutube = [];
        if(liens[0].value != '') {
            dataLien = dataLien + '{"lien":"' + liens[0].value + '"}';
            pageLienYoutube.push(liens[0].value);
        }
        for(i=1; i < liens.length; i++) {
            if(liens[i].value != '') {
                dataLien = dataLien + ',{"lien":"' + liens[i].value + '"}';
                pageLienYoutube.push(liens[i].value);
            }
        }
        dataLien = dataLien + ']}';
        //console.log(dataLien);
        if (liens[0].value != ''){
            //console.log('non vide');
            //storeLien(lien);
            $.ajax({
                url: "/insertionYoutube",
                type: "POST",
                dataType: 'json',
                contentType: 'application/json; charset=UTF-8',
                data: dataLien,
                success: function (resp) {
                    console.log(resp);
                    //alert("Enregistrement");
                }
            });
            clickClose();
        }
    });

    $(document).on('click','#bInsertPictures', function() {
        var images = document.getElementsByName('imagesProcedes');
        var procAss = document.getElementsByClassName('dIconRevisionSelect');

        //console.log(images);
        var dataImages;
        if(procAss[0].childNodes.length >1 ){
            dataImages = '{"procAss":"'+ procAss[0].childNodes[1].id +'", "imagesProc":[';
        }else{
            dataImages = '{"procAss":"'+ procAss[0].childNodes[0].id +'", "imagesProc":[';
        }

        //var dataImages = '{"procAss":"'+ procAss[0].childNodes[1].id +'", "imagesProc":[';
        for(i=0; i < images.length - 1; i++) {
            dataImages = dataImages + '{"imageProc":"' + images[i].id + '", "select":"'+images[i].className+'"},';
            //pageImages.push(images[i].id);
        }
        dataImages = dataImages + '{"imageProc":"' + images[images.length - 1].id + '", "select":"'+images[i].className+'"}]}';
        //pageImages.push(images[images.length - 1].id);
        //console.log(dataLien);

        console.log(dataImages);
        //storeLien(lien);
        $.ajax({
            url: "/insertionImages",
            type: "POST",
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            data: dataImages,
            success: function (resp) {
                console.log(resp);
                //alert("Enregistrement");
            }
        });
        clickClose();
    });
});
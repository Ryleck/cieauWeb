/**
 * Created by Phil on 2014-12-12.
 */

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    var sIDInfo = ev.target.parentNode.id + ',' + ev.target.id;
    ev.target.parentNode.id
    ev.dataTransfer.setData("text", sIDInfo);
}

function drop(ev) {
    ev.preventDefault();
    var sIDInfo = ev.dataTransfer.getData("text");
    //console.log(sIDInfo);
    var sIDArray = sIDInfo.split(',');
    var icon1 = document.getElementById(ev.target.id);
    var icon2 = document.getElementById(sIDArray[1]);
    var divDrop = ev.target.parentNode.id;
    var i = 0;
    //console.log(sIDArray[0]);

    mouseClickEvent(ev);

    if((divDrop.search('dIcon') != -1) && (sIDArray[0].search('dIcon') != -1)){

        /********code alternatif*********/
        var iSource = 0;
        var iDrop = 0;
        var iDiff = 0;

        if(sIDArray[0].length == 6) {
            iSource = parseInt(sIDArray[0].charAt(5));
        }else{
            iSource = parseInt(sIDArray[0].substr(5,2));
        }
        if(divDrop.length == 6) {
            iDrop = parseInt(divDrop.charAt(5));
        }else{
            iDrop = parseInt(divDrop.substr(5,2));
        }
        iDiff = iDrop-iSource;
        //console.log(iDiff);
        if(iDiff < 0){
            //console.log(typeof iSource);
            //console.log(typeof iDrop);
            for(i = iSource; i > iDrop; i--){
                //console.log(i);
                document.getElementById('dIcon'+ i).innerHTML = document.getElementById('dIcon'+ (i-1)).innerHTML;

            }
            document.getElementById(divDrop).innerHTML = icon2.outerHTML;
        }else{
            for(i = iSource; i < iDrop; i++){
                //console.log(i);
                document.getElementById('dIcon'+ i).innerHTML = document.getElementById('dIcon'+ (i+1)).innerHTML;

            }
            document.getElementById(divDrop).innerHTML = icon2.outerHTML;
        }

        /*************************/
        /*document.getElementById(sIDArray[0]).innerHTML = icon1.outerHTML;
        document.getElementById(ev.target.parentNode.id).innerHTML = icon2.outerHTML;*/
    }
    //ev.target.appendChild(icon2);
}
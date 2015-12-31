/**
 * Created by Phil on 2014-12-05.
 */

var deltaX;
var deltaY;



function mouseDownClient(eventDown){
    var element = document.getElementById("index");
    var rect = element.getBoundingClientRect();
    deltaX = Number(eventDown.pageX) - Number(rect.left);
    deltaY = Number(eventDown.pageY) - Number(rect.top);
    //alert('event x : ' + eventDown.pageX + ' eventDown y : ' + eventDown.pageY);
    //alert('delta x : ' + deltaX + ' delta y : ' + deltaY);
}

function mouseUpClient(eventUp){
    //alert('event x : ' + eventUp.pageX + ' eventDown y : ' + eventUp.pageY);
    //alert('delta x : ' + deltaX + ' delta y : ' + deltaY);
}

function dragImageClient(event) {
    //element.style.position = "absolute";
    var element = document.getElementById("index");
    //alert('event x : ' + event.pageX + ' event y : ' + event.pageY);
    if(event.pageX > deltaX) {
        //alert('x');
        element.style.left = String(Number(event.pageX) - deltaX) + 'px';
    }
    if(event.pageY > deltaY) {
        //alert('y');
        element.style.top = String(Number(event.pageY) - deltaY) + 'px';
    }
    //console.log(event.clientX, event.clientY);
}
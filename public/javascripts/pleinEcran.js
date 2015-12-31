/**
 * Created by Phil on 2015-03-08.
 */
function pleinEcran(element){
    document.getElementById('imgFull').src = 'images/fullscreenEnter.png';
    if( window.innerHeight == screen.height) {
        if(document.exitFullscreen) {
            document.exitFullscreen();
        } else if(document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if(document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }

    }
    else {
        document.getElementById('imgFull').src = 'images/fullscreenExit.png';
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }

    }
}
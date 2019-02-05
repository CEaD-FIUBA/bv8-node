var port = 443;

$(document).ready(function () {
    console.log('ready');
    serverCall();
});

function serverCall() {
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', `http://bbv8.herokuapp.com/videos/${videoId}`, true);
    //xhttp.setRequestHeader("Content-type", "application/json");
    //xhttp.setRequestHeader('Access-Control-Allow-Headers', '*');
    //xhttp.setRequestHeader("crossDomaintrue",true);
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log('dsdas:' + xhttp.responseText);
            var responseJSON = JSON.parse(xhttp.responseText);
            getCaptions(responseJSON['id_caption']);
        }
        console.log('onreadystatechange: ' + xhttp.readyState + 'status: ' + xhttp.status);
    }
    xhttp.send();
    console.log('GET captionId')
    //var response = JSON.parse(xhttp.responseText);
}


function getCaptions(idCaption) {
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', `https://bbv8-py.herokuapp.com/captions/${idCaption}`, true);
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log('dsdas:' + xhttp.responseText);
            var responseJSON = JSON.parse(xhttp.responseText);
            parseCaption(responseJSON['id_caption']);
        }
        console.log('onreadystatechange: ' + xhttp.readyState + 'status: ' + xhttp.status);
    }
    xhttp.send();
    console.log('getCaption')
}

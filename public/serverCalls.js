var port = 443;

$(document).ready(function(){
	console.log('ready');
	serverCall();
});

function serverCall() {
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'http://157.92.49.65:'+port+'/'+videoId, true);
    //xhttp.setRequestHeader("Content-type", "application/json");
		//xhttp.setRequestHeader('Access-Control-Allow-Headers', '*');
		//xhttp.setRequestHeader("crossDomaintrue",true);
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200){
	    		console.log('dsdas:'+xhttp.responseText);
					var responseJSON = JSON.parse(xhttp.responseText);
					parserCaption(responseJSON['caption']);
				}
			console.log('onreadystatechange: '+xhttp.readyState+'status: '+xhttp.status);
    }
    xhttp.send();
    console.log('send')
    //var response = JSON.parse(xhttp.responseText);

}

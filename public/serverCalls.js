var captions = [];
var timesOfChapters = [];
var chapters = [];

const TOPIC_TEXT = "Tema"
const LINE_TEXT_KEY = "caption";
const LINE_TIME_KEY = "time";

function isTopicText(text) {
    const idx = text.search(TOPIC_TEXT);
    return idx != -1;
}

function insertCaptions(lines) {
    lines.forEach(line => {
        const text = line[LINE_TEXT_KEY]
        const time = line[LINE_TIME_KEY]
        const htmlLine = $("<p></p>")
        htmlLine.val(time)
        if (isTopicText(text)) {
            htmlLine.addClass("chapter");
            htmlLine.text(text.split(":")[1])
            $("#chapters").append(htmlLine);
            timesOfChapters.push(time);
            chapters.push(htmlLine)
        } else {
            htmlLine.addClass("line")
            $("#caption").append(htmlLine);
            captions.push(htmlLine)
            htmlLine.text(text)
        }
    });
}

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
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', `https://bbv8-py.herokuapp.com/captions/${idCaption}`, true);
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            const responseJSON = JSON.parse(xhttp.responseText);
            console.log('dsdas:', xhttp.responseText);
            console.log('keys', Object.keys(responseJSON));
            console.log('keys', Object.keys(responseJSON));

            insertCaptions(responseJSON['captions']);
        }
        console.log('onreadystatechange: ' + xhttp.readyState + 'status: ' + xhttp.status);
    }
    xhttp.send();
    console.log('getCaption by id')
}

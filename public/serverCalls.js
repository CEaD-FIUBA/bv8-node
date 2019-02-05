var captions = [];
var timesOfChapters = [];
var chapters = [];

const TOPIC_TEXT = "Tema"

function isTopicText(text) {
    const idx = text.search(TOPIC_TEXT);
    return idx != -1;
}

function insertCaptions(lines) {
    lines.forEach(line => {
        const text = line['caption']
        const time = line['time']
        const htmlLine = $("<p></p>")
        htmlLine.val(time)
        if (isTopicText(text)) {
            htmlLine.addClass("chapter");
            $("#chapters").append(line);
            timesOfChapters.push(time);
            chapters.push(line)
        } else {
            htmlLine.addClass("line")
            $("#caption").append(line);
            captions.push(line)
        }
    });
    // var array = caption_string.split(",");
    // var len = array.length;
    // for (var i = 0; i < len - 1; i = i + 2) {
    //     var time = array[i];
    //     var text = array[i + 1];
    //     var line = $("<p></p>");
    //     line.val(time);
    //     //Aca me fijo si mi caption es un indice o un caption
    //     var n = text.search("Tema:");
    //     //Si no es un indice
    //     if (n == -1) {
    //         line.text(text);
    //         line.addClass('line');
    //         $("#caption").append(line);
    //         captions.push(line);
    //     } else {
    //         var chapter_name = text.split(":")[1];
    //         line.text(chapter_name);
    //         //console.log("chapter_name:"+chapter_name);
    //         line.addClass('chapter');
    //         $("#chapters").append(line);
    //         timesOfChapters.push(time);
    //         chapters.push(line);
    //     }
    //     console.log('text: ' + text + 'time: ' + time);
    // }
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

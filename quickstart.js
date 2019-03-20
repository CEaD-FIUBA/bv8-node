var fs = require('fs');
var readline = require('readline');
var { google } = require('googleapis');
var OAuth2 = google.auth.OAuth2;


//Informacion del video que quiero obtener informacion
var fieldsOfQuery = "items(id,snippet)";
var captionFormat = 'srt';
var idCaption;
var title;
var videoId;
// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/youtube-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/youtube.force-ssl'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
  process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = 'youtube-nodejs-quickstart.json';
console.log('TOKEN_DIR' + TOKEN_PATH);

module.exports = {
  foo: function (response, video_id) {
    return new Promise(function (resolve, reject) {
      videoId = video_id
      // Load client secrets from a local file.
      fs.readFile('client_secret.json', function processClientSecrets(err, content) {
        if (err) {
          console.log('Error loading client secret file: ' + err);
          reject('error loading client secret file');
        }
        // Authorize a client with the loaded credentials, then call the YouTube API.
        authorize(JSON.parse(content), getIdCaption, response, resolve);
      });
    });
  }
}




/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback, response, resolve) {
  //console.log('credentials', credentials.installed);
  //console.log('credentials', credentials.installed);
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function (err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
      return Promise.reject('getNewToken');
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client, response, resolve);
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function (code) {
    rl.close();
    oauth2Client.getToken(code, function (err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
    if (err) throw err;
    console.log('Token stored to ' + TOKEN_PATH);
  });
  console.log('Token stored to ' + TOKEN_PATH);
}

function getIdCaption(auth, response, resolve) {
  console.log('Getting caption id');
  var service = google.youtube('v3');
  service.captions.list({
    auth: auth,
    part: "snippet",
    videoId: videoId,
    fields: fieldsOfQuery
  }, function (err, res) {
    if (err) {
      console.log('The API returned an error' + err)
    }
    console.log('response', res.data.items);
    const itemOK = res.data.items.filter(item => item.snippet.status != "failed")[0]
    idCaption = itemOK.id;
    //var obj = JSON.parse(body);
    console.log("El id del caption:" + idCaption);
    console.log('response:' + response);
    response.caption_id = idCaption;
    getTitle(auth, response, resolve);
    //getCaption(idCaption, response, resolve);
    //resolve(response);
  });
}


function getTitle(auth, response, resolve) {
  console.log('Get title of video');
  var service = google.youtube('v3');
  service.videos.list({
    auth: auth,
    part: "snippet",
    id: videoId,
    fields: "items/snippet/title"
  }, function (err, res) {
    if (err) {
      console.log('The API returned an error' + err);
    }
    console.log('response', JSON.stringify(res.data));
    console.log('The title', res.data.items[0].snippet.title);
    response['video_title'] = res.data.items[0].snippet.title;
    resolve(response);
  });
}


//This function get a hh:mm:ss.ms --> hh:mm:ss.ms
function parseToSecondFromFormatVTT(timeInFormatVTT) {
  var arr = timeInFormatVTT.split('-->');
  var beginTime = arr[0];
  var arrTime = beginTime.split(":");
  //console.log('arrTime:'+arrTime);
  var hourInSeconds = parseInt(arrTime[0]) * 60 * 60;
  var minuteInSeconds = parseInt(arrTime[1]) * 60;
  var ss_ms = arrTime[2] + '';
  //console.log('ss.ms'+ss_ms);
  var seconds = parseInt(ss_ms.split(".")[0]);
  //console.log('seconds:'+seconds);
  //console.log('hourInSeconds:'+hourInSeconds+'minuteInSeconds:'+minuteInSeconds+'seconds:'+seconds);
  var time = hourInSeconds + minuteInSeconds + seconds;
  return time;
}

function formatCaptionToJSON(responseFromPythonCode) {
  var captionJSON = []
  var arr = responseFromPythonCode.split("<->");
  for (var i = 4; i < arr.length - 2; i = i + 3) {
    var time = arr[i].split(",")[1];
    var text = arr[i + 1].split(",")[1];
    console.log("text:" + text + "time:" + time);
    //console.log("arr["+i+"]: "+arr[i]);
    captionJSON.push([parseToSecondFromFormatVTT(time + ''), text]);
  }
  return captionJSON;
}

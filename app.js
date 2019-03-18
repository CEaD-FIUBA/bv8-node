var express = require('express');
var quickstart = require('./quickstart');
const captionService = require('./service/captionService')

const PORT = process.env.PORT || 8080;

const app = express();
app.get('/favicon.ico', function (req, res) {
    res.send('favicon.ico');
    res.status(204);
});

app.use(express.static('public'));


app.get('/status', (req, res) => {
    console.log('GET /status');
    res.send({ 'status': 200 })
})

app.get('/express_backend', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.get('/captions/:id', (req, res) => {
    const captionId = req.params.id;
    console.log(`GET /captions/${captionId}`);
    captionService.getCaptionsById(captionId).then((captions) => {
        console.log('captions', captions);
        res.send(captions);
    })
});

app.get('/videos/:id', function (req, res) {
    const video_id = req.params.id;
    console.log("GET videos/id/%s", video_id);
    var response = {};
    quickstart.foo(response, video_id)
        .then(function (response) {
            res.status(200);
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.send(response);
        })
})




app.listen(PORT, function () {
    console.log(`Listen the port ${PORT}`);
    console.log(`Environment ${process.env.ENV}`);

})

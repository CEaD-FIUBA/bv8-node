var express = require('express');
var quickstart = require('./quickstart');

const PORT = process.env.PORT || 8080;

const app = express();
app.get('/favicon.ico', function (req, res) {
    res.send('favicon.ico');
    res.status(204);
});

app.use(express.static('public'));


app.get('/', (req, res) => {
    console.log('GET /');
    res.send({ 'status': 200 })
})

app.get('/videos/id/:id', function (req, res) {
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
})

var express = require('express');
var quickstart = require('./quickstart');
const log4js = require('log4js');
log4js.configure({
    appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
    categories: { default: { appenders: ['cheese'], level: 'info' } }
});
const logger = log4js.getLogger('cheese');


const PORT = 8080;

const app = express();
app.get('/favicon.ico', function(req, res) {
    res.send('favicon.ico');
    res.status(204);
});


app.get('/', (req, res) => {
    logger.info('GET /');
    res.send({ 'status': 200 })
})

app.get('/videos/id/:id', function(req, res) {
    const video_id = req.params.id;
    logger.info("GET videos/id/%s", video_id)
    var response = {};
    quickstart.foo(response, video_id)
        .then(function(response) {
            res.status(200);
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.send(response);
        })
})




app.listen(PORT, function() {
    console.log(`Listen the port ${PORT}`);
})

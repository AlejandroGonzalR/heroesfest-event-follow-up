'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const routes = require('./routes/routes');

// Constants
const PORT = config.server.port;
const HOST = config.server.host;

// App
const app = express();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

routes(app);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
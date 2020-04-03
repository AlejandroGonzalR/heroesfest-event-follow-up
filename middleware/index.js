'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const path = require('path');
const db = require('./db');
const routes = require('./routes/routes');

// Constants
const PORT = process.env.PORT | config.server.port;

// App
const app = express();

app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'controlPanel.html'));
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

routes(app);

app.listen(3000);
console.log(`Running on http://locahost:${PORT}`);

/*Promise.resolve(db.connection())
    .then(_ => {
        app.listen(PORT, HOST);
        console.log(`Running on http://localhost:${PORT}`);
    })
    .catch(err => {
        console.log(err)
    });*/



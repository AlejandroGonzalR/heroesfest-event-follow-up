'use strict';

const mongoose = require('mongoose');
const Database_Config = require('./config').database;

let mongoDB = Database_Config.host;
const config = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.Promise = global.Promise;
const connection = _ => mongoose.connect(mongoDB, config);

module.exports = {
    connection
};

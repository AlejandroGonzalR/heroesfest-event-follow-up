'use strict';
const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const logSchema = Schema({
    time: String,
    path: String,
    status: String,
    message:String
});

module.exports = mongoose.model('Logs',logSchema);



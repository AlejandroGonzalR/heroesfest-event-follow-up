'use strict';

const pool = require('../db');

exports.listAttendees = (result) => {
    pool.query('SELECT * FROM heroes ORDER BY id ASC', (err, outcome) => {
        if (err) {
            result(null, err);
        }
        else {
            result(null, outcome.rows);
        }
    })
};

exports.listInstitutions = (result) => {
    pool.query('SELECT DISTINCT institution FROM heroes ORDER BY institution ASC', (err, outcome) => {
        if (err) {
            result(null, err);
        }
        else {
            result(null, outcome.rows);
        }
    })
};

exports.listAttendeesByInstitution = (institution, result) => {
    pool.query('SELECT name, surname, city FROM heroes WHERE institution = $1', [institution], (err, outcome) => {
        if (err) {
            result(null, err);
        }
        else {
            result(null, outcome.rows);
        }
    })
};

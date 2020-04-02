'use strict';

const fs = require('fs');
const { buildPathPdf } = require('../routes/buildPaths');

let Attendees = require('../models/Attendees');
let pdf_template = require('../utils/buildPDFTemplate');
let pdf_generator = require('../utils/generatePDF');

exports.getAllAttendees = (req, res) => {
    Attendees.listAttendees((err, result) => {
        handleRequest(req);
        if (err) logError(req, res, err, 'Error listing all attendees.');
        res.status(200).json(result);
    });
};

exports.getAllInstitutions = (req, res) => {
    Attendees.listInstitutions((err, result) => {
        handleRequest(req);
        if (err) logError(req, res, err, 'Error listing all institutions.');
        res.status(200).json(result);
    });
};

exports.getAttendeesByInstitution = (req, res) => {
    let institution = req.query.institution;
    let file, stat;

    Attendees.listAttendeesByInstitution(institution, (err, result) => {
        handleRequest(req);
        if (err) logError(req, res, err, `Error listing attendees of institution ${institution}.`);
        pdf_template.generatePdfTemplate(institution, result);
        pdf_generator.printPdf().then(() => {
            file = fs.createReadStream(buildPathPdf);
            stat = fs.statSync(buildPathPdf);

            let title = normalizeInstitutionName(institution);
            res.setHeader('Content-Length', stat.size);
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=reporte_${title}_heroes_fest_2017.pdf`);
            file.pipe(res);
        })
    });
};

function normalizeInstitutionName(name) {
    name = name.replace(/\s/g, '_');
    return name.normalize("NFD").replace(/[\u0300-\u036f]/g, '');
}

function handleRequest(req) {
    console.log(`Handle request in ${req.method}: ${req.url}`);
}

function logError(req, res, err, message) {
    res.status(500).json({
        status: 500,
        message: message,
        detailed_message: err.message
    });
    console.log(`${message}`)
}

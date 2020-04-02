const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { buildPathPdf } = require('../routes/buildPaths');
const hermesUrl = 'http://10.4.72.150';

const addresses = [
    {
        host: hermesUrl,
        port: 8090
    },
    {
        host: hermesUrl,
        port: 8091
    },
    {
        host: hermesUrl,
        port: 8092
    }
];

let errorsCounter = 0;

exports.obtainInstitutions = (req, res) => {
    console.log(`${addresses[errorsCounter].host}:${addresses[errorsCounter].port}/institutions`);
    notifyUnavailableService(res);
    getInstitutionsData()
        .then(response => {
            handleRequest(req);
            res.send(response);
        })
        .catch(err => {
            errorsCounter = (errorsCounter + 1) % addresses.length;
            logError(req, res, err, 'Error obtaining institutions');
            return this.obtainInstitutions(req, res);
        })
};

async function getInstitutionsData() {
    let response = await axios.get(`${addresses[errorsCounter].host}:${addresses[errorsCounter].port}/institutions`);
    return response.data;
}

exports.getEventReport = (req, res) => {
    console.log(`${addresses[errorsCounter].host}:${addresses[errorsCounter].port}/attendees`);
    let institution = req.query.institution;
    if (!institution) {
        handleRequest(req);
        res.status(400).send({ error: true, message: 'Please provide all information' });
    } else {
        notifyUnavailableService(res);
        getReportData(institution)
            .then(response => {
                handleRequest(req);
                try {
                    if (doesFileExist(buildPathPdf)) {
                        fs.unlinkSync(buildPathPdf);
                    }

                    response.pipe(fs.createWriteStream(path.join(__dirname, buildPathPdf)));
                    // let report = fs.createReadStream(path.join(__dirname, buildPathPdf));
                    // report.pipe(res);
                    res.send('/out/report.pdf')
                } catch (e) {
                    console.log('Error generating file report')
                }
            })
            .catch(err => {
                errorsCounter = (errorsCounter + 1) % addresses.length;
                logError(req, res, err, 'Error obtaining report');
                return this.getEventReport(req, res);
            })
    }
};

async function getReportData(institution) {
    let response = await axios({
        method:'get',
        url: `${addresses[errorsCounter].host}:${addresses[errorsCounter].port}/attendees/?institution=${institution}`,
        responseType: 'stream'
    });
    return response.data;
}

function handleRequest(req) {
    console.log(`Handle request in ${req.method}: ${req.url}`);
}

function logError(req, res, err, message) {
    console.log(`status: 500, message: ${message}, detailed_message: ${err.message}`)
}

function notifyUnavailableService(res) {
    if (errorsCounter === 2) {
        res.writeHead(503, { 'Content-Type': 'text/plain' });
        res.end('Service unavailable');
        return;
    }
}

const doesFileExist = (filePath) => {
    try {
        fs.statSync(filePath);
        return true;
    } catch (error) {
        return false;
    }
};

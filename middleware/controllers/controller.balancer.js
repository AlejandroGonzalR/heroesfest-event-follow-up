const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { buildPathPdf } = require('../routes/buildPaths');
const hermesUrl = 'http://0.0.0.0';

const addresses = [
    {
        host: hermesUrl,
        port: 10000
    },
    {
        host: hermesUrl,
        port: 10001
    },
    {
        host: hermesUrl,
        port: 10002
    }
];

let errorsCounter = 0;

exports.obtainInstitutions = (req, res) => {
    console.log('asdasd')
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

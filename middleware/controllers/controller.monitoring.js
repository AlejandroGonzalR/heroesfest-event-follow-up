const mailer = require('../utils/logsNotifier');
const logSaver = require('../utils/logsSaver');

exports.reportErrorLog = (req, res) => {
    handleRequest(req);
    mailer.sendMail(req, res);
};

exports.saveErrorLog = (req, res) => {
    handleRequest(req);
    let data = new logSaver(req.body);
    data.save()
        .then(item => {
            console.log(item);
            res.send("item saved to database");
        })
        .catch(err => {
            console.log(err);
            res.status(400).send("unable to save to database");
        });
};

function handleRequest(req) {
    console.log(`Handle request in ${req.method}: ${req.url}`);
}

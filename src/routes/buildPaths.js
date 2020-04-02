const path = require('path');
const buildPaths = {
    buildPathHtml: path.resolve('./public/report.html'),
    buildPathPdf: path.resolve('./public/build.pdf')
};

module.exports = buildPaths;

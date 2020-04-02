const fs = require('fs');
const { buildPathHtml } = require('../routes/buildPaths');

const createRow = (item) => `
  <tr>
    <td>${item.name}</td>
    <td>${item.surname}</td>
    <td>${item.city}</td>
  </tr>
`;

const createTable = (rows) => `
  <table>
    <tr style="text-align: center;">
        <th>Nombre</td>
        <th>Apellido</td>
        <th>Ciudad</td>
    </tr>
    ${rows}
  </table>
`;

const createHtml = (title, table, records) => `
    <html>
        <head>
              <style>
                body {
                  font-family: "Arial", sans-serif;
                }
                table {
                  width: 100%;
                  font-size: 10px;
                }
                tr {
                  text-align: left;
                }
                th, td {
                  padding: 5px 15px;
                }
                tr:nth-child(odd) {
                  background: #EFEFEF
                }
                tr:nth-child(even) {
                  background: #FFF
                }
              </style>
        </head>
        <body>
            <div id="pageHeader" style="text-align: center;">Reporte de la empresa ${title} - Asistencia Heroes Fest 2017</div>
            <br>
            ${table}
            <div id="pageFooter" style="font-size: 12px;">
                <hr>
                Total de registros: ${records}
            </div>
        </body>
    </html>
`;

const doesFileExist = (filePath) => {
    try {
        fs.statSync(filePath);
        return true;
    } catch (error) {
        return false;
    }
};

exports.generatePdfTemplate = (institution, data) => {
    try {
        if (doesFileExist(buildPathHtml)) {
            fs.unlinkSync(buildPathHtml);
        }
        const rows = data.map(createRow).join('');
        const table = createTable(rows);
        const html = createHtml(institution, table, data.length);
        fs.writeFileSync(buildPathHtml, html);
        console.log('Successfully created PDF template.');
    } catch (error) {
        console.log('Error generating PDF template.', error);
    }
};

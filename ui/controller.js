const institutionsBaseUrl = 'http://localhost:3000/institutions';
const attendeesBaseUrl = 'http://localhost:3000/attendees/?institution=';

async function getInstitutions() {
    let response = await fetch(institutionsBaseUrl);
    return await response.json();
}

async function getAttendees() {
    let select = document.getElementById('select-input');
    let institution = select.options[select.selectedIndex].value;
    let response = await fetch(attendeesBaseUrl + institution);
    let file = await response.text();
    downloadReport(file, institution);
}

function downloadReport(blob, institution) {
    let filename = `Reporte ${institution} - heroes fest 2017`;
    const link = document.createElement('a');
    // let file = new Blob([blob], {type : 'application/pdf'});
    link.href = 'http://localhost:3000/' + blob;// URL.createObjectURL(file);
    link.target = '_blank';
    // link.download = filename; // Download PDF file
    document.body.append(link);
    link.click();
    link.remove();
    window.addEventListener('focus', () => URL.revokeObjectURL(link.href), { once: true });
}

getInstitutions().then(data => {
    let select = document.getElementById('select-input');
    Object.keys(data).forEach(key => {
        select.options[select.options.length] = new Option(data[key].institution, data[key].institution);
    });
});

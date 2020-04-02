'use strict';

const nodeMailer = require('nodemailer');

const transporter = nodeMailer.createTransport({
    // host: 'smtp.gmail.com',
    // port: 465,
    // secure: true,
    proxy: 'http://172.16.0.73:8080',
    service: 'gmail',
    auth: {
        user: 'caronte.logs@gmail.com',
        pass: 'c4r0nt3.'
    }
});

exports.sendMail = (req, res) => {
    const mailOptions = {
        from: 'caronte.logs@gmail.com',
        to: 'caronte.logs@gmail.com',
        subject: 'Caronte Server Error Log',
        html: `<h3>Error Details</h3>
               <p>${req.body.message}</p>
               <p>${req.body.status}</p>
               <p>${req.body.error}</p>`
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
            return res.send(err.toString());
        }
        console.log(`Message sent with response: ${info.response}`);
        return res.send('Send Success');
    });
};

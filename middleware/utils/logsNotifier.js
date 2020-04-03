'use strict';

const nodeMailer = require('nodemailer');

const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASS = process.env.GMAIL_PASS;

const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS
    }
});

exports.sendMail = (req, res) => {
    const mailOptions = {
        from: GMAIL_USER,
        to: GMAIL_USER,
        subject: 'Server Error Log',
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

const nodemailer = require("nodemailer");

const { GMAIL_EMAIL, GMAIL_PASS } = require('./server-config');

const mailsender = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: "indiantechmojito@gmail.com",
        pass: "ymspfdpqkgwuuema"
    }
});

module.exports = mailsender;
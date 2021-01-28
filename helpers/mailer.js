const nodemailer = require('nodemailer')
require('dotenv').config()

class NodeMailer {
    constructor(email) {
        this.to = email
    }

    static mailer() {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        })

        let mailOption = {
            from: 'dummymamant@gmail.com',
            to: this.to,
            subject: 'Testing yoooooo',
            text: 'Tesing mail'
        }

        transporter.sendMail(mailOption, function(err, data) {
            if (err) {
                console.log('error', err);
            } else {
                console.log('mail send');
            }
        })
    }
}

module.exports = NodeMailer
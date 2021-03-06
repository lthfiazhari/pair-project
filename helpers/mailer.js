const nodemailer = require('nodemailer')
require('dotenv').config()

class NodeMailer {
    constructor(email) {
        this.to = email
    }

    mailer() {
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
            subject: 'Registration success',
            text: `Congratulations, your registration was successful. Welcome to the club`
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
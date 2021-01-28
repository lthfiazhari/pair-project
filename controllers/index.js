const { User, Sequelize } = require('../models');
const {checkPass} = require('../helpers/bcrypt')
const NodeMailer = require('../helpers/mailer')
class Controller {
  static main (req, res) {
    console.log(`URL: ${req.originalUrl}`);
    res.render('index', { error: req.params.alerte, success: req.params.alerts });
  };

  static login (req, res) {
    User.findOne({
      where: { 
        email: req.body.email,
      }
    })
      .then(data => {
        if (!data) {
          res.send(`invalid username or password`) 
        } else {
          if (checkPass(req.body.password, data.password)) {
            req.session.userId = data.id
            res.redirect(`/home/${data.id}?alerts=Selamat datang ${data.username}`) //< check password hashing
          } else {
            res.send(`invalid username or password`) 
          }
        }
      })
      .catch(err => {
        console.log(err);
        const msg = [];
        
        if (err.errors && err.errors.length) {
          err.errors.forEach(el => {
            msg.push(el.message)
          });
        } else {
          msg.push(err.message)
        }

        res.redirect(`/?alerte=${msg}`)
      })
  };

  static register (req, res) {
    let alerts = [];
    let email = req.body.email
    User.findAll()
      .then(data => {
        data.forEach(el => {
          if (el.username == req.body.username) alerts.push('Username sudah digunakan');
          else if (el.email == req.body.email) alerts.push('Email sudah terdaftar');
        })

        if (!alerts.length) {
          console.log(req.body)
          alerts.push('Berhasil membuat akun, silahkan login');
          return User.create(req.body);
        } else {
          return null;
        }
      })
      .then((data) => {
        if (!data) {
          res.redirect(`/?alerts=${alerts.join('&')}`)
        } else {
          let sendMail = new NodeMailer(email.trim())
          sendMail.mailer()
          res.send('sila cek mail')
        }
        
      })
      .catch(err => {
        const msg = [];
        
        if (err.errors.length) {
          err.errors.forEach(el => {
            msg.push(el.message)
          });
        }
        
        res.redirect(`/?alerte=${msg}`)
      })
  };
};

module.exports = { Controller };
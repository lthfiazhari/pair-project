const { User } = require('../models');
const { checkPass } = require('../helpers/bcrypt')
const NodeMailer = require('../helpers/mailer')

class Controller {
  static main (req, res) {
    console.log(`URL: ${req.originalUrl}`);
    res.render('index', { title: 'Chat-App', error: req.query.alerte, success: req.query.alerts });
  };

  static login (req, res) {
    User.findAll({ where: { 
      email: req.body.email
    }})
      .then(data => {
        if (!data) res.redirect('/?alrete=invalid username or password');
        else {
          if (checkPass(req.body.password, data.password)) {
            req.session.userId = data.id;
            res.redirect(`/client/${data.id}?alerts=Selamat datang ${data.username}`);
          } else res.redirect('/?alrete=invalid username or password');
        }

        if (data.role == 'user') res.redirect(`/client/${data.id}?alerts=Selamat datang ${data.username}`)
        else res.redirect(`/admin/${data.id}?lerts=Selamat datang ${data.username}`)
      })
      .catch(err => {
        const msg = [];
        
        if (err.errors.length && err.errors.length) {
          err.errors.forEach(el => {
            msg.push(el.message)
          });
        } else msg.push(err.message)
        
        res.redirect(`/?alerte=${msg}`)
      })
  };

  static register (req, res) {
    let alerts = [];
    User.findAll()
      .then(data => {
        data.forEach(el => {
          if (el.username == req.body.username) alerts.push('Username sudah digunakan');
          else if (el.email == req.body.email) alerts.push('Email sudah terdaftar');
        })

        if (!alerts.length) {
          alerts.push('Berhasil membuat akun, silahkan login');
          return User.create(req.body);
        } else return null;
      })
      .then((data) => {
        if (!data) res.redirect(`/?alerts=${alerts.join('&')}`);
        else {
          let sendMail = new NodeMailer(email.trim())
          sendMail.mailer()

          res.redirect('/?alerts=Silahkan Cek Email')
        }
      })
      .catch(err => {
        const msg = [];
        
        if (err.errors && err.errors.length) {
          err.errors.forEach(el => {
            msg.push(el.message)
          });
        } else msg.push(err.message);
        
        res.redirect(`/?alerte=${msg}`);
      })
  };
};

module.exports = { Controller };
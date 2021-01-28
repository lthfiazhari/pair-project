const { User } = require('../models');

class Controller {
  static main (req, res) {
    console.log(`URL: ${req.originalUrl}`);
    res.render('index', { error: req.params.alerte, success: req.params.alerts });
  };

  static login (req, res) {
    User.findAll({ where: { 
      email: req.body.email,
      password: req.body.password
    }})
      .then(data => {
        if (data.role == 'user') res.redirect(`/client/${data.id}?alerts=Selamat datang ${data.username}`)
        else res.redirect(`/admin/${data.id}?lerts=Selamat datang ${data.username}`)
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
        } else return '';
      })
      .then(() => res.redirect(`/?alerts=${alerts}`))
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
const { User } = require('../models');

class User_Control {
  static main (req, res) {
    console.log(`URL: ${req.originalUrl}`);
    User.findByPk(req.params.id)
      .then(data => res.render('client/v_main', { error: req.params.alerte, success: req.params.alerts, data }))
      .catch(err => res.redirect(`/?alerte=${err}`))
  };

  static profile (req, res) {
    console.log(`URL: ${req.originalUrl}`);
    User.findByPk(req.params.id)
      .then(data => res.render('client/v_profile', { error: req.params.alerte, success: req.params.alerts, data }))
      .catch(err => res.redirect(`/?alerte=${err}`))
  };

  static edit_get (req, res) {
    console.log(`URL: ${req.originalUrl}`);
    User.findByPk(req.params.id)
      .then(data => res.render('client/v_edit', { error: req.params.alerte, success: req.params.alerts, data }))
      .catch(err => res.redirect(`/?alerte=${err}`))
  }

  static edit_post (req, res) {
    const id = req.params.id
    User.update(req.body, { where: { id } })
      .then(res.redirect(`/home/profile/${id}`))
      .catch(err => {
        const msg = [];
        
        if (err.errors.length) {
          err.errors.forEach(el => {
            msg.push(el.message);
          });
        }

        res.redirect(`/home/edit/${id}?alerte=${msg}`);
      })
  };

  static chat (req, res) {

  };
};

module.exports = { User_Control };

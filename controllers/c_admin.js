const { User } = require('../models');

class Admin_Control {
  static main (req, res) {
    console.log(`URL: ${req.originalUrl}`);
    User.findByPk(req.params.id)
      .then(data => res.render('admin/v_main', { error: req.params.alerte, success: req.params.alerts, data }))
      .catch(err => res.redirect(`/?alerte=${err}`))
  };

  static edit_client_get (req, res) {
    console.log(`URL: ${req.originalUrl}`);
  };

  static edit_client_post (req, res) {

  };

  static create_admin_get (req, res) {
    console.log(`URL: ${req.originalUrl}`);
  };

  static create_admin_post (req, res) {

  };

  static edit_admin_get (req, res) {
    console.log(`URL: ${req.originalUrl}`);
  };

  static edit_admin_post (req, res) {

  };

  static create_room_get (req, res) {
    console.log(`URL: ${req.originalUrl}`);
  }

  static create_room_post (req, res) {

  };

  static main_room (req, res) {
    console.log(`URL: ${req.originalUrl}`);
  };

  static edit_room_get (req, res) {
    console.log(`URL: ${req.originalUrl}`);
  };

  static edit_room_post (req, res) {

  };
};

module.exports = { Admin_Control };
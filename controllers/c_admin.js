const { Room } = require('../models');

class Admin_Control {
  static create_room_get (req, res) {
    console.log(`URL: ${req.originalUrl}`);
    const data = {
      id: req.params.id,
      role: 'admin'
    }
    res.render('client/v_add', { title: 'Create', error: req.query.alerte, success: req.query.alerts, data })
  }

  static create_room_post (req, res) {
    Room.create(req.body)
      .then(() => res.redirect(`/admin/${req.params.id}?alerts=Berhasil membuat Room ${req.body.name}`))
      .catch(err => {
        const msg = [];
        
        if (err.errors.length) {
          err.errors.forEach(el => {
            msg.push(el.message);
          });
        }

        res.redirect(`/admin/${req.params.id}/add?alerte=${msg}`);
      })
  };
};

module.exports = { Admin_Control };
const { User, Room, ChatRoom } = require('../models');

class User_Control {
  static main (req, res) {
    console.log(`URL: ${req.originalUrl}`);
    let data;

    User.findByPk(req.params.id, { include: [ Room ] })
      .then(res => {
        data = res;
        
        return Room.findAll({ include: [ User ] })
      })
      .then(result => {
        data.username = data.capital(data.username)//<= instance method di model User
        res.render('client/v_main', { error: req.params.alerte, success: req.params.alerts, data, result })
      })
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
      .then(res.redirect(`/client/profile/${id}`))
      .catch(err => {
        const msg = [];
        
        if (err.errors.length) {
          err.errors.forEach(el => {
            msg.push(el.message);
          });
        }

        res.redirect(`/client/edit/${id}?alerte=${msg}`);
      })
  };

  static update_room (req, res) {
    const obj = {
      user_id: +req.params.idu,
      room_id: +req.params.idr
    }
    console.log(obj);
    ChatRoom.create(obj)
      .then(() => res.redirect(`/client/${req.params.idu}?alerts=Berhasil registrasi room`))
      .catch(err => res.redirect(`/client/${req.params.idu}?alerts=${err}`))
  };

  static chat (req, res) {
    res.redirect('client/chat')
  };

  static logout (req, res) {
    req.session.destroy((err) => {
      if(err) res.render("error", {err})
      else res.redirect("/")
    })
  }
};

module.exports = { User_Control };

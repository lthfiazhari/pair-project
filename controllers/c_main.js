const { Room } = require('../models');

class Main {
  static main (req, res) {
    console.log(`URL: ${req.originalUrl}`);
    Room.findAll()
      .then(data => res.render(`client/${req.params.id}/v_chat`, { data }))
      .catch(err => res.redirect(`/?alerte=${err}`))
  };
};

module.exports = { Main };
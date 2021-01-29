const { User } = require('../models');

class Main {
  static main (req, res) {
    console.log(`URL: ${req.originalUrl}`);
    User.findAll({ where: { username: req.query.username }})
      .then(data => {
        const obj = data[0];

        res.render(`client/v_chat`, { title: `Chat Zone`, error: req.query.alerte, success: req.query.alerts, data: obj })
      })
      .catch(err => res.redirect(`/?alerte=${err}`))
  };
};

module.exports = { Main };
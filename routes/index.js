const router = require('express').Router();
const client = require('./r_client');
const admin = require('./r_admin');
const main = require('./r_main');
const { Controller } = require('../controllers');

const checkLogin = function (req, res, next) {
  console.log(req.session.userId);

  if(req.session.userId) next();
  else res.redirect("/")
}

router.get('/', Controller.main);
router.post('/login', Controller.login);
router.post('/register', Controller.register);

router.use('/client', client);
router.use('/admin', admin);
router.use('/chat', main);

module.exports = router;
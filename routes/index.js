const router = require('express').Router();
const client = require('./r_client');
const { Controller } = require('../controllers');

router.get('/', Controller.main);
router.post('/login', Controller.login)
router.post('/register', Controller.register);

router.use('/home', client)

module.exports = router;
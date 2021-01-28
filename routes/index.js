const router = require('express').Router();
const client = require('./r_client');
const { Controller } = require('../controllers');


//==== session index, sebelum dia masuk ke home client=====
const checkLogin = function(req, res, next) {
    if (req.session.userId) {
        next()
    } else {
        res.redirect('/')
    }
}

router.get('/', Controller.main);
router.post('/login', Controller.login)
router.post('/register', Controller.register);


router.use(checkLogin)//< middleware session
router.use('/home', client)

module.exports = router;
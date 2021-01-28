const router = require('express').Router();
const { User_Control } = require('../controllers/c_user');

router.get('/:id', User_Control.main);

router.get('/profile/:id', User_Control.profile);

router.get('/edit/:id', User_Control.edit_get);
router.post('/edit/:id', User_Control.edit_post);

// add User_Control.chat
router.get('/chat',);

module.exports = router;
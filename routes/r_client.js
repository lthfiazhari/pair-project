const router = require('express').Router();
const { User_Control } = require('../controllers/c_user');
const { Main } = require('../controllers/c_main');

router.get('/:id', User_Control.main);
router.get('/:idu/register/:idr', User_Control.update_room);

router.get('/profile/:id', User_Control.profile);

router.get('/edit/:id', User_Control.edit_get);
router.post('/edit/:id', User_Control.edit_post);

router.get('/:id/room', Main.main);

router.get('/logout', User_Control.logout);

module.exports = router;
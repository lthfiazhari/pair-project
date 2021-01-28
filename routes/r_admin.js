const router = require('express').Router();
const { Admin_Control } = require('../controllers/c_admin');

router.get('/:id', Admin_Control.main);

router.get('/client/:id', Admin_Control.edit_client_get);
router.post('/client/:id', Admin_Control.edit_client_post);

router.get('/create', Admin_Control.create_admin_get);
router.post('/create', Admin_Control.create_admin_post);

router.get('/edit/:id', Admin_Control.edit_admin_get);
router.post('/edit/:id', Admin_Control.edit_admin_post);

router.get('/room', Admin_Control.main_room);

router.get('/room/add', Admin_Control.create_room_get);
router.post('/room/add', Admin_Control.create_room_post);

router.get('/room/edit/:id', Admin_Control.edit_room_get);
router.get('/room/edit/:id', Admin_Control.edit_room_post);

module.exports = router;
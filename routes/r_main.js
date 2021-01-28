const router = require('express').Router();
const { Main } = require('../controllers/c_main')

router.get('/', Main.main);

module.exports = router;
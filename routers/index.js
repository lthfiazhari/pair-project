const router = require('express').Router()
const usersRouter = require('./userRouter')
const roomsRouter = require('./roomRouter')
const userController = require('../controllers/userController')


router.get('/', userController.getLogin)
router.post('/', userController.postLogin)

router.use('/users', usersRouter)
router.use('/rooms', roomsRouter)


module.exports = router
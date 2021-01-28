const {Room, User} = require('../models')

class UserController {
    static getLogin(req, res) {
        res.render('homeLogin')
    }

    static postLogin(req, res) {
        console.log('postLogin');
    }

}

module.exports = UserController
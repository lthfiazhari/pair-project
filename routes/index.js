const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const checkLogin = function (req,res,next) {
    if(req.session.userId) {
      next();
    } else {
      res.redirect("/")
    }
  }

const router = require('express').Router();
const client = require('./r_client');
const admin = require('./r_admin');
const main = require('./r_main');
const { Controller } = require('../controllers');

router.get('/', Controller.main);
router.post('/login', Controller.login);
router.post('/register', Controller.register);

router.use(checkLogin)//< middleware session

router.use('/client', client);
router.use('/admin', admin);
router.use('/chat', main);



module.exports = router;
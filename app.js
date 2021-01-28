const express = require('express');
const router = require('./routes');

const app = express();
const port = 3000;
// const port = process.env.PORT || 4000
const http = require('http').Server(app)
const io = require('socket.io')(http);
const session = require("express-session")

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended : true }));

io.on('connection', (socket) => {
    console.log(`NEW CONNECTION ...`);
    socket.emit('message', 'Welcome');
    socket.broadcast.emit('message', 'A user joined the chat');

    socket.on('disconnect', () => { 
        console.log(`USER DISCONNECTED ...`); 
        io.emit('message', 'A user left the chat')
    })

    socket.on('chat_message', (message) => {
        io.emit('message', message);
    })
})

//=====sesssion di app=============

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }))

app.use(express.static(__dirname + '/public'))
app.use(router);

http.listen(port, () => { console.log(`LISTENING TO : ${port}`); })
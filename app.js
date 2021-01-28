const socketio = require('socket.io');
const express = require('express');
const path = require('path');
const http = require('http');
const router = require('./routes');
const { Helper } = require('./helpers')

const app = express();
const server = http.createServer(app);
const io = socketio(server)
const port = 3000;
const bot = 'ALEXA';

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended : true }));
// mengambil data javascript dan css didalam folder public
app.use(express.static(path.join(__dirname, 'public')))

// mengambil connection io (socket(server)) ke dalam ejs yang ada socket.io/socket.io.js (ada didalam main.ejs)
io.on('connection', socket => {
  // memberikan log ke console apabila ada yang connect
  console.log('NEW CONNECTION ...');
  
  // apabila ada connection akan melempar default message 'Welcome' ke console client
  socket.emit('message', Helper.format_message(bot, 'Welcome'));

  // melempar message 'A user has joined the chat' ke client yang sudah connect terlebih dahulu
  socket.broadcast.emit('message', Helper.format_message(bot, 'A user has joined the chat'));

  // saat ada yang disconnect
  socket.on('disconnect', () => {
    // melempar message 'A user has left the chat' ke client yang masih connect
    io.emit('message', Helper.format_message(bot, 'A user has left the chat'));
  });

  // mendapatkan data msg dari ejs
  socket.on('chatMessage', (msg) => {
    // melempar massage data ke client
    io.emit('message', Helper.format_message('USER', msg));
  });
})

// io.on('connection', (socket) => {
//     console.log(`NEW CONNECTION ...`);
//     socket.emit('message', 'Welcome');
//     socket.broadcast.emit('message', 'A user joined the chat');

//     socket.on('disconnect', () => { 
//         console.log(`USER DISCONNECTED ...`); 
//         io.emit('message', 'A user left the chat')
//     })

//     socket.on('chat_message', (message) => {
//         io.emit('message', message);
//     })
// })
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.use(router);

server.listen(port, () => { console.log(`LISTENING TO : ${port}`); })

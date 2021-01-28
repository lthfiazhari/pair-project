const socketio = require('socket.io');
const express = require('express');
const path = require('path');
const http = require('http');
const router = require('./routes');
const { format_message, user_join, user_get, user_leave, user_room } = require('./helpers')

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

  // membatasi bot chat hanya saat ada client yang connect
  socket.on('join_room', ({ username, room }) => {
    // mengambil user melalui helper
    const user = user_join(socket.id, username, room);
    
    socket.join(user.room)

    // apabila ada connection akan melempar default message 'Welcome' ke console client
    socket.emit('message', format_message(bot, 'Welcome'));
  
    // melempar message 'A user has joined the chat' ke client yang sudah connect terlebih dahulu
    socket.broadcast.to(user.room).emit('message', format_message(bot, `${user.username} has joined the chat`));

    // melemparkan user dan informasi room
    io.to(user.room).emit('room_users', {
      room: user.room,
      users: user_room(user.room)
    });
  });
  
  // mendapatkan data msg dari ejs
  socket.on('chatMessage', (msg) => {
    // mengambil user melalui helper
    const user = user_get(socket.id);

    // melempar massage data ke client
    io.to(user.room).emit('message', format_message(user.username, msg));
  });

  // saat ada yang disconnect
  socket.on('disconnect', () => {
    const user = user_leave(socket.id);

    if (user) {
      // melempar message 'A user has left the chat' ke client yang masih connect
      io.to(user.room).emit('message', format_message(bot, `${user.username} has left the chat`));

      // melemparkan user dan informasi room
      io.to(user.room).emit('room_users', {
        room: user.room,
        users: user_room(user.room)
      });
    }
  });

  
})

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(router);

server.listen(port, () => { console.log(`LISTENING TO : ${port}`); })
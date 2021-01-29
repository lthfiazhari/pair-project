const socket = io();
const chat_form = document.getElementById('chat_form');
const chat_message = document.querySelector('.chat-message');
const room_name = document.getElementById('room-name');
const user_list = document.getElementById('users');

// mengambil username dan room dari req.params
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
})

// add data to client room
socket.emit('join_room', { username, room })

// mendapatkan room dan user dari server
socket.on('room_user', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
})

// melempar js ke ejs (karena di ejs hanya memanggil script server.js)
socket.on('message', message => {
  // mandapatkan message dari server
  outputMessage(message);

  // scroll down tiap dapat message (diambil dari css .chat-message)
  chat_message.scrollTop = chat_message.scrollHeight;
});

// id form di main.ejs 
chat_form.addEventListener('submit', (e) => {
  // membuat form tidak berjalan seperti defaultnya
  e.preventDefault();

  // mengambil value input dengan id msg
  let msg = e.target.elements.msg.value;

  msg = msg.trim();
  
  if (!msg){
    return false;
  }

  // mengirim value input ke server
  socket.emit('chatMessage', msg)

  // clear input setiap send message
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
})

// mengambil data message dari server
function outputMessage (message) {
  // membuat div baru tiap message
  const div = document.createElement('div');

  // menambahkan div dengan id chat-message
  div.classList.add('chat-message');

  // mengisi div dengan data message tiap di lempar ke client
  div.innerHTML = `<p>${message.username}<span>${message.time}</span></p>
  <p class='text'>${message.text}</p>`;

  // melempar div yang dibuat kedalam div penampung di client
  document.querySelector('.chat-main').appendChild(div);
}

// menambahkan nama room di dalam client ejs
function outputRoomName (room) {
  room_name.innerText = room;
};

// menambahkan nama user yang ada didalam room chat client ejs
function outputUsers (users) {
  // user_list.innerHTML = `${users.map(user => `<li>${user.username}</li>`).join('')}`;

  user_list.innerHTML = '';
  users.forEach(user => {
    const li = document.createElement('li');
    li.innerText = user.username;
    user_list.appendChild(li);
  });
};
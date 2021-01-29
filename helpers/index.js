const moment = require('moment');

const users = [];

function format_message (username, text) {
  return {
    username,
    text,
    time: moment().format('h:mm a')
  }
};

function user_join (id, username, room) {
  const user = { id, username, room };

  users.push(user);

  return user;
}

function user_get (id) {
  return users.find(user => user.id == id)
};

function user_leave (id) {
  const index = users.findIndex(user => user.id == id);

  if (index !== -1) return users.splice(index, 1)[0];
}

function user_room (room) {
  console.log(users, 'BIRBIBRIBERBE');
  return users.filter(user => user.room == room);
}

module.exports = { 
  format_message, 
  user_join,
  user_get,
  user_leave,
  user_room
};
const socket = io();
const chat_form = document.getElementById('form')

socket.on('message', message => {
  console.log(message);
  outputMessage(message);
});

chat_form.addEventListener('submit', (event) => {
  event.preventDefault();

  const message = event.target.elements.input.value;
  socket.emit('chat_message', message)
})

function outputMessage (message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class='text'>${message}</p>`;

  document.querySelector('.chat-message').appendChild(div);
}
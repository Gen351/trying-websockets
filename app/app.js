const socket = io('ws://localhost:8080');

socket.on('message', text => {

    const messageElement = document.createElement('li');
    messageElement.innerHTML = text;

    document.querySelector('#msg-preview-ul').appendChild(messageElement);
});

document.querySelector('#send-btn').addEventListener('click', () => {

    const text = document.querySelector('#msg-input').ariaValueMax;
    socket.emit('message', text);

});
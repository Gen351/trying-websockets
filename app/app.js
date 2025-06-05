const socket = io('http://localhost:8080');

socket.on('message', data => {
    console.log('Received data:', data); // Add this line for debugging
    
    const messageElement = document.createElement('li');
    
    // Check if this is our own message
    if (data.isOwnMessage) {
        messageElement.classList.add('sent-message');
        messageElement.innerHTML = `${data.text}`;
    } else {
        messageElement.classList.add('received-message');
        messageElement.innerHTML = `${data.senderId}: ${data.text}`;
    }
    
    document.querySelector('#msg-preview-ul').appendChild(messageElement);

    // Auto-scroll to bottom after adding message
    const msgPrev = document.querySelector('.msg-preview');
    msgPrev.scrollTop = msgPrev.scrollHeight;
});



function send(text) {
    if(text == '') return;

    socket.emit('message', text);

    document.querySelector('#msg-input').value = '';
}

document.querySelector('.send-btn').addEventListener('click', () => {
    const text = document.querySelector('#msg-input').value;
    send(text);
});

document.querySelector('#msg-input').addEventListener('keypress', (e) =>{
    if(e.key === 'Enter') {
        const text = document.querySelector('#msg-input').value;
        send(text);
    }
});
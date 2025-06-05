const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: { origin: "*" }
});

// Serve static files from the app directory
app.use(express.static(path.join(__dirname, '../app')));

io.on('connection', (socket) => {
    console.log('A user connected.');

    socket.on('message', (message) => {
        console.log(message);
        io.emit('message', `${socket.id.substr(0,2)}: ${message}`);
    });
});

server.listen(8080, () => console.log('listening on http://localhost:8080'));
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS for all routes

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000', // Allow requests from React app
        methods: ['GET', 'POST'], // Allow these HTTP methods
    },
});

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.emit('message', 'Welcome to the socket server!');

    socket.on('sendData', (data) => {
        console.log('Received data from client:', data);
        socket.broadcast.emit('broadcastData', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

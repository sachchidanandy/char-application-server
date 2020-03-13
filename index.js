/**
 * Root module of server
 * 
 * @file index.js
 * @author SachchidanandY
*/

// Dependency
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const { PORT } = require('./utils/config');
const { addUser, getUser } = require('./utils/users');

// Initialize express
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// create a on connect io listener
io.on('connection', (socket) => {

    // Add Join listener
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });
        if (error) return callback(error);

        // Send message to user by admin
        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` });

        // Broadcast acknowledge message to other users of room
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined!` });

        // Add user to the room
        socket.join(user.room);

        callback();
    });

    // Add sendMessage listener
    socket.on('sendMessage', (message, callback) => {
        const { error, user } = getUser(socket.id);

        if (error) return callback(error);

        // broadcast message in room
        socket.broadcast.to(user.room).emit('message', { user: `${user.name}`, text: message});
        callback();
    });

    // Add event on disconnection
    socket.on('disconnect', () => {
        console.log('Use left chat');
    });
});

// Add server listener
server.listen(PORT, () => {
    console.log(`Server is listening at port : ${PORT}`);
})

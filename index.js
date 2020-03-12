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

const { PORT } = require('./config');

// Initialize express
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// create a on connect io listener
io.on('connection', (socket) => {
    console.log(`New user being connected with socket-id : ${socket.id}`);

    // Add event on disconnection
    socket.on('disconnect', () => {
        console.log('Use left chat');
    });
});

// Add server listener
server.listen(PORT, () => {
    console.log(`Server is listening at port : ${PORT}`);
})

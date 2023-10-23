import express from 'express';
import http from 'http';
import { Server as SocketServer } from 'socket.io'


const app = express();
const server = http.createServer(app);

const io = new SocketServer(server);

io.on('connection', socket => {
    console.log(`User connected ${socket.id}`);

    socket.on('message', (body) => {
        socket.broadcast.emit('chat', {
            body,
            from: socket.id.slice(6)
        });
    })


})

server.listen(8080, () => console.log('Listening on port 8080'));




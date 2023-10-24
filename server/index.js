import express from 'express';
import http from 'http';
import { Server as SocketServer } from 'socket.io'
import chatRouter from './routes/chatRouter.js';
import mongoose from 'mongoose';
import cors from 'cors';
import usersRouter from './routes/usersRouter.js';

const app = express();
const server = http.createServer(app);

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

mongoose.connect('mongodb+srv://sebaactis:Carp1910@chat-ws-cluster.vcheogo.mongodb.net/ChatWS')

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

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/chats', chatRouter);
app.use('/api/users', usersRouter);


server.listen(8080, () => console.log('Listening on port 8080'));






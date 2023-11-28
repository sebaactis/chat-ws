import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import http from 'http';
import { Server as SocketServer } from 'socket.io'
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';

import chatRouter from './routes/chatRouter.js';
import usersRouter from './routes/usersRouter.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
const server = http.createServer(app);

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

mongoose.connect('mongodb+srv://sebaactis:Carp1910@chat-ws-cluster.vcheogo.mongodb.net/ChatWS')

app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://sebaactis:Carp1910@chat-ws-cluster.vcheogo.mongodb.net/ChatWS',
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 900
    })
    ,
    secret: 'secretWS',
    resave: true,
    saveUninitialized: false
}))

const io = new SocketServer(server);

io.on('connection', socket => {

    socket.on('message', (body) => {

        console.log(body);
        socket.broadcast.emit('chat', {
            body: body.body,
            from: body.from
        });
    })
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

app.use('/api/chats', chatRouter);
app.use('/api/users', usersRouter);

app.use(errorHandler);

server.listen(8080, () => console.log('Listening on port 8080'));






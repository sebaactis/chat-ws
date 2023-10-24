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

const app = express();
const server = http.createServer(app);

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

mongoose.connect(process.env.MONGO_DB_URL)

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

app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_DB_URL,
        mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
        ttl: 15
    })
    ,
    secret: 'secretWS',
    resave: true,
    saveUninitialized: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

app.use('/api/chats', chatRouter);
app.use('/api/users', usersRouter);

server.listen(8080, () => console.log('Listening on port 8080'));






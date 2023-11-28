/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef, useState } from "react";
import { TokenContext } from "../context/tokenContext";
import { io } from 'socket.io-client'
import useSwal from './useSwal';

const useChat = () => {

    const { swal } = useSwal();
    const socket = io('/');
    let token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    const { setAccessToken } = useContext(TokenContext);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const messageListRef = useRef(null);

    const closeSession = async () => {
        try {
            await fetch('http://localhost:8080/api/users/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
            });

            swal('Session cerrada', 'success', '#0e8c3c', '#0e8c3c', 2000, true);

            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setAccessToken(false);
        } catch (error) {
            console.error('Error closing session:', error);
        }
    };

    const handleRemove = async () => {
        await fetch('http://localhost:8080/api/chats', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
        })

        setMessages([])

        swal('Chats eliminados', 'success', '#0e8c3c', '#0e8c3c', 2000, true)
    }

    const obtenerMensajes = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/chats', {
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
            })
            const data = await response.json();
            console.log("mensajes")
            setMessages(data.payload)
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = (e) => {

        e.preventDefault();

        const newMessage = {
            body: message,
            from: user,
            use: 'messageItem'
        }

        fetch('http://localhost:8080/api/chats', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify(newMessage)
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))


        socket.emit('message', newMessage);

        setMessage('');

        setTimeout(() => {
            if (messageListRef.current) {
                messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
            }
        }, 200)
    }

    const receiveMessages = (messageObj) => {
        setMessages((state) => [...state, messageObj]);
    }

    useEffect(() => {
        obtenerMensajes()
    }, [])

    useEffect(() => {
        socket.on('chat', mensaje => receiveMessages(mensaje));
    }, [])

    useEffect(() => {
        const checkToken = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/users/refreshToken', {
                    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                    method: 'POST'
                })
                const data = await response.json();

                if (data.check) {
                    token = localStorage.setItem('token', data.token);
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        checkToken();
    }, [token])

    // eslint-disable-next-line react-hooks/exhaustive-deps

    return { closeSession, handleRemove, messages, setMessages, obtenerMensajes, receiveMessages, handleSubmit, message, setMessage, messageListRef };
}

export default useChat;
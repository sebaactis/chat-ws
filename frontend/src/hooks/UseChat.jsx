import { useContext, useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { TokenContext } from "../context/tokenContext";
import { io } from 'socket.io-client'

const UseChat = () => {

    const socket = io('/');
    const token = localStorage.getItem('token');
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

            Swal.fire({
                title: 'Sesion cerrada',
                icon: 'success',
                iconColor: '#0e8c3c',
                confirmButtonColor: '#0e8c3c',
                timer: 2000,
                timerProgressBar: true
            });

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

        Swal.fire({
            title: 'Chats eliminados',
            icon: 'success',
            iconColor: '#0e8c3c',
            confirmButtonColor: '#0e8c3c',
            timer: 2000,
            timerProgressBar: true
        })
    }

    const obtenerMensajes = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/chats', {
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
            })
            const data = await response.json();
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

    // eslint-disable-next-line react-hooks/exhaustive-deps

    return { closeSession, handleRemove, messages, setMessages, obtenerMensajes, receiveMessages, handleSubmit, message, setMessage, messageListRef };
}

export default UseChat;
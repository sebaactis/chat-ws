import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client'

const socket = io('/');

const Chat = () => {

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const messageListRef = useRef(null);

    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user')

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
        receiveMessages(newMessage);

        setMessage('');

        setTimeout(() => {
            if (messageListRef.current) {
                messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
            }
        }, 200)
    }

    const handleRemove = async () => {
        const response = await fetch('http://localhost:8080/api/chats', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
        })

        setMessages([])

        console.log('BORRADO', response);
    }

    useEffect(() => {
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

        obtenerMensajes();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        socket.on('chat', mensaje => receiveMessages(mensaje));
    }, [])


    const receiveMessages = (messageObj) => {
        setMessages((state) => [...state, messageObj]);
    }

    return (
        <main className='h-screen text-white flex flex-col items-center justify-center px-20'>
            <section className="bg-zinc-800 h-5/6 relative w-9/12">
                <ul ref={messageListRef} className="scroll-container overflow-hidden overflow-y-scroll scroll-smooth h-5/6 pb-5 px-2">
                    {messages.map((message, i) => {
                        return (
                            <li className={`my-3 p-2 table text-sm rounded-md ${message.from === user ? 'bg-sky-700 ml-auto' : 'bg-black'}`} key={i}>

                                <span className="block text-xs font-bold pb-1">
                                    {message.from}
                                </span>

                                <span className="text-base mt-3">
                                    {message.body}
                                </span>
                            </li>
                        )
                    })}
                </ul>

                <form className="flex gap-3 mt-10 absolute bottom-0 left-0 right-0 p-6" onSubmit={handleSubmit}>

                    <input className="border-2 border-zync-500 py-2 w-full text-black rounded-md" type='text' onChange={(e) => setMessage(e.target.value)} value={message} />
                    <button className="bg-green-800 p-3 rounded-md font-bold"> Enviar </button>
                </form>

            </section>
            <button onClick={handleRemove} className="bg-red-800 p-3 mt-5 rounded-md font-bold"> Vaciar chats </button>
        </main>
    )
}

export default Chat
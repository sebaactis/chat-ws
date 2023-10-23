import { useEffect, useState, useRef } from 'react';
import './index.css'
import { io } from 'socket.io-client'

const socket = io('/');

function App() {

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messageListRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMessage = {
      body: message,
      from: 'Me'
    }

    socket.emit('message', message);
    receiveMessages(newMessage);

    setMessage('');

    setTimeout(() => {
      if (messageListRef.current) {
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
      }
    }, 200)


  }

  useEffect(() => {
    socket.on('chat', mensaje => receiveMessages(mensaje));
  }, [])

  const receiveMessages = (messageObj) => {
    console.log(messageObj)

    setMessages((state) => [...state, messageObj]);
  }

  return (
    <main className='h-screen text-white flex flex-col items-center justify-center px-20'>
      <section className="bg-zinc-800 h-5/6 relative w-4/12">
        <ul ref={messageListRef} className="scroll-container overflow-hidden overflow-y-scroll scroll-smooth h-5/6 pb-5 px-2">
          {messages.map((message, i) => {
            return (
              <li className={`my-3 p-2 table text-sm rounded-md ${message.from === 'Me' ? 'bg-sky-700 ml-auto' : 'bg-black'}`} key={i}>

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
    </main>
  )
}

export default App
import { AiOutlineSend } from "react-icons/ai";
import useChat from '../hooks/useChat';

const Chat = () => {
    const user = localStorage.getItem('user');
    const { closeSession, handleRemove, messages, message, setMessage, handleSubmit, messageListRef } = useChat();




    return (
        <main className='h-screen text-white flex flex-col items-center justify-center px-20'>
            <section className="sectionChat h-4/6 relative w-8/12">
                <ul ref={messageListRef} className="scroll-container overflow-hidden overflow-y-scroll scroll-smooth h-5/6 pb-5 px-2">

                    {messages.map((message, i) => {
                        return (
                            <li className={`my-3 p-2 table text-sm rounded-md ${message.from === user ? 'bg-teal-800 ml-auto' : 'bg-neutral-500'}`} key={i}>

                                <span className="block font-bold pb-1">
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

                    <input className="inputChat" type='text' onChange={(e) => setMessage(e.target.value)} value={message} />
                    <button disabled={message === ''} className={message === '' ? 'bg-slate-500 p-3 rounded-full font-bold' : 'bg-green-800 p-3 rounded-full font-bold'}> <AiOutlineSend /> </button>
                </form>

            </section>
            <button onClick={handleRemove} className="bg-indigo-900 transition ease-in-out hover:scale-105 duration-100 hover:bg-indigo-700  p-3 mt-5 rounded-xl font-bold"> Vaciar chats </button>
            <button onClick={closeSession} className="bg-indigo-900 hover:bg-indigo-700 transition ease-in-out hover:scale-105 duration-100 p-3 mt-5 rounded-xl font-bold"> Cerrar Sesion </button>

        </main>
    )
}

export default Chat
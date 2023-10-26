import { useContext, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { TokenContext } from "../context/tokenContext";

const Login = () => {

    const navigate = useNavigate();
    const { setAccessToken } = useContext(TokenContext)

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userObj = {
            username,
            password
        }

        try {
            const response = await fetch('http://localhost:8080/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userObj)
            })

            const responseParse = await response.json();

            if (response.status === 200) {
                localStorage.setItem('token', responseParse.data.token)
                localStorage.setItem('user', responseParse.data.username)
                setAccessToken(true);
                navigate('/')
            } else {
                console.log("ERROR")
            }

        }

        catch (e) {
            console.error(e);

        }
    }



    return (
        <div className="h-screen flex justify-center content-center">
            <form onSubmit={handleSubmit} className="h-3/4 w-4/12 bg-slate-800 rounded-md mt-16 flex flex-col gap-3 justify-center content-center">
                <label className="text-center font-bold text-white text-lg" htmlFor="username"> Usuario </label>
                <input onChange={(e) => setUsername(e.target.value)} value={username} className="h-8 w-56 mx-auto rounded-md" type="text" name="username" />
                <label className="text-center font-bold text-white text-lg" htmlFor="password"> Password </label>
                <input onChange={(e) => setPassword(e.target.value)} value={password} className="h-8 w-56 mx-auto rounded-md" type="text" name="password" />
                <button className="text-white bg-green-800 rounded-md mx-auto h-10 w-40 mt-5 hover:bg-cyan-600 transition-colors"> Ingresar </button>
            </form>
        </div>
    )
}

export default Login
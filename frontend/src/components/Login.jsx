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

            <form onSubmit={handleSubmit} className="formLogin h-2/4 w-3/12 rounded-xl mt-40 flex flex-col gap-2 justify-center content-center">
                <h1 className="text-white mx-auto font-bold text-3xl mb-5"> Login </h1>
                <label className="labelForm" htmlFor="username"> Usuario </label>
                <input onChange={(e) => setUsername(e.target.value)} value={username} className="inputForm" type="text" name="username" />
                <label className="labelForm" htmlFor="password"> Password </label>
                <input onChange={(e) => setPassword(e.target.value)} value={password} className="inputForm" type="text" name="password" />
                <button className="buttonLogin"> Ingresar </button>
                <div className="divRegistrate">
                    <h2>Si no tienes cuenta:
                        <span className="font-bold">
                            <a href="/register"> Regístrate! </a>
                        </span>
                    </h2>
                </div>
            </form>
        </div>
    )
}

export default Login
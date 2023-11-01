import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newUser = {
            username,
            password,
            confPassword
        }

        try {
            const response = await fetch('http://localhost:8080/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser)
            })

            const responseParse = await response.json();

            if (response.status === 201) {
                console.log(responseParse)
                navigate('/login')
            }
        }

        catch (e) {
            console.error(e);

        }
    }

    return (
        <div className="h-screen flex justify-center content-center">

            <form onSubmit={handleSubmit} className="formLogin h-2/4 w-3/12 rounded-xl mt-40 flex flex-col gap-2 justify-center content-center">
                <h1 className="text-white mx-auto font-bold text-3xl mb-5"> Register </h1>
                <label className="labelForm" htmlFor="username"> Usuario </label>
                <input onChange={(e) => setUsername(e.target.value)} value={username} className="inputForm" type="text" name="username" />
                <label className="labelForm" htmlFor="password"> Password </label>
                <input onChange={(e) => setPassword(e.target.value)} value={password} className="inputForm" type="text" name="password" />
                <label className="labelForm" htmlFor="password"> Confirm Password </label>
                <input onChange={(e) => setConfPassword(e.target.value)} value={confPassword} className="inputForm" type="text" name="password" />
                <button className="buttonLogin"> Registrarse </button>
            </form>
        </div>
    )
}

export default Register
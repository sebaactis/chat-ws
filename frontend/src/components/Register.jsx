import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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

                navigate('/login')
            } else if (responseParse.message.includes('duplicate key')) {
                Swal.fire({
                    title: "El usuario ya existe",
                    icon: 'error',
                    iconColor: '#0e8c3c',
                    confirmButtonColor: '#0e8c3c',
                    timer: 2000,
                    timerProgressBar: true
                })
            } else if (responseParse.message.includes('not match')) {
                Swal.fire({
                    title: "Las contraseñas no coinciden",
                    icon: 'error',
                    iconColor: '#0e8c3c',
                    confirmButtonColor: '#0e8c3c',
                    timer: 2000,
                    timerProgressBar: true
                })
            } else {
                Swal.fire({
                    title: "El usuario debe tener menos de 25 caracteres, y las contraseñas mas de 3",
                    icon: 'error',
                    iconColor: '#0e8c3c',
                    confirmButtonColor: '#0e8c3c',
                    timer: 2000,
                    timerProgressBar: true
                })
            }
        }

        catch (e) {
            console.error(e);

        }
    }

    return (
        <div className="h-screen flex justify-center content-center">

            <form onSubmit={handleSubmit} className="formRegister h-5/6 w-4/12 rounded-xl mt-16 flex flex-col gap-2 justify-center content-center">
                <h1 className="text-white mx-auto font-bold text-3xl mb-5"> Register </h1>
                <label className="labelForm" htmlFor="username"> Usuario </label>
                <input onChange={(e) => setUsername(e.target.value)} value={username} className="inputForm" type="text" name="username" />
                <label className="labelForm" htmlFor="password"> Password </label>
                <input onChange={(e) => setPassword(e.target.value)} value={password} className="inputForm" type="text" name="password" />
                <label className="labelForm" htmlFor="password"> Confirm Password </label>
                <input onChange={(e) => setConfPassword(e.target.value)} value={confPassword} className="inputForm" type="text" name="password" />
                <button className="buttonLogin"> Registrarse </button>
                <button className="buttonLogin"> <a href="/login"> Volver atrás </a> </button>
            </form>
        </div>
    )
}

export default Register
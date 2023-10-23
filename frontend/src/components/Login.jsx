import { useState } from "react"

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const userObj = {
            username,
            password
        }

        console.log(userObj);
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
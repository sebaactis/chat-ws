import Chat from './components/Chat'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import { useContext, useEffect } from 'react'
import { TokenContext } from './context/tokenContext'
import Register from './components/Register'


function App() {

  const { accessToken, setAccessToken } = useContext(TokenContext);

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      setAccessToken(true)
    }
  }, [accessToken])


  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={accessToken ? <Chat /> : <Navigate to="/login" />} />
        <Route exact path="/login" element={accessToken ? <Navigate to="/" /> : <Login />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>

    </BrowserRouter>

  )
}

export default App

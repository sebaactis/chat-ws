import Chat from './components/Chat'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import { useContext, useEffect } from 'react'
import { TokenContext } from './context/tokenContext'


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
      </Routes>

    </BrowserRouter>

  )
}

export default App

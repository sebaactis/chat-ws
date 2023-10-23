import Chat from './components/Chat'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Chat />} />
      <Route exact path="/login" element={<Login />} />
    </Routes>
    
    </BrowserRouter>
    
    
  )
}

export default App

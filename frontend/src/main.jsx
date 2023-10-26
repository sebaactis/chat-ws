import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import TokenProvider from './context/tokenContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <TokenProvider>
        <App />
    </TokenProvider>

)

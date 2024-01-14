import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AccountContextProvider } from './context/accountContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <AccountContextProvider>
    <App />
    </AccountContextProvider>,
)

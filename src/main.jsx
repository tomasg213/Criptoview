import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App' // ¡Ojo aquí! Debe apuntar a tu App.jsx

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
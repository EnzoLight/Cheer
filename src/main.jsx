import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css'
import App from './Telas/Home/App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Registro from './Telas/Registre-se/Registro'

// Note que aqui usamos apenas 'createRoot' (sem o ReactDOM antes)
createRoot(document.getElementById('root')).render(
  <StrictMode> 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)

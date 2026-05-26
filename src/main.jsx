import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './Telas/Home/App.jsx'
import Registro from './Telas/Registre-se/Registro'
import Evento from './Telas/Eventos/Evento'
import Perfil from './Telas/Perfil/Perfil'
import Calendario from './Telas/Calendario/Calendario'
import CriarEvento from './Telas/CriarEvento/CriarEvento'
import CadastroInstituicao from './Telas/CadastroInstituicao/CadastroInstituicao'

createRoot(document.getElementById('root')).render(
  <StrictMode> 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/cadastro-instituicao" element={<CadastroInstituicao />} />
        <Route path="/eventos" element={<Evento />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/calendario" element={<Calendario />} /> 
        <Route path="/criar-evento" element={<CriarEvento />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)

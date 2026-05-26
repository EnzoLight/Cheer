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
import AuthProvider from './Contextos/AuthProvider'
import RequireAuth from './Componentes/Auth/RequireAuth'

createRoot(document.getElementById('root')).render(
  <StrictMode> 
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/cadastro-instituicao" element={<CadastroInstituicao />} />
          <Route path="/eventos" element={<Evento />} />
          <Route path="/perfil" element={<RequireAuth><Perfil /></RequireAuth>} />
          <Route path="/calendario" element={<RequireAuth><Calendario /></RequireAuth>} />
          <Route path="/criar-evento" element={<RequireAuth><CriarEvento /></RequireAuth>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)

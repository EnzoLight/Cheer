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
import DashboardInstituicao from './Telas/DashboardInstituicao/DashboardInstituicao'
import LogsOperacionais from './Telas/LogsOperacionais/LogsOperacionais'
import CadastroInstituicao from './Telas/CadastroInstituicao/CadastroInstituicao'
import AuthProvider from './Contextos/AuthProvider'
import RequireAuth from './Componentes/Auth/RequireAuth'
import RequireGuest from './Componentes/Auth/RequireGuest'

createRoot(document.getElementById('root')).render(
  <StrictMode> 
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/registro" element={<RequireGuest><Registro /></RequireGuest>} />
          <Route path="/cadastro-instituicao" element={<RequireGuest><CadastroInstituicao /></RequireGuest>} />
          <Route path="/eventos" element={<RequireAuth><Evento /></RequireAuth>} />
          <Route path="/mapa" element={<Evento />} />  {/* linha nova */}
          <Route path="/perfil" element={<RequireAuth><Perfil /></RequireAuth>} />
          <Route path="/calendario" element={<RequireAuth><Calendario /></RequireAuth>} />
          <Route path="/criar-evento" element={<RequireAuth requiredAccountType="instituicao"><CriarEvento /></RequireAuth>} />
          <Route path="/dashboard" element={<RequireAuth requiredAccountType="instituicao"><DashboardInstituicao /></RequireAuth>} />
          <Route path="/logs" element={<RequireAuth requiredAccountType="instituicao"><LogsOperacionais /></RequireAuth>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)

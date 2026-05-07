import React from 'react';
import "./Calendario.css";
import UserNavbar from '../../Componentes/UserNavbar';
import ModalLogin from '../../Componentes/Modais/ModalLogin'

function Calendario() {
  return (
    <>
      {/*Navbar*/}
      < UserNavbar />

      <div className="container mt-5">
        <h1>Página do Calendário</h1>
        <p>O conteúdo do calendário aparecerá aqui.</p>
      </div>

      {/*Moidais*/}
      <ModalLogin />
    </>
  );
}

export default Calendario;

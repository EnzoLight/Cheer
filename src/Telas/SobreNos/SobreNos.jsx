// SobreNos.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import UserNavbar from '../../Componentes/UserNavbar';
{ /*import './SobreNos.css'; // estilos específicos (opcional, mas pode usar inline) */}
import ModalLogin from '../../Componentes/Modais/ModalLogin'

// Se preferir manter tudo inline, use os estilos abaixo, mas é mais limpo com CSS module.

function SobreNos() {
  return (
    <>
      <UserNavbar />

      {/* Seção hero com gradiente igual ao da home */}
      <div
        className="container-fluid"
        style={{
          background: 'linear-gradient(to bottom, #b2d7e4, #FFFFFF)',
          minHeight: 'auto',
          paddingBottom: '3rem'
        }}
      >
        <div className="container py-5">
          {/* Cabeçalho da página */}
          <div className="row justify-content-center mb-5">
            <div
              className="col-11 col-md-10 col-lg-9 text-center"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                borderRadius: '28px',
                padding: '3rem 1.5rem',
                boxShadow: '0 8px 20px rgba(0,0,0,0.05)'
              }}
            >
              <h1
                style={{
                  fontFamily: 'var(--font-brand), "Mogra", cursive',
                  fontSize: 'calc(2rem + 1.5vw)',
                  color: 'var(--color-primary)',
                  fontWeight: 'bold'
                }}
              >
                Sobre o CHEER
              </h1>
              <p
                style={{
                  fontSize: '1.2rem',
                  maxWidth: '700px',
                  margin: '1rem auto 0',
                  color: '#2c3e50'
                }}
              >
                Uma ponte entre quem quer ajudar e quem está na linha de frente da transformação social.
                Conectamos ONGs, voluntários e empresas em um ecossistema de colaboração, transparência e impacto real.
              </p>
            </div>
          </div>

          {/* Missão, Visão e Valores */}
          <div className="row g-4 mb-5">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm rounded-4 p-4 text-center">
                <i className="fas fa-bullseye" style={{ fontSize: '2.2rem', color: '#FF8C00' }}></i>
                <h3 className="mt-3 fw-semibold">Missão</h3>
                <p className="text-muted">
                  Conectar pessoas e organizações sociais através da tecnologia, ampliando o impacto de projetos beneficentes
                  e fortalecendo a cultura do voluntariado.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm rounded-4 p-4 text-center">
                <i className="fas fa-globe-americas" style={{ fontSize: '2.2rem', color: '#FF8C00' }}></i>
                <h3 className="mt-3 fw-semibold">Visão</h3>
                <p className="text-muted">
                  Criar um ecossistema digital seguro que conecta ONGs, voluntários e empresas, facilitando ações beneficentes,
                  captação de doações e engajamento comunitário com total transparência.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm rounded-4 p-4 text-center">
                <i className="fas fa-hand-sparkles" style={{ fontSize: '2.2rem', color: '#FF8C00' }}></i>
                <h3 className="mt-3 fw-semibold">Valores</h3>
                <p className="text-muted">
                  Colaboração, confiança, melhoria contínua, avaliação mútua e impacto social. Cada ação gera reputação e novas oportunidades.
                </p>
              </div>
            </div>
          </div>

          {/* Para cada agente: ONGs, Voluntários, Empresas */}
          <h2 className="text-center fw-bold mb-4" style={{ color: '#1F3E3A' }}>
            Uma plataforma para cada perfil
          </h2>
          <div className="row g-4 mb-5">
            <div className="col-lg-4">
              <div className="card h-100 border-0 rounded-4 p-3" style={{ backgroundColor: '#fff9ef' }}>
                <div className="card-body">
                  <i className="fas fa-tree" style={{ fontSize: '2rem', color: '#FF8C00' }}></i>
                  <h4 className="fw-semibold mt-2">ONGs / Instituições</h4>
                  <ul className="list-unstyled mt-3">
                    <li><i className="fas fa-check-circle text-success me-2"></i> Criar eventos (arrecadação ou força de trabalho)</li>
                    <li><i className="fas fa-check-circle text-success me-2"></i> Gerenciar voluntários e candidaturas</li>
                    <li><i className="fas fa-check-circle text-success me-2"></i> Avaliar voluntários e consultar reputação</li>
                    <li><i className="fas fa-check-circle text-success me-2"></i> Feed de projetos para atrair patrocínios</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card h-100 border-0 rounded-4 p-3" style={{ backgroundColor: '#fff9ef' }}>
                <div className="card-body">
                  <i className="fas fa-users" style={{ fontSize: '2rem', color: '#FF8C00' }}></i>
                  <h4 className="fw-semibold mt-2">Voluntários</h4>
                  <ul className="list-unstyled mt-3">
                    <li><i className="fas fa-check-circle text-success me-2"></i> Cadastro com habilidades e afinidades</li>
                    <li><i className="fas fa-check-circle text-success me-2"></i> Busca por localização, data e habilidades</li>
                    <li><i className="fas fa-check-circle text-success me-2"></i> Candidatura rápida e avaliação da ONG</li>
                    <li><i className="fas fa-check-circle text-success me-2"></i> Histórico e reputação visível</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card h-100 border-0 rounded-4 p-3" style={{ backgroundColor: '#fff9ef' }}>
                <div className="card-body">
                  <i className="fas fa-building" style={{ fontSize: '2rem', color: '#FF8C00' }}></i>
                  <h4 className="fw-semibold mt-2">Empresas Parceiras</h4>
                  <ul className="list-unstyled mt-3">
                    <li><i className="fas fa-check-circle text-success me-2"></i> Acesso ao feed de projetos e ONGs</li>
                    <li><i className="fas fa-check-circle text-success me-2"></i> Patrocínio pontual ou recorrente</li>
                    <li><i className="fas fa-check-circle text-success me-2"></i> Relatórios de impacto e visibilidade da marca</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Diferencial: avaliação mútua e transparência */}
          <div className="row justify-content-center mb-5">
            <div className="col-lg-10">
              <div className="card border-0 shadow-sm rounded-4 p-4 text-center bg-white">
                <i className="fas fa-star-of-life" style={{ fontSize: '2rem', color: '#FF8C00' }}></i>
                <h3 className="fw-bold mt-2">Confiança construída com feedback</h3>
                <p className="lead" style={{ maxWidth: '700px', margin: '0 auto' }}>
                  Voluntários e ONGs avaliam uns aos outros após cada evento. A reputação é o novo currículo: transparente, justa e motivadora.
                </p>
                <div className="mt-3">
                  <span className="badge bg-light text-dark me-2 p-2"><i className="fas fa-chart-line"></i> Melhoria contínua</span>
                  <span className="badge bg-light text-dark me-2 p-2"><i className="fas fa-handshake"></i> Relações de longo prazo</span>
                  <span className="badge bg-light text-dark p-2"><i className="fas fa-history"></i> Histórico completo</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tecnologias (stack) */}
          <div className="text-center my-5">
            <h2 className="fw-bold mb-3">Tecnologias que movem a CHEER</h2>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <span className="badge bg-dark p-3">React (Web)</span>
              <span className="badge bg-dark p-3">Kotlin (Mobile)</span>
              <span className="badge bg-dark p-3">PHP (API)</span>
              <span className="badge bg-dark p-3">PostgreSQL / MySQL</span>
            </div>
          </div>

          {/* Chamada para ação - igual à home */}
          <div className="row justify-content-center mt-4">
            <div className="col-auto">
              <Link to="/eventos">
                <button className="btn btn-lg px-5 py-2" style={{ backgroundColor: '#FF8C00', color: 'black', fontWeight: 'bold', borderRadius: '40px' }}>
                  <i className="fas fa-map-marked-alt me-2"></i> Ver Mapa de Eventos
                </button>
              </Link>
              <Link to="/registro" className="ms-3">
                <button className="btn btn-outline-dark btn-lg px-5 py-2" style={{ borderRadius: '40px' }}>
                  <i className="fas fa-heart me-2"></i> Voluntariar-se
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/*modais*/}
      <ModalLogin />
    </>
  );
}

export default SobreNos;
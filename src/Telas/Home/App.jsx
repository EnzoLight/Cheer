import { useState } from 'react'
import { Link } from 'react-router-dom'
import UserNavbar from '../../Componentes/UserNavbar';
import ModalLogin from '../../Componentes/Modais/ModalLogin'
import { motion } from "framer-motion";
import { ScrollAnimate } from "../../Componentes/animacaoScroll";

function App() {
  return (
    <>
      <section id="center" className="hero-home">
        <UserNavbar />

        <div className="container-fluid" style={{ minHeight: '91.2vh', display: 'flex', alignItems: 'center' }}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-11 col-md-10 col-lg-9 shadow-sm"
                style={{
                  backgroundColor: '#f2ffff',
                  borderRadius: '20px',
                  opacity: '0.8',
                  padding: '40px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>

                <h1 className="text-center mb-4" style={{ fontFamily: 'Poppins', fontWeight: 'bold', color: '#3b8629', fontSize: 'calc(1.5rem + 1.5vw)' }}>
                  Bem-Vindo, ao Cheer!
                </h1>

                <p className="text-center mb-4" style={{ fontFamily: 'Open Sans', width: '90%', fontSize: 'calc(1rem + 0.5vw)' }}>
                  A plataforma que te conecta com as mais diversas instituições e eventos de caridade...


                  Pronto para ser a mudança que você quer ver no mundo?


                  Registre-se agora e se inscreva para um evento perto de você!
                </p>

                <Link to="/registro">
                  <button className="btn btn-primary btn-lg" style={{ backgroundColor: '#FF8C00', color: 'black', fontSize: '1.25rem', fontFamily: 'Poppins', fontWeight: 'bold', border: 'none' }}>
                    REGISTRE-SE
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-5">
          <ScrollAnimate>
            <div id="sobre-nos" className="row justify-content-center mb-5" style={{ scrollMarginTop: window.innerWidth < 768 ? '10vh' : '25vh' }}>
              <div
                className="col-11 col-md-10 col-lg-9 text-center"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.85)',
                  borderRadius: '28px',
                  padding: '3rem 1.5rem',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.05)'
                }}
              >
                <h1 style={{ fontFamily: 'Poppins', fontSize: 'calc(2rem + 1.5vw)', color: '#3b8629', fontWeight: 'bold' }}>
                  Sobre o CHEER
                </h1>
                <p style={{ fontSize: '1.2rem', fontFamily: 'Open Sans', maxWidth: '700px', margin: '1rem auto 0', color: '#2c3e50' }}>
                  Uma ponte entre quem quer ajudar e quem está na linha de frente da transformação social.
                  Conectamos ONGs, voluntários e empresas em um ecossistema de colaboração, transparência e impacto real.
                </p>
              </div>
            </div>
          </ScrollAnimate>

          <ScrollAnimate>
            <div className="row g-4 mb-5">
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm rounded-4 p-4 text-center">
                  <i className="fas fa-bullseye" style={{ fontSize: '2.2rem', color: '#FF8C00' }}></i>
                  <h3 className="mt-3 fw-semibold" style={{ fontFamily: 'Poppins' }}>Missão</h3>
                  <p className="text-muted" style={{ fontFamily: 'Open Sans' }}>
                    Conectar pessoas e organizações sociais através da tecnologia, ampliando o impacto de projetos beneficentes e fortalecendo a cultura do voluntariado.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm rounded-4 p-4 text-center">
                  <i className="fas fa-globe-americas" style={{ fontSize: '2.2rem', color: '#FF8C00' }}></i>
                  <h3 className="mt-3 fw-semibold" style={{ fontFamily: 'Poppins' }}>Visão</h3>
                  <p className="text-muted" style={{ fontFamily: 'Open Sans' }}>
                    Criar um ecossistema digital seguro que conecta ONGs, voluntários e empresas, facilitando ações beneficentes e engajamento comunitário.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm rounded-4 p-4 text-center">
                  <i className="fas fa-hand-sparkles" style={{ fontSize: '2.2rem', color: '#FF8C00' }}></i>
                  <h3 className="mt-3 fw-semibold" style={{ fontFamily: 'Poppins' }}>Valores</h3>
                  <p className="text-muted" style={{ fontFamily: 'Open Sans' }}>
                    Colaboração, confiança, melhoria contínua e impacto social. Cada ação gera reputação e novas oportunidades.
                  </p>
                </div>
              </div>
            </div>
          </ScrollAnimate>

          <ScrollAnimate>
            <div style={{ paddingTop: '200px' }}>
              <h2 className="text-center fw-bold mb-4" style={{ color: '#1F3E3A', fontFamily: 'Poppins' }}>
                Uma plataforma para cada perfil
              </h2>
              <div className="row g-4 mb-5">
                <div className="col-lg-4">
                  <div className="card h-100 border-0 rounded-4 p-3" style={{ backgroundColor: '#fff9ef' }}>
                    <div className="card-body">
                      <i className="fas fa-tree" style={{ fontSize: '2rem', color: '#FF8C00' }}></i>
                      <h4 className="fw-semibold mt-2" style={{ fontFamily: 'Poppins' }}>ONGs / Instituições</h4>
                      <ul className="list-unstyled mt-3" style={{ fontFamily: 'Open Sans' }}>
                        <li><i className="fas fa-check-circle text-success me-2"></i> Criar eventos e gerenciar voluntários</li>
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
                      <h4 className="fw-semibold mt-2" style={{ fontFamily: 'Poppins' }}>Voluntários</h4>
                      <ul className="list-unstyled mt-3" style={{ fontFamily: 'Open Sans' }}>
                        <li><i className="fas fa-check-circle text-success me-2"></i> Busca por localização e habilidades</li>
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
                      <h4 className="fw-semibold mt-2" style={{ fontFamily: 'Poppins' }}>Empresas Parceiras</h4>
                      <ul className="list-unstyled mt-3" style={{ fontFamily: 'Open Sans' }}>
                        <li><i className="fas fa-check-circle text-success me-2"></i> Acesso ao feed de projetos e ONGs</li>
                        <li><i className="fas fa-check-circle text-success me-2"></i> Patrocínio pontual ou recorrente</li>
                        <li><i className="fas fa-check-circle text-success me-2"></i> Relatórios de impacto e visibilidade</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimate>

          <ScrollAnimate>
            <div className="row justify-content-center mb-5">
              <div className="col-lg-10">
                <div className="card border-0 shadow-sm rounded-4 p-4 text-center bg-white">
                  <i className="fas fa-star-of-life" style={{ fontSize: '2rem', color: '#FF8C00' }}></i>
                  <h3 className="fw-bold mt-2" style={{ fontFamily: 'Poppins' }}>Confiança construída com feedback</h3>
                  <p className="lead" style={{ maxWidth: '700px', margin: '0 auto', fontFamily: 'Open Sans' }}>
                    Voluntários e ONGs avaliam uns aos outros após cada evento. A reputação é o novo currículo: transparente, justa e motivadora.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center my-5">
              <h2 className="fw-bold mb-3" style={{ fontFamily: 'Poppins' }}>Tecnologias que movem a CHEER</h2>
              <div className="d-flex flex-wrap justify-content-center gap-3">
                <span className="badge bg-dark p-3">React</span>
                <span className="badge bg-dark p-3">Node.js</span>
                <span className="badge bg-dark p-3">MongoDB</span>
                <span className="badge bg-dark p-3">Bootstrap</span>
              </div>
            </div>

            <div className="row justify-content-center mt-4">
              <div className="col-auto d-flex gap-3">
                <Link to="/mapa">
                  <button className="btn btn-lg px-5 py-2" style={{ backgroundColor: '#FF8C00', color: 'black', borderRadius: '40px', fontFamily: 'Poppins', fontWeight: 'bold', border: 'none' }}>
                    <i className="fas fa-map-marked-alt me-2"></i> Ver Mapa de Eventos
                  </button>
                </Link>
                <Link to="/registro">
                  <button className="btn btn-outline-dark btn-lg px-5 py-2" style={{ borderRadius: '40px', fontFamily: 'Poppins', fontWeight: 'bold' }}>
                    <i className="fas fa-heart me-2"></i> Voluntariar-se
                  </button>
                </Link>
              </div>
            </div>
          </ScrollAnimate>
        </div>
      </section>

      <ModalLogin />
    </>
  )
}

export default App

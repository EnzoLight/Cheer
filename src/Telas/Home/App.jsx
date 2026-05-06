import { useState } from 'react'
import "./App.css"
import "../../components/navbar.css"
import { Link } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        {/* Navbar */}
        <div className='background d-flex'>
          <nav className="navbar navbar-cheer navbar-expand-lg w-100">
            <div className="container-fluid d-flex justify-content-center align-items-center">

              {/* Logo */}
              <Link to="/" style={{ textDecoration: 'none' }}>
                <a className="navbar-brand navbar-brand-cheer">CHEER</a>
              </Link>
              {/* Links e Pesquisa agrupados e centralizados */}
              <div className="d-flex align-items-center">
                <ul className="navbar-nav d-flex flex-row me-4">
                  <li className="nav-item ms-3">
                    <a className="nav-link nav-link-cheer" href="/login">Eventos</a>
                  </li>
                  <li className="nav-item ms-3">
                    <a className="nav-link nav-link-cheer" href="/login">Instituições</a>
                  </li>
                  <li className="nav-item ms-3">
                    <a className="nav-link nav-link-cheer" href="/login">Sobre nós</a>
                  </li>
                </ul>

                {/* Barra de pesquisa */}
                <div className="d-flex align-items-center">
                  <form className="d-flex">
                    <input
                      style={{ width: '300px' }}
                      className="form-control me-2"
                      type="search"
                      placeholder="Doação de Páscoa"
                      aria-label="Search"
                    />
                    <button className="btn" type="submit">
                      <img
                        src="src/assets/search.png"
                        alt="Search"
                        width="20"
                        height="20"
                      />
                    </button>
                  </form>
                </div>
              </div>

              {/* Foto de Perfil */}
              <div className="dropdown ms-4">
                <a href="#" className="d-block link-dark text-decoration-none" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="src/assets/boy.png" alt="mdo" width="50" height="50" className="rounded-circle" />
                </a>
                <ul className="dropdown-menu dropdown-menu-end text-small" aria-labelledby="dropdownUser1">
                  <li><a data-bs-toggle="modal" data-bs-target="#LoginModal" className="dropdown-item" data-bs-target="#LoginModal" href="#">Login</a></li>
                  <li><a data-bs-toggle="modal" data-bs-target="#LoginModal" className="dropdown-item " href="#">Meu perfil</a></li>
                  <li><a data-bs-toggle="modal" data-bs-target="#LoginModal" className="dropdown-item" href="#">Ajustar preferências</a></li>
                  <li><a data-bs-toggle="modal" data-bs-target="#LoginModal" className="dropdown-item" href="#">Eventos realizados</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#">Opções</a></li>
                  <li><a className="dropdown-item" href="#">Sair</a></li>
                </ul>
              </div>
            </div>
          </nav>
        </div>

        <div className="container-fluid hero-section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-11 col-md-10 col-lg-9 shadow-sm"
                style={{
                  padding: '40px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>

                <h1 className="text-center mb-4" style={{ fontSize: 'calc(1.5rem + 1.5vw)' }}>
                  Bem-Vindo, ao Cheer!
                </h1>

                <h3 className="text-center mb-4" style={{ width: '90%', fontSize: 'calc(1rem + 0.5vw)' }}>
                  A plataforma que te conecta com as mais diversas instituições e eventos de caridade...
                  <br></br>
                  Pronto para ser a mudança que você quer ver no mundo?
                  <br></br>
                  Registre-se agora e se inscreva para um evento perto de você!
                  <br></br>
                </h3>

                <Link to="/registro">
                  <button className="btn btn-primary-cheer btn-lg">REGISTRE-SE</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de Login */}
      <div class="modal fade" id="LoginModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 style={{ textAlign: 'center' }} class="modal-title fs-5" id="exampleModalLabel"></h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <h2 style={{ textAlign: 'center' }}>Bem-vindo de volta</h2>
              <br></br>
              <div className="row justify-content-center" style={{ margin: 'auto' }}>
                <label>Email:</label>
                <input id='txt_email_login' type='text' placeholder='voluntario@email.com'>
                </input>
                <br></br>
                <label>Senha:</label>
                <input id='txt_senha_login' type='text' placeholder='Senha#123'>
                </input>

                
                  <button id='btn_login' className="btn modal-btn-login" type="button" data-bs-dismiss="modal">LOGIN</button>
                

              </div>
            </div>
            <div style={{borderTop: 'solid 1px', alignContent: 'center'}} class="modal-footer" className="justify-content-center">
              <h4 className="justify-content-center" style={{ marginTop: '10px', textAlign: 'center' }}>Não tem um perfil de voluntário?</h4>
            </div>
            <Link className="row justify-content-center" style={{ textDecoration: 'none' }} to="/registro">
              <button style={{ border: 'none', backgroundColor: '#FF8C00', color: 'black', width: 'fit-content', marginBottom: '15px' }} type="button" class="btn btn-secondary" data-bs-dismiss="modal">Registre-se</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
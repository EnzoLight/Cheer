import { useState } from 'react'
import "./App.css"
import { Link } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        {/* Navbar */}
        <div className='background d-flex'>
          <nav
            style={{ backgroundColor: '#fffcf7', borderBottom: '1px solid lightgray' }}
            className="navbar navbar-expand-lg w-100"
          >
            <div className="container-fluid d-flex justify-content-center align-items-center">

              {/* Logo */}
              <a
                style={{ color: '#FF8C00', fontSize: '2.25rem', fontFamily: 'Mogra', marginRight: '40px' }}
                className="navbar-brand"
              >
                CHEER
              </a>

              {/* Links e Pesquisa agrupados e centralizados */}
              <div className="d-flex align-items-center">
                <ul className="navbar-nav d-flex flex-row me-4">
                  <li className="nav-item ms-3">
                    <a style={{ fontFamily: 'Archivo Black' }} className="nav-link" href="/login">Eventos</a>
                  </li>
                  <li className="nav-item ms-3">
                    <a style={{ fontFamily: 'Archivo Black' }} className="nav-link" href="/login">Instituições</a>
                  </li>
                  <li className="nav-item ms-3">
                    <a style={{ fontFamily: 'Archivo Black' }} className="nav-link" href="/login">Sobre nós</a>
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
                        margin="0"
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
                  <li><a data-bs-toggle="modal" data-bs-target="#LoginModal" className="dropdown-item " href="#">Meu perfil</a></li>
                  <li><a className="dropdown-item" href="#">Ajustar preferências</a></li>
                  <li><a className="dropdown-item" href="#">Eventos realizados</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#">Opções</a></li>
                  <li><a className="dropdown-item" href="#">Sair</a></li>
                </ul>
              </div>
            </div>
          </nav>

        </div>

        <div className="container-fluid" style={{ background: 'linear-gradient(to bottom, #b2d7e4, #FFFFFF )', minHeight: '91.2vh', display: 'flex', alignItems: 'center' }}>
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
                  <button className="btn btn-primary btn-lg" style={{ width: '200px', height: '50px', backgroundColor: 'orange', color: 'black', fontSize: '1.25rem', fontFamily: 'Arial Black' }}>
                    Registrar-se
                  </button>
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
              <h1 style={{textAlign: 'center'}} class="modal-title fs-5" id="exampleModalLabel">Login</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              ...
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
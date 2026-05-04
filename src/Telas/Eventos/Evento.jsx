import { useState } from 'react';
import "./Evento.css";
import { Link } from 'react-router-dom';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'



function Evento() {


  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });




  return (
    <section id="center">
      {/* Navbar */}
      <div className='background d-flex'>
        <nav
          style={{ backgroundColor: '#fffcf7', borderBottom: '1px solid lightgray' }}
          className="navbar navbar-expand-lg w-100"
        >
          <div className="container-fluid d-flex justify-content-center align-items-center">

            {/* Logo */}
            <Link to="/" style={{ textDecoration: 'none' }}>
              <a
                style={{ color: '#FF8C00', fontSize: '2.25rem', fontFamily: 'Mogra', marginRight: '40px' }}
                className="navbar-brand"
              >
                CHEER
              </a>
            </Link>
            {/* Links e Pesquisa agrupados e centralizados */}
            <div className="d-flex align-items-center">
              <ul className="navbar-nav d-flex flex-row me-4">
                <li className="nav-item ms-3">
                  <a style={{ fontFamily: 'Archivo Black' }} className="nav-link" href="/eventos">Eventos</a>
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
                  <button className="btn" type="submit" id="img_search">
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
                <li><a data-bs-toggle="modal" data-bs-target="#LoginModal" className="dropdown-item" href="#">Login</a></li>
                <li><a data-bs-toggle="modal" data-bs-target="#LoginModal" className="dropdown-item " href="#">Meu perfil</a></li>
                <li><a className="dropdown-item" href="/perfil">Ajustar preferências</a></li>
                <li><a data-bs-toggle="modal" data-bs-target="#LoginModal" className="dropdown-item" href="#">Eventos realizados</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Opções</a></li>
                <li><a className="dropdown-item" href="#">Sair</a></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div className="container-fluid flex-grow-1" style={{ background: 'linear-gradient(to bottom, #ffd497, #FFFFFF )', minHeight: '91.2vh', display: 'flex', flexDirection: 'row', padding: '40px', gap: '40px' }}>
        <div style={{opacity:'80%', backgroundColor: '#fffcf7', width: '80%', height: '100%', padding: '30px', borderRadius: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <h1>Mapa do Evento</h1>

          <div className="map-container" style={{width: '100%', height: '620px', padding: '30px', borderRadius: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={{ width: '80%', height: '80%', borderRadius: '40px' }}
                center={{
                  lat: -23.663611,
                  lng: -46.460177
                }}
                zoom={15}

              ></GoogleMap>
            ) : (
              <></>
            )
            }

            <div style={{ borderRadius: '15px', padding: '10px', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: '30px', backgroundColor: '#b2d7e4' }}>
              <div className="d-flex align-items-center" style={{}}>
                <div className="d-flex align-items-center" style={{ marginTop: '10px' }}>
                  <p>CEP: </p>
                  <input
                    style={{ width: '200px', marginLeft: '10px' }}
                    className="form-control me-2"
                    type="search"
                    placeholder="12345-678"
                    aria-label="Search"
                  />
                </div>
                <p>Rua: </p>
                <input
                  style={{ width: '300px', marginLeft: '10px' }}
                  className="form-control me-2"
                  type="search"
                  placeholder="Rua Exemplo"
                  aria-label="Search"
                />


                <p style={{ marginLeft: '20px' }}>Número: </p>
                <input
                  style={{ width: '100px', marginLeft: '10px' }}
                  className="form-control me-2"
                  type="search"
                  placeholder="123"
                  aria-label="Search"
                />

              </div>
              <div className="d-flex align-items-center" style={{ marginTop: '10px' }}>
                <p>Bairro: </p>
                <input
                  style={{ width: '200px', marginLeft: '10px' }}
                  className="form-control me-2"
                  type="search"
                  placeholder="Bairro Exemplo"
                  aria-label="Search"
                />
                <p style={{ marginLeft: '20px' }}>UF: </p>
                <input
                  style={{ width: '100px', marginLeft: '10px' }}
                  className="form-control me-2"
                  type="search"
                  placeholder="SP"
                  aria-label="Search"
                />
              </div>
              <div className="d-flex align-items-center" style={{ marginTop: '10px' }}>
                <p>Cidade: </p>
                <input
                  style={{ width: '200px', marginLeft: '10px' }}
                  className="form-control me-2"
                  type="search"
                  placeholder="Cidade Exemplo"
                  aria-label="Search"
                />

                <p style={{ marginLeft: '20px' }}>Complemento: </p>
                <input
                  style={{ width: '300px', marginLeft: '10px' }}
                  className="form-control me-2"
                  type="search"
                  placeholder="12345-678"
                  aria-label="Search"
                />
                <img id="img_search" src='src/assets/search.png' style={{ width: '20px', height: '20px' }} />
              </div>
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: '#fffcf7', width: '60%', height: '100%', padding: '30px', borderRadius: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <h1>Detalhes do Evento</h1>
          <div className="map-container" style={{ backgroundColor: '#FF8C00', width: '100%', height: '100%', padding: '30px', borderRadius: '40px', flexDirection: 'column', display: 'flex', color: '#fff', justifyContent: 'space-between' }}>
            <div className="detalhes">
              <p>Nome: Exemplo de Evento</p>
              <p>Tipo: Exemplo de Tipo</p>
              <p>Descrição: Esta é uma descrição de exemplo para o evento.</p>
              <p>Data: 01/01/2024</p>
            </div>

            <div>

              <h2>Preferências: </h2>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <button className="preferencias">Bom/Boa com números</button>
                <button className="preferencias">Organizado</button>
                <button className="preferencias">Prestativo</button>
              </div>

              <button id="voluntariar-se" className="btn btn-primary" style={{ padding: '15px 20px', fontSize: '30px', borderRadius: '40px', width: '100%' }}>Voluntariar-se</button>


            </div>

          </div>
        </div>

      </div>
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


                <button id='btn_login' style={{ border: 'none', backgroundColor: '#b2d7e4', color: 'black', width: 'fit-content', marginTop: '10px' }} type="button" class="btn btn-secondary" data-bs-dismiss="modal">LOGIN</button>


              </div>
            </div>
            <div style={{ borderTop: 'solid 1px', alignContent: 'center' }} class="modal-footer" className="justify-content-center">
              <h4 className="justify-content-center" style={{ marginTop: '10px', textAlign: 'center' }}>Não tem um perfil de voluntário?</h4>
            </div>
            <Link className="row justify-content-center" style={{ textDecoration: 'none' }} to="/registro">
              <button style={{ border: 'none', backgroundColor: '#FF8C00', color: 'black', width: 'fit-content', marginBottom: '15px' }} type="button" class="btn btn-secondary" data-bs-dismiss="modal">Registre-se</button>
            </Link>
          </div>
        </div>
      </div>
    </section>

  )
}

export default Evento;
import { useState } from 'react';
import "./Evento.css";
import { Link } from 'react-router-dom';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import UserNavbar from '../../Componentes/UserNavbar';
import ModalLogin from '../../Componentes/Modais/ModalLogin'



function Evento() {


  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });




  return (
    <>
      <section id="center">

        {/*Navbar*/}
        <UserNavbar />

        <div className="container-fluid flex-grow-1" style={{ background: 'linear-gradient(to bottom, #ffd497, #FFFFFF )', minHeight: '91.2vh', display: 'flex', flexDirection: 'row', padding: '40px', gap: '40px' }}>
          <div style={{ opacity: '80%', backgroundColor: '#fffcf7', width: '80%', height: '100%', padding: '30px', borderRadius: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h1 style={{fontFamily:'Monserat', fontWeight:'bold'}}>Mapa do Evento</h1>

            <div className="map-container" style={{ width: '100%', height: '620px', padding: '30px', borderRadius: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

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

              <div style={{ borderRadius: '15px', padding: '10px', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: '30px', backgroundColor: '#8ac9e0' }}>
                <div className="d-flex align-items-center" style={{}}>
                  <div className="d-flex align-items-center" style={{ marginTop: '10px' }}>
                    <p style={{color: 'black', fontWeight: 'bold'}}>CEP: </p>
                    <input
                      style={{ width: '200px', marginLeft: '10px' }}
                      className="form-control me-2"
                      type="search"
                      placeholder="12345-678"
                      aria-label="Search"
                    />
                  </div>
                  <p style={{color: 'black', fontWeight: 'bold'}}>Rua: </p>
                  <input
                    style={{ width: '300px', marginLeft: '10px' }}
                    className="form-control me-2"
                    type="search"
                    placeholder="Rua Exemplo"
                    aria-label="Search"
                  />


                  <p style={{ color: 'black', fontWeight: 'bold', marginLeft: '20px' }}>Número: </p>
                  <input
                    style={{ width: '100px', marginLeft: '10px' }}
                    className="form-control me-2"
                    type="search"
                    placeholder="123"
                    aria-label="Search"
                  />

                </div>
                <div className="d-flex align-items-center" style={{color: 'black', fontWeight: 'bold', marginTop: '10px' }}>
                  <p>Bairro: </p>
                  <input
                    style={{ width: '200px', marginLeft: '10px' }}
                    className="form-control me-2"
                    type="search"
                    placeholder="Bairro Exemplo"
                    aria-label="Search"
                  />
                  <p style={{color: 'black', fontWeight: 'bold', marginLeft: '20px' }}>UF: </p>
                  <input
                    style={{ width: '100px', marginLeft: '10px' }}
                    className="form-control me-2"
                    type="search"
                    placeholder="SP"
                    aria-label="Search"
                  />
                </div>
                <div className="d-flex align-items-center" style={{ marginTop: '10px' }}>
                  <p style={{color: 'black', fontWeight: 'bold'}} >Cidade: </p>
                  <input
                    style={{ width: '200px', marginLeft: '10px' }}
                    className="form-control me-2"
                    type="search"
                    placeholder="Cidade Exemplo"
                    aria-label="Search"
                  />

                  <p style={{ color: 'black', fontWeight: 'bold', marginLeft: '20px' }}>Complemento: </p>
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
            <h1 style={{fontFamily:'Monserat', fontWeight:'bold'}}>Detalhes do Evento</h1>
            <div className="map-container" style={{marginTop: '15px' ,backgroundColor: '#fca63d', width: '100%', height: '100%', padding: '30px', borderRadius: '40px', flexDirection: 'column', display: 'flex', color: '#000000', justifyContent: 'space-between', fontFamily: 'Open Sans' }}>
              <div className="detalhes">
                <p><b>Nome:</b> Exemplo de Evento</p>
                <p><b>Tipo:</b> Exemplo de Tipo</p>
                <p><b>Descrição:</b> Esta é uma descrição de exemplo para o evento.</p>
                <p><b>Data e horário:</b> 01/01/2024 - 14:00</p>
              </div>

              <div>

                <h2 style={{color: 'black', fontWeight: 'bold'}}>Preferências: </h2>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                  <button className="preferencias">Bom/Boa com números</button>
                  <button className="preferencias">Organizado</button>
                  <button className="preferencias">Prestativo</button>
                </div>

                <button id="voluntariar-se" className="btn btn-primary" style={{ fontFamily:'Poppins', fontWeight:'bold' ,padding: '15px 20px', fontSize: '30px', borderRadius: '40px', width: '100%' }}>VOLUNTARIAR-SE</button>


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

      {/*Moidais*/}
      <ModalLogin />
    </>
  )
}

export default Evento;
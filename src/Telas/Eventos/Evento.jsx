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
            <div className="background d-flex flex-column min-vh-100">
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
                                            width="20"
                                            height="20"
                                        />
                                    </button>
                                </form>
                            </div>
                        </div>


                        <div className="dropdown ms-4">
                            <a href="#" className="d-block link-dark text-decoration-none" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="src/assets/boy.png" alt="mdo" width="50" height="50" className="rounded-circle" />
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end text-small" aria-labelledby="dropdownUser1">
                                <li><a data-bs-toggle="modal" data-bs-target="#LoginModal" className="dropdown-item"  href="#">Login</a></li>
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
                <div className="container-fluid flex-grow-1" style={{ background: 'linear-gradient(to bottom, #b2d7e4, #FFFFFF )', minHeight: '91.2vh', display: 'flex', flexDirection: 'row', padding: '40px', gap: '40px' }}>
                    <div style={{ backgroundColor: '#fffcf7', width: '100%', height: '100%', padding: '30px', borderRadius: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <h1>Mapa do Evento</h1>
                        
                        <div className="map-container" style={{ backgroundColor: '#FF8C00', width: '100%', height: '800px', padding: '30px', borderRadius: '40px', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column' }}>

                        {isLoaded ? (
    <GoogleMap
      mapContainerStyle={{width: '100%', height: '100%', borderRadius: '40px' }}
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

                    <div style={{marginTop: '20px' }}>   
                    <h2>Rua: Teste</h2>
                    <h2>Bairro: Teste</h2>
                    <h2>Cidade: Teste</h2>
                    </div>
                        </div>
                    </div>
                    <div style={{ backgroundColor: '#fffcf7', width: '60%', height: '100%', padding: '30px', borderRadius: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <h1>Detalhes do Evento</h1>
                        <div className="map-container" style={{ backgroundColor: '#FF8C00', width: '100%', height: '100%', padding: '30px', borderRadius: '40px', flexDirection: 'column', display: 'flex', color: '#fff',  justifyContent: 'space-between' }}>
                            <div className= "detalhes">
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
            </div>
        </section>
    )
}

export default Evento;
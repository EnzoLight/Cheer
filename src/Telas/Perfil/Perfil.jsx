import "./Perfil.css";
import { Link } from 'react-router-dom';

function Perfil() {


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
                                <li><a data-bs-toggle="modal" data-bs-target="#LoginModal" className="dropdown-item" href="#">Login</a></li>
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
                        <div style={{ backgroundColor: '#fffcf7', width: '100%', height: '100%', padding: '30px', borderRadius: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <h1>Complete seu perfil:</h1>
                            <div className="map-container" style={{ backgroundColor: '#FF8C00', width: '100%', height: '100%', padding: '30px', borderRadius: '40px', flexDirection: 'column', display: 'flex', color: '#fff' }}>
                                <h2>Habilidades, atividades e fraquezas: </h2>
                                <div className="d-flex align-items-center" style={{ marginTop: '10px' }}>
                                    <form className="d-flex">
                                        <input
                                            style={{ width: '300px' }}
                                            className="form-control me-2"
                                            type="search"
                                            placeholder="Bom com números"
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
                                <div className="d-flex align-items-center" style={{ marginTop: '10px', flexDirection: 'row', justifyContent: 'space-between', fontSize: '30px' }}>
                                    <div className="d-flex align-items-center" style={{ marginTop: '10px', height: '400px', flexDirection: 'column', gap: '20px', justifyContent: 'flex-start' }}>
                                                                <button className="preferencias">Bom/Boa com números</button>
                                                                <button className="preferencias">Organizado</button>
                                                                <button className="preferencias">Prestativo</button>                            
                                    </div>
                                    <div>
                                        <button></button>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ backgroundColor: '#fffcf7', width: '100%', height: '100%', padding: '30px', borderRadius: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <h1>Endereço (OPCIONAL)</h1>
                            <div className="map-container" style={{ backgroundColor: '#FF8C00', width: '100%', height: '100%', padding: '30px', borderRadius: '40px', flexDirection: 'column', display: 'flex', color: '#fff', justifyContent: 'space-between' }}>
                                <div className="d-flex align-items-center">

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
                                    </div>
                                    
                                    <button className="botaofinalizar">FINALIZAR</button>
                                    
                            
                                </div>
                        </div>
                        
                    </div>
                    


                    <div className="secaobusca" style={{ backgroundColor: '#fffcf7', width: '100%', height: '100%', padding: '30px', borderRadius: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                        <img style={{ width: '100%', height: '100%', borderRadius: '20px' }} src="src/assets/voluntariados.jpg" alt="Buscar" />
                        <button className="botaoeventos">BUSCAR EVENTOS</button>
                    </div>
                </div>

            </div>
        </section>

    )
}


export default Perfil;
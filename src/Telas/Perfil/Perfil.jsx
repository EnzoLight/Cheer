import "./Perfil.css";
import { Link } from 'react-router-dom'
import UserNavbar from '../../Componentes/UserNavbar';
import ModalLogin from '../../Componentes/Modais/ModalLogin'

function Perfil() {


    return (
        <>
        <section id="center">
            {/*Navbar*/}
            <UserNavbar />

            <div className="container-fluid flex-grow-1" style={{ background: 'linear-gradient(to bottom, #b2d7e4, #FFFFFF )', minHeight: '91.2vh', display: 'flex', flexDirection: 'row', padding: '40px', gap: '40px' }}>
                <div style={{ backgroundColor: '#fffcf7', width: '100%', height: '50%', padding: '30px', borderRadius: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ backgroundColor: '#fffcf7', width: '100%', height: '50%', padding: '30px', borderRadius: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <h1>Complete seu perfil:</h1>
                        <div className="map-container" style={{ backgroundColor: '#fca63d', width: '100%', height: '50%', padding: '30px', borderRadius: '40px', flexDirection: 'column', display: 'flex', color: '#fff' }}>
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
                    <div style={{ backgroundColor: '#fffcf7', width: '100%', height: '50%', padding: '30px', borderRadius: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <h1>Endereço (OPCIONAL)</h1>
                        <div className="map-container" style={{ backgroundColor: '#fca63d', width: '100%', height: '100%', padding: '30px', borderRadius: '40px', flexDirection: 'column', display: 'flex', color: '#fff', justifyContent: 'space-between' }}>
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



                <div className="secaobusca" style={{ backgroundColor: '#fffcf7', width: '100%', height: '100%', padding: '30px', borderRadius: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <img style={{ width: '100%', height: '100%', borderRadius: '20px' }} src="src/assets/voluntariados.jpg" alt="Buscar" />
                    <Link to="/eventos">
                        <button style={{fontSize: '15px'}} className="botaoeventos">BUSCAR EVENTOS</button>
                    </Link>
                </div>
            </div>
        </section>

        {/*Moidais*/}
      <ModalLogin />
    </>
    )
}


export default Perfil;
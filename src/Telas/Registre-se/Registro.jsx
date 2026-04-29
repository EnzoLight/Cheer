import { useState } from 'react'
import "./Registro.css"
import { Link } from 'react-router-dom';

function Registro() {
    const [password, setPassword] = useState('');

    const validations = {
        hasNumber: /\d/.test(password),
        hasUpper: /[A-Z]/.test(password),
        hasSpecial: /[!@#$%^&*]/.test(password),
        minLength: password.length >= 8,
    };

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

              {/* Foto de Perfil */}
              <div className="dropdown ms-4">
                <a href="#" className="d-block link-dark text-decoration-none" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="src/assets/boy.png" alt="mdo" width="50" height="50" className="rounded-circle" />
                </a>
                <ul className="dropdown-menu dropdown-menu-end text-small" aria-labelledby="dropdownUser1">
                  <li><a className="dropdown-item" href="#">Meu perfil</a></li>
                  <li><a className="dropdown-item" href="#">Ajustar preferências</a></li>
                  <li><a className="dropdown-item" href="#">Eventos realizados</a></li>
                  <li><hr className="dropdown-divider"/></li>
                  <li><a className="dropdown-item" href="#">Opções</a></li>
                  <li><a className="dropdown-item" href="#">Sair</a></li>
                </ul>
              </div>
            </div>
          </nav>

        </div>
                <div style={{ backgroundColor: 'lightblue', display: 'flex', height: '91.2vh' }}>
                    <div style={{ backgroundColor: 'white', width: '900px', height: '700px', margin: 'auto', borderRadius: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginRight: '100px', marginLeft: '500px' }}>
                        <h1 style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px', textAlign: 'center', fontSize: '1.5rem', fontFamily: 'Mogra' }}>PREENCHA OS CAMPOS ABAIXO</h1>
                        <div style={{ backgroundColor: 'lightcoral', paddingLeft: '50px', paddingRight: '50px', padding: '20px', borderRadius: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <label style={{ textAlign: 'center', width: '80%' }}>Nome Completo:</label>
                            <input style={{ width: '300px', height: '30px', marginBottom: '10px' }} type="text" placeholder="Digite seu nome completo" />

                            <label style={{ textAlign: 'center', width: '80%' }}>Email:</label>
                            <input style={{ width: '300px', height: '30px', marginBottom: '10px' }} type="email" placeholder="Digite seu email" />

                            <label style={{ textAlign: 'center', width: '80%' }}>Telefone:</label>
                            <input style={{ width: '300px', height: '30px', marginBottom: '10px' }} type="tel" placeholder="Digite seu telefone" />

                            <label style={{ textAlign: 'center', width: '80%' }}>CPF:</label>
                            <input style={{ width: '300px', height: '30px', marginBottom: '10px' }} type="text" placeholder="Digite seu CPF" />

                            <label style={{ textAlign: 'center', width: '80%' }}>Senha:</label>
                            <input
                                style={{ width: '300px', height: '30px', marginBottom: '10px' }}
                                type="password"
                                placeholder="Digite sua senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <label style={{ textAlign: 'center', width: '80%' }}>Confirmar Senha:</label>
                            <input style={{ width: '300px', height: '30px', marginBottom: '7px' }} type="password" placeholder="Confirme sua senha" />
                        </div>
                        <div style={{ backgroundColor: 'lightgray', paddingLeft: '50px', paddingRight: '50px', padding: '20px', borderRadius: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            
                            <input
                                type="checkbox"
                                checked={validations.hasUpper}
                                readOnly
                                className="form-check-input me-2"
                            />
                            <span style={{ color: validations.hasUpper ? 'green' : 'red' }}>
                                Contem uma letra maiúscula
                            </span>

                            <input
                                type="checkbox"
                                checked={validations.hasNumber}
                                readOnly 
                                className="form-check-input me-2"
                            />
                            <span style={{ color: validations.hasNumber ? 'green' : 'red' }}>
                                Pelo menos um número
                            </span>

                            <input
                                type="checkbox"
                                checked={validations.minLength}
                                readOnly
                                className="form-check-input me-2"
                            />
                            <span style={{ color: validations.minLength ? 'green' : 'red' }}>
                                Mínimo de 8 caracteres
                            </span>

                            <input
                                type="checkbox"
                                checked={validations.hasSpecial}
                                readOnly
                                className="form-check-input me-2"
                            />
                            <span style={{ color: validations.hasSpecial ? 'green' : 'red' }}>
                                Contem um caractere especial (!@#$%^&*)
                            </span>
                        </div>
                        <button style={{ marginTop: '10px', width: '200px', height: '50px', fontSize: '1.25rem' }} class="btn btn-primary">Próximo</button>

                    </div>
                </div>
            </section >
        </>
    )
}

export default Registro

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
                <h1 style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px', textAlign: 'center', fontSize: '1.5rem', fontFamily: 'Mogra' }}>PREENCHA OS CAMPOS ABAIXO</h1>
                <div style={{ backgroundColor: '#FF8C00', paddingLeft: '50px', paddingRight: '50px', padding: '20px', borderRadius: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <label style={{ textAlign: 'center', width: '80%', fontFamily:'Source-Sans-3', fontWeight:'bold' }}>Nome Completo:</label>
                  <input style={{ width: '300px', height: '30px', marginBottom: '10px' }} type="text" placeholder="Digite seu nome completo" />

                  <label style={{ textAlign: 'center', width: '80%', fontFamily:'Source-Sans-3', fontWeight:'bold'}}>Email:</label>
                  <input style={{ width: '300px', height: '30px', marginBottom: '10px' }} type="email" placeholder="Digite seu email" />

                  <label style={{ textAlign: 'center', width: '80%', fontFamily:'Source-Sans-3', fontWeight:'bold' }}>Telefone:</label>
                  <input style={{ width: '300px', height: '30px', marginBottom: '10px' }} type="tel" placeholder="Digite seu telefone" />

                  <label style={{ textAlign: 'center', width: '80%', fontFamily:'Source-Sans-3', fontWeight:'bold' }}>CPF:</label>
                  <input style={{ width: '300px', height: '30px', marginBottom: '10px' }} type="text" placeholder="Digite seu CPF" />

                  <label style={{ textAlign: 'center', width: '80%', fontFamily:'Source-Sans-3', fontWeight:'bold' }}>Senha:</label>
                  <input
                    style={{ width: '300px', height: '30px', marginBottom: '10px' }}
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <label style={{ textAlign: 'center', width: '80%', fontFamily:'Source-Sans-3', fontWeight:'bold' }}>Confirmar Senha:</label>
                  <input style={{ width: '300px', height: '30px', marginBottom: '7px' }} type="password" placeholder="Confirme sua senha" />
                </div>

                {/*Validação de senha*/}

                <div 
                  style={{
                    marginTop: '20px',
                    height: 'fit-content',
                    width: '400px',
                    backgroundColor: 'lightgray',
                    padding: '20px', 
                    borderRadius: '10px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    alignItems: 'flex-start' }}>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="checkbox"
                        checked={validations.hasUpper}
                        readOnly
                        className="form-check-input me-2"
                      />
                      <span style={{  color: validations.hasUpper ? 'green' : 'red', fontFamily:'Source-Sans-3' }}>
                        Contêm uma letra maiúscula
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="checkbox"
                        checked={validations.hasNumber}
                        readOnly
                        className="form-check-input me-2"
                      />
                      <span style={{ color: validations.hasNumber ? 'green' : 'red', fontFamily:'Source-Sans-3' }}>
                        Pelo menos um número
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="checkbox"
                        checked={validations.minLength}
                        readOnly
                        className="form-check-input me-2"
                      />
                      <span style={{ color: validations.minLength ? 'green' : 'red', fontFamily:'Source-Sans-3' }}>
                        Mínimo de 8 caracteres
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="checkbox"
                        checked={validations.hasSpecial}
                        readOnly
                        className="form-check-input me-2"
                      />
                      <span style={{ color: validations.hasSpecial ? 'green' : 'red', fontFamily:'Source-Sans-3' }}>
                        Contem um caractere especial (!@#$%^&*)
                      </span>
                    </div>
                </div>
                <button id='btn_registro_user' style={{ marginTop: '10px', width: '200px', height: '50px', fontSize: '1.25rem' }} class="btn btn-primary">Criar Conta</button>
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

    </>
  )
}

export default Registro

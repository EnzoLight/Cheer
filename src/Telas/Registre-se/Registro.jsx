import { useState } from 'react'
import "./Registro.css"
import "../../components/navbar.css"
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
                <h1 className="titulo-registro">PREENCHA OS CAMPOS ABAIXO</h1>
                <div className="form-registro">
                  <label>Nome Completo:</label>
                  <input type="text" placeholder="Digite seu nome completo" />

                  <label>Email:</label>
                  <input type="email" placeholder="Digite seu email" />

                  <label>Telefone:</label>
                  <input type="tel" placeholder="Digite seu telefone" />

                  <label>CPF:</label>
                  <input type="text" placeholder="Digite seu CPF" />

                  <label>Senha:</label>
                  <input
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <label>Confirmar Senha:</label>
                  <input type="password" placeholder="Confirme sua senha" />
                </div>

                {/*Validação de senha*/}

                <div className="validation-box">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="checkbox"
                        checked={validations.hasUpper}
                        readOnly
                        className="form-check-input me-2"
                      />
                      <span className={validations.hasUpper ? 'validation-valid' : 'validation-invalid'}>
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
                      <span className={validations.hasUpper ? 'validation-valid' : 'validation-invalid'}>
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
                      <span className={validations.hasUpper ? 'validation-valid' : 'validation-invalid'}>
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
                      <span className={validations.hasUpper ? 'validation-valid' : 'validation-invalid'}>
                        Contem um caractere especial (!@#$%^&*)
                      </span>
                    </div>
                </div>
                <button id='btn_registro_user' className="btn btn-primary-cheer">Criar Conta</button>
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
            <div style={{ borderTop: 'solid 1px', alignContent: 'center' }} class="modal-footer" className="justify-content-center">
              <h4 className="justify-content-center" style={{ marginTop: '10px', textAlign: 'center' }}>Não tem um perfil de voluntário?</h4>
            </div>
            <Link className="row justify-content-center" style={{ textDecoration: 'none' }} to="/registro">
              <button className="btn modal-btn-registro" type="button" data-bs-dismiss="modal">Registre-se</button>
            </Link>
          </div>
        </div>
      </div>

    </>
  )
}

export default Registro

import { useState } from 'react'
import "./Registro.css"
import { Link } from 'react-router-dom'
import UserNavbar from '../../Componentes/UserNavbar';
import ModalLogin from '../../Componentes/Modais/ModalLogin'

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
        {/*Navbar*/}
        <UserNavbar />

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
                <div style={{ backgroundColor: '#fca63d', paddingLeft: '50px', paddingRight: '50px', padding: '20px', borderRadius: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <label style={{ textAlign: 'center', width: '80%', fontFamily: 'Source-Sans-3', fontWeight: 'bold' }}>Nome Completo:</label>
                  <input style={{ width: '300px', height: '30px', marginBottom: '10px' }} type="text" placeholder="Digite seu nome completo" />

                  <label style={{ textAlign: 'center', width: '80%', fontFamily: 'Source-Sans-3', fontWeight: 'bold' }}>Email:</label>
                  <input style={{ width: '300px', height: '30px', marginBottom: '10px' }} type="email" placeholder="Digite seu email" />

                  <label style={{ textAlign: 'center', width: '80%', fontFamily: 'Source-Sans-3', fontWeight: 'bold' }}>Telefone:</label>
                  <input style={{ width: '300px', height: '30px', marginBottom: '10px' }} type="tel" placeholder="Digite seu telefone" />

                  <label style={{ textAlign: 'center', width: '80%', fontFamily: 'Source-Sans-3', fontWeight: 'bold' }}>CPF:</label>
                  <input style={{ width: '300px', height: '30px', marginBottom: '10px' }} type="text" placeholder="Digite seu CPF" />

                  <label style={{ textAlign: 'center', width: '80%', fontFamily: 'Source-Sans-3', fontWeight: 'bold' }}>Senha:</label>
                  <input
                    style={{ width: '300px', height: '30px', marginBottom: '10px' }}
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <label style={{ textAlign: 'center', width: '80%', fontFamily: 'Source-Sans-3', fontWeight: 'bold' }}>Confirmar Senha:</label>
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
                    alignItems: 'flex-start'
                  }}>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="checkbox"
                      checked={validations.hasUpper}
                      readOnly
                      className="form-check-input me-2"
                    />
                    <span style={{ color: validations.hasUpper ? 'green' : 'red', fontFamily: 'Source-Sans-3' }}>
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
                    <span style={{ color: validations.hasNumber ? 'green' : 'red', fontFamily: 'Source-Sans-3' }}>
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
                    <span style={{ color: validations.minLength ? 'green' : 'red', fontFamily: 'Source-Sans-3' }}>
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
                    <span style={{ color: validations.hasSpecial ? 'green' : 'red', fontFamily: 'Source-Sans-3' }}>
                      Contem um caractere especial (!@#$%^&*)
                    </span>
                  </div>
                </div>
                <Link to="/perfil">
                  <button id='btn_registro_user' style={{ marginTop: '10px', width: '200px', height: '50px', fontSize: '1.25rem' }} class="btn btn-primary">Criar Conta</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/*Moidais*/}
      <ModalLogin />

    </>
  )
}

export default Registro

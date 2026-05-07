import { useState } from 'react'
import "./App.css"
import { Link } from 'react-router-dom'
import UserNavbar from '../../Componentes/UserNavbar';
import ModalLogin from '../../Componentes/Modais/ModalLogin'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        {/* Navbar */}
        <UserNavbar />

        {/*Restante do conteúdo*/}
        <div className="container-fluid" style={{ background: 'linear-gradient(to bottom, #b2d7e4, #FFFFFF )', minHeight: '91.2vh', display: 'flex', alignItems: 'center' }}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-11 col-md-10 col-lg-9 shadow-sm"
                style={{
                  backgroundColor: 'aliceblue',
                  borderRadius: '20px',
                  opacity: '80%',
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
                  <button className="btn btn-primary btn-lg" style={{ width: '200px', height: '50px', backgroundColor: '#FF8C00', color: 'black', fontSize: '1.25rem', fontFamily: 'Arial Black' }}>
                    REGISTRE-SE
                  </button>
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

export default App
import { useState } from 'react'
import "./Login.css";

function Login() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className='background' class="d-flex">
          <nav class="navbar navbar-light bg-light justify-content-start">
            <a style={{ paddingLeft: '20px', color: 'inherit', fontSize: '2.25rem', fontFamily: 'Mogra' }} class="navbar-brand">CHEER</a>
            <a style={{ marginLeft: '60px', fontFamily: 'Archivo Black'}} class="nav-link" href="/login">Eventos</a>
            <a style={{ marginLeft: '60px', fontFamily: 'Archivo Black'}} class="nav-link" href="/login">Instituições</a>
            <a style={{ marginLeft: '60px', fontFamily: 'Archivo Black'}} class="nav-link" href="/login">Sobre nós</a>
            <form class="d-flex">
              <input
                style={{ marginLeft: '700px', width: '300px' }}
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button style={{}} class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
            <img class = "justify-content-start" style={{marginLeft: '120px', width: '60px', height: '60px' }} src="src/assets/login_img.png" alt="Logo" />
          </nav>
        </div>
        <div style={{backgroundColor: 'lightblue', display: 'flex', height: '91.2vh'}}>
          <h1 style={{backgroundColor: 'red', display: 'flex', flexDirection: 'column', marginBottom: '700px'}}>Bem-Vindo</h1>
          <div style={{backgroundColor: 'white', width: '1300px', height: '600px', margin: 'auto', borderRadius: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginRight: '1200px'}}>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login

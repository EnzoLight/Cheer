import React from 'react';
import { Link } from 'react-router-dom';

function UserNavbar() {
  return (
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
              <li className="nav-item dropdown ms-3">
                <a
                  style={{ fontFamily: 'Archivo Black' }}
                  href="#"
                  className="nav-link text-dark text-decoration-none"
                  id="dropdownEventos"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Eventos
                </a>

                <ul className="nav-item ms-3 dropdown-menu dropdown-menu-end text-small text-decoration-none" aria-labelledby="dropdownEventos">
                  <li><a className="dropdown-item" href="/eventos">Buscar Eventos</a></li>
                  <li><a className="dropdown-item" href="/calendario">Eventos Próximos</a></li>
                  <li><a className="dropdown-item" href="/atividade_user">Eventos realizados</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown ms-3">
                <a
                  style={{ fontFamily: 'Archivo Black' }}
                  href="#"
                  className="nav-link text-dark text-decoration-none"
                  id="dropdownEventos"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Instituições
                </a>

                <ul className="nav-item ms-3 dropdown-menu dropdown-menu-end text-small text-decoration-none" aria-labelledby="dropdownEventos">
                  <li><a className="dropdown-item" href="/buscar_instituicoes">Buscar Instituições</a></li>
                  <li><a className="dropdown-item" href="/atividade_user">Instituições Seguidas</a></li>
                </ul>
              </li>

              <li className="nav-item ms-3">
                <a style={{ fontFamily: 'Archivo Black' }} className="nav-link" href="/sobre_nos">Sobre nós</a>
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
                <button className="btn" type="submit" id="img_search">
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
              <li><a data-bs-toggle="modal" data-bs-target="#LoginModal" className="dropdown-item" href="#">Login</a></li>
              <li><a data-bs-toggle="modal" data-bs-target="#LoginModal" className="dropdown-item " href="#">Meu perfil</a></li>
              <li><a className="dropdown-item" href="/perfil">Ajustar preferências</a></li>
              <li><a data-bs-toggle="modal" data-bs-target="#LoginModal" className="dropdown-item" href="atividade_user">Atividade</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#">Opções</a></li>
              <li><a className="dropdown-item" href="#">Sair</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default UserNavbar;

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { HashLink } from 'react-router-hash-link';

function UserNavbar() {
  return (
    <div className='background d-flex'>
      <nav
        style={{ backgroundColor: '#fffcf7', borderBottom: '1px solid lightgray' }}
        className="navbar navbar-expand-lg w-100 fixed-top"
      >
        <div className="container-fluid d-flex justify-content-center align-items-center">

          {/* CORRIGIDO: Removida a tag <a> interna. Estilos aplicados direto no <Link> */}
          <Link
            to="/"
            style={{ color: '#FF8C00', fontSize: '2.25rem', fontFamily: 'Mogra', marginRight: '40px', textDecoration: 'none' }}
            className="navbar-brand"
          >
            CHEER
          </Link>

          {/* Links e Pesquisa agrupados e centralizados */}
          <div className="d-flex align-items-center">
            <ul className="navbar-nav d-flex flex-row me-4">
              <li className="nav-item dropdown md-3">
                <a
                  style={{ fontFamily: 'Poppins', fontWeight: 'Bold' }}
                  href="#"
                  className="nav-link text-dark text-decoration-none"
                  id="dropdownEventos"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Eventos
                </a>

                <ul className="nav-item ms-3 dropdown-menu dropdown-menu-end text-small text-decoration-none" aria-labelledby="dropdownEventos">
                  <li><Link className="dropdown-item" to="/eventos">Buscar Eventos</Link></li>
                  <li><a data-bs-toggle="modal" data-bs-target="#LoginModal" className="dropdown-item" href="#">Eventos Próximos</a></li>
                  <li><a data-bs-toggle="modal" data-bs-target="#LoginModal" className="dropdown-item" href="#">Eventos realizados</a></li>
                </ul>
              </li>

              <li className="nav-item dropdown ms-3">
                <a
                  style={{ fontFamily: 'Poppins', fontWeight: 'Bold' }}
                  href="#"
                  className="nav-link text-dark text-decoration-none"
                  id="dropdownInstituicoes"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Instituições
                </a>

                <ul className="nav-item ms-3 dropdown-menu dropdown-menu-end text-small text-decoration-none" aria-labelledby="dropdownInstituicoes">
                  <li><a data-bs-toggle="modal" data-bs-target="#LoginModal" className="dropdown-item" href="#">Buscar Instituições</a></li>
                  <li><a data-bs-toggle="modal" data-bs-target="#LoginModal" className="dropdown-item" href="#">Instituições Seguidas</a></li>
                </ul>
              </li>

              <li className="nav-item ms-3">
                <HashLink
                  smooth
                  to="/#sobre-nos"
                  style={{ fontFamily: 'Poppins', fontWeight: 'bold', textDecoration: 'none' }}
                  className="nav-link"
                >
                  Sobre nós
                </HashLink>
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

              {/* Trocar <Link to="#"> por <a href="#"> resolve o bloqueio do clique do modal */}
              <div className="d-flex align-items-center justify-content-between p-1">
                <li>
                  <a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#LoginModal" href="#">
                    Login
                  </a>
                </li>
                <img style={{ marginTop: '2px' }} src="src/assets/user.png" width="20" height="20" alt="" />
              </div>

              <div className="d-flex align-items-center justify-content-between p-1">
                <li>
                  <a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#LoginModal" href="#">
                    Meu Perfil
                  </a>
                </li>
                <img style={{ marginTop: '2px' }} src="src/assets/setting.png" width="20" height="20" alt="" />
              </div>

              <div className="d-flex align-items-center justify-content-between p-1">
                <li>
                  <a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#LoginModal" href="#">
                    Preferências
                  </a>
                </li>
                <img style={{ marginTop: '2px' }} src="src/assets/setting.png" width="20" height="20" alt="" />
              </div>

              <div className="d-flex align-items-center justify-content-between p-1">
                <li><Link className="dropdown-item" to="#">Atividade</Link></li>
                <img style={{ marginTop: '2px' }} src="src/assets/form.png" width="20" height="20" alt="" />
              </div>

              <li><hr className="dropdown-divider" /></li>

              <div className="d-flex align-items-center justify-content-between p-1">
                <li><Link className="dropdown-item" to="#">Opções</Link></li>
                <img style={{ marginTop: '2px' }} src="src/assets/setting.png" width="20" height="20" alt="" />
              </div>

              <div className="d-flex align-items-center justify-content-between p-1">
                <li><Link className="dropdown-item" to="#">Sair</Link></li>
                <img style={{ marginTop: '2px' }} src="src/assets/logout.png" width="20" height="20" alt="" />
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default UserNavbar;
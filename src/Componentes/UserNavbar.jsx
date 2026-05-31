import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import Logo from "./Logo/Logo";
import Input from "./Input/Input";
import UserMenu from "./UserMenu/UserMenu";
import useAuth from "../Contextos/useAuth";
import "./CSS/navbar.css";

function SessionItem({ authenticated, children, to }) {
  if (authenticated) {
    return <Link className="dropdown-item" to={to}>{children}</Link>;
  }

  return (
    <button
      className="dropdown-item"
      type="button"
      data-bs-toggle="modal"
      data-bs-target="#LoginModal"
    >
      {children}
    </button>
  );
}

function UserNavbar() {
  const { authenticated, isInstituicao } = useAuth();

  function preventSearchSubmit(event) {
    event.preventDefault();
  }

  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-cheer py-2">
      <div className="container">
        <Link to="/" className="navbar-brand cheer-brand-link me-4" aria-label="Cheer - página inicial">
          <Logo />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#cheer-navbar-navigation"
          aria-controls="cheer-navbar-navigation"
          aria-expanded="false"
          aria-label="Abrir navegação"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="cheer-navbar-navigation">
          <ul className="navbar-nav me-lg-4 mb-3 mb-lg-0 gap-lg-2">
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle nav-link-cheer"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Eventos
              </button>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/eventos">Buscar eventos</Link></li>
                <li><SessionItem authenticated={authenticated} to="/calendario">Minha agenda</SessionItem></li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle nav-link-cheer"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Instituições
              </button>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/cadastro-instituicao">Cadastrar instituição</Link></li>
                {isInstituicao && (
                  <li><Link className="dropdown-item" to="/criar-evento">Criar evento</Link></li>
                )}
              </ul>
            </li>

            <li className="nav-item">
              <HashLink smooth to="/#sobre-nos" className="nav-link nav-link-cheer">
                Sobre nós
              </HashLink>
            </li>
          </ul>

          <form className="d-flex align-items-center ms-lg-auto mb-3 mb-lg-0" role="search" onSubmit={preventSearchSubmit}>
            <Input
              type="search"
              placeholder="Doação de Páscoa"
              ariaLabel="Pesquisar eventos"
              containerClassName="navbar-search-field mb-0"
            />
            <button className="btn btn-outline-primary ms-2 cheer-btn-secondary cheer-search-button" type="submit" aria-label="Pesquisar">
              <Search size={18} aria-hidden="true" />
            </button>
          </form>

          <UserMenu />
        </div>
      </div>
    </nav>
  );
}

export default UserNavbar;

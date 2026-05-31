import { createElement } from "react";
import {
  Building2,
  CalendarHeart,
  ChevronDown,
  LogIn,
  LogOut,
  UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import useAuth from "../../Contextos/useAuth";
import "./UserMenu.css";

const protectedOptions = [
  { label: "Meu perfil", Icon: UserRound, to: "/perfil" },
  { label: "Minhas atividades", Icon: CalendarHeart, to: "/calendario" },
];

function ProtectedOption({ authenticated, label, Icon, to }) {
  if (authenticated) {
    return (
      <Link className="dropdown-item d-flex align-items-center gap-2 rounded-2 py-2 cheer-user-menu-item" to={to}>
        {createElement(Icon, { size: 18, "aria-hidden": "true" })}
        {label}
      </Link>
    );
  }

  return (
    <button
      className="dropdown-item d-flex align-items-center gap-2 rounded-2 py-2 cheer-user-menu-item"
      type="button"
      data-bs-toggle="modal"
      data-bs-target="#LoginModal"
    >
      {createElement(Icon, { size: 18, "aria-hidden": "true" })}
      {label}
    </button>
  );
}

function UserMenu() {
  const { authenticated, isInstituicao, logout, status } = useAuth();

  return (
    <div className="dropdown ms-lg-3 cheer-user-menu">
      <button
        className="btn btn-outline-primary rounded-pill d-inline-flex align-items-center gap-2 p-1 pe-2 cheer-btn-secondary cheer-user-trigger"
        id="cheer-user-dropdown"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        aria-label="Abrir menu de usuário"
      >
        <span className="badge rounded-circle d-inline-flex align-items-center justify-content-center cheer-user-avatar">
          <UserRound size={21} aria-hidden="true" />
        </span>
        <span className="cheer-user-label">{authenticated ? "Minha conta" : "Conta"}</span>
        <ChevronDown size={16} aria-hidden="true" />
      </button>

      <div
        className="dropdown-menu dropdown-menu-end p-2 cheer-user-dropdown"
        aria-labelledby="cheer-user-dropdown"
      >
        <div className="px-2 pt-1 pb-2 cheer-user-menu-header">
          <p className="mb-1">Área do usuário</p>
          <small>{authenticated ? "Sessão conectada à Cheer." : "Entre para acompanhar suas ações."}</small>
        </div>

        {authenticated ? (
          <button
            className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-2 cheer-btn-secondary cheer-user-login"
            type="button"
            onClick={logout}
          >
            <LogOut size={18} aria-hidden="true" />
            Sair
          </button>
        ) : (
          <button
            className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2 cheer-btn-primary cheer-user-login"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#LoginModal"
            disabled={status === "loading"}
          >
            <LogIn size={18} aria-hidden="true" />
            {status === "loading" ? "Verificando..." : "Entrar"}
          </button>
        )}

        <hr className="dropdown-divider my-2" />

        {protectedOptions.map((option) => (
          <ProtectedOption key={option.label} authenticated={authenticated} {...option} />
        ))}
        {isInstituicao && (
          <ProtectedOption authenticated={authenticated} label="Criar evento" Icon={Building2} to="/criar-evento" />
        )}

        <hr className="dropdown-divider my-2" />

        <Link className="dropdown-item d-flex align-items-center gap-2 rounded-2 py-2 cheer-user-menu-item" to="/registro">
          <UserRound size={18} aria-hidden="true" />
          Criar conta de voluntário
        </Link>
        <Link className="dropdown-item d-flex align-items-center gap-2 rounded-2 py-2 cheer-user-menu-item" to="/cadastro-instituicao">
          <Building2 size={18} aria-hidden="true" />
          Cadastrar instituição
        </Link>
      </div>
    </div>
  );
}

export default UserMenu;

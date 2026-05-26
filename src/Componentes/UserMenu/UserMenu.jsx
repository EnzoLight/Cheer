import { createElement } from "react";
import {
  Building2,
  CalendarHeart,
  ChevronDown,
  LogIn,
  Settings2,
  UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./UserMenu.css";

const protectedOptions = [
  { label: "Meu perfil", Icon: UserRound },
  { label: "Minhas atividades", Icon: CalendarHeart },
  { label: "Preferências", Icon: Settings2 },
];

function ProtectedOption({ label, Icon }) {
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
        <span className="cheer-user-label">Conta</span>
        <ChevronDown size={16} aria-hidden="true" />
      </button>

      <div
        className="dropdown-menu dropdown-menu-end p-2 cheer-user-dropdown"
        aria-labelledby="cheer-user-dropdown"
      >
        <div className="px-2 pt-1 pb-2 cheer-user-menu-header">
          <p className="mb-1">Área do usuário</p>
          <small>Entre para acompanhar suas ações.</small>
        </div>

        <button
          className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2 cheer-btn-primary cheer-user-login"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#LoginModal"
        >
          <LogIn size={18} aria-hidden="true" />
          Entrar
        </button>

        <hr className="dropdown-divider my-2" />

        {protectedOptions.map((option) => (
          <ProtectedOption key={option.label} {...option} />
        ))}

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

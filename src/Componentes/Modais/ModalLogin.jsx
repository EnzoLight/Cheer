import { ArrowRight, Building2, Lock, Mail, ShieldCheck, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../Input/Input";
import Logo from "../Logo/Logo";
import "./ModalLogin.css";

function ModalLogin() {
  function preventSubmit(event) {
    event.preventDefault();
  }

  return (
    <div
      className="modal fade login-modal"
      id="LoginModal"
      tabIndex="-1"
      aria-labelledby="loginModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content border-0 overflow-hidden login-modal-content">
          <div className="row g-0">
          <aside className="col-md-5 p-4 p-lg-5 d-none d-md-flex flex-column justify-content-center login-modal-aside">
            <Logo className="login-modal-logo" alt="" />
            <p className="login-modal-kicker">CHEER</p>
            <h2>Conecte-se à sua rede de impacto</h2>
            <p className="login-modal-copy">
              Acompanhe oportunidades, atividades e instituições em um ambiente seguro.
            </p>
            <div className="d-flex align-items-start gap-2 p-3 rounded-3 login-modal-trust">
              <ShieldCheck size={21} aria-hidden="true" />
              <span>Participação com confiança e transparência.</span>
            </div>
          </aside>

          <section className="col-md-7 p-4 p-lg-5 position-relative login-modal-panel">
            <header className="mb-4 login-modal-header">
              <p className="login-modal-kicker">BEM-VINDO DE VOLTA</p>
              <h2 id="loginModalLabel">Entrar na Cheer</h2>
              <p>Informe seus dados para continuar.</p>
              <button
                type="button"
                className="btn-close position-absolute top-0 end-0 m-4 login-modal-close"
                data-bs-dismiss="modal"
                aria-label="Fechar"
              />
            </header>

            <form className="login-modal-form" onSubmit={preventSubmit}>
              <Input
                id="login-email"
                name="email"
                type="email"
                label="Email"
                placeholder="seu@email.com"
                autoComplete="email"
                Icon={Mail}
                iconPosition="left"
              />
              <Input
                id="login-password"
                name="password"
                type="password"
                label="Senha"
                placeholder="Digite sua senha"
                autoComplete="current-password"
                Icon={Lock}
                iconPosition="left"
              />

              <button
                id="btn_login"
                className="btn btn-primary cheer-btn-primary w-100 py-3 d-flex align-items-center justify-content-center gap-2 fw-semibold mt-2"
                type="button"
                data-bs-dismiss="modal"
              >
                Entrar
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </form>

            <footer className="border-top pt-3 mt-4 login-modal-register">
              <p className="text-center mb-3">Ainda não tem cadastro?</p>
              <div className="row g-2">
                <div className="col-sm-6">
                <Link className="btn btn-outline-primary cheer-btn-secondary w-100 d-flex align-items-center justify-content-center gap-2" to="/registro" data-bs-dismiss="modal">
                  <UserRound size={18} aria-hidden="true" />
                  Sou voluntário
                </Link>
                </div>
                <div className="col-sm-6">
                <Link className="btn btn-outline-primary cheer-btn-secondary w-100 d-flex align-items-center justify-content-center gap-2" to="/cadastro-instituicao" data-bs-dismiss="modal">
                  <Building2 size={18} aria-hidden="true" />
                  Sou instituição
                </Link>
                </div>
              </div>
            </footer>
          </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalLogin;

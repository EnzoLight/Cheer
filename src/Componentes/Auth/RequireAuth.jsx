import { LogIn, RefreshCw, ShieldCheck } from "lucide-react";
import useAuth from "../../Contextos/useAuth";
import UserNavbar from "../UserNavbar";
import ModalLogin from "../Modais/ModalLogin";
import "./RequireAuth.css";

function RequireAuth({ children }) {
  const { authenticated, error, login, refreshSession, status } = useAuth();

  if (authenticated) {
    return children;
  }

  const isLoading = status === "loading";
  const hasError = status === "error";

  return (
    <>
      <section className="auth-gate-page">
        <UserNavbar />
        <main className="auth-gate-main py-4 py-lg-5">
          <div className="container">
            <section className="card border-0 p-4 p-lg-5 mx-auto text-center auth-gate-card">
              <div className="d-flex align-items-center justify-content-center mx-auto mb-3 auth-gate-icon">
                <ShieldCheck size={28} aria-hidden="true" />
              </div>

              {isLoading ? (
                <>
                  <h1 className="h4 mb-2">Verificando sua sessão</h1>
                  <p className="mb-0 auth-gate-copy">Aguarde enquanto carregamos seu acesso.</p>
                  <div className="spinner-border text-primary mx-auto mt-4" role="status">
                    <span className="visually-hidden">Carregando...</span>
                  </div>
                </>
              ) : hasError ? (
                <>
                  <h1 className="h4 mb-2">Não foi possível validar sua sessão</h1>
                  <p className="mb-4 auth-gate-copy">
                    {error?.message || "Tente novamente para acessar esta área."}
                  </p>
                  <button className="btn btn-outline-primary cheer-btn-secondary py-3 d-flex align-items-center justify-content-center gap-2" type="button" onClick={refreshSession}>
                    <RefreshCw size={18} aria-hidden="true" />
                    Tentar novamente
                  </button>
                </>
              ) : (
                <>
                  <h1 className="h4 mb-2">Entre para continuar</h1>
                  <p className="mb-4 auth-gate-copy">
                    Esta área exige uma sessão autenticada na Cheer.
                  </p>
                  <button className="btn btn-primary cheer-btn-primary py-3 d-flex align-items-center justify-content-center gap-2" type="button" onClick={login}>
                    <LogIn size={18} aria-hidden="true" />
                    Entrar com segurança
                  </button>
                </>
              )}
            </section>
          </div>
        </main>
      </section>

      <ModalLogin />
    </>
  );
}

export default RequireAuth;

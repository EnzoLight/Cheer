import { Navigate } from "react-router-dom";
import useAuth from "../../Contextos/useAuth";
import UserNavbar from "../UserNavbar";
import "./RequireAuth.css";

function RequireGuest({ children }) {
  const { authenticated, status } = useAuth();

  if (status === "loading") {
    return (
      <section className="auth-gate-page">
        <UserNavbar />
        <main className="auth-gate-main py-4 py-lg-5">
          <div className="container">
            <section className="card border-0 p-4 p-lg-5 mx-auto text-center auth-gate-card">
              <h1 className="h4 mb-2">Verificando sua sessão</h1>
              <p className="mb-0 auth-gate-copy">Aguarde enquanto carregamos seu acesso.</p>
              <div className="spinner-border text-primary mx-auto mt-4" role="status">
                <span className="visually-hidden">Carregando...</span>
              </div>
            </section>
          </div>
        </main>
      </section>
    );
  }

  if (authenticated) {
    return <Navigate to="/perfil" replace />;
  }

  return children;
}

export default RequireGuest;

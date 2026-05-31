import { createElement } from "react";
import { Building2, CalendarHeart, Mail, MapPinned, Phone, RefreshCw, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import "./Perfil.css";
import UserNavbar from "../../Componentes/UserNavbar";
import ModalLogin from "../../Componentes/Modais/ModalLogin";
import voluntariadosImage from "../../assets/voluntariados.jpg";
import useAuth from "../../Contextos/useAuth";

function ProfileInfo({ Icon, label, value }) {
  return (
    <div className="perfil-info-item">
      <span className="perfil-info-icon" aria-hidden="true">
        {createElement(Icon, { size: 18 })}
      </span>
      <div>
        <span className="perfil-info-label">{label}</span>
        <strong>{value || "Não informado"}</strong>
      </div>
    </div>
  );
}

function Perfil() {
  const {
    isInstituicao,
    profile,
    profileError,
    profileStatus,
    refreshProfile,
  } = useAuth();

  const isLoading = profileStatus === "loading";
  const hasError = profileStatus === "error";
  const accountLabel = isInstituicao ? "Instituição" : "Voluntário";
  const location = [profile?.cidade, profile?.uf].filter(Boolean).join(" - ");

  return (
    <>
      <section className="perfil-page">
        <UserNavbar />

        <main className="perfil-main py-4 py-lg-5">
          <div className="container">
            <div className="row g-4 align-items-start">
              <div className="col-lg-7">
                <section className="card border-0 p-4 p-lg-5 perfil-card">
                  <p className="perfil-kicker mb-2">SEU PERFIL</p>
                  <h1 className="mb-4">{isInstituicao ? "Perfil da instituição" : "Perfil do voluntário"}</h1>

                  {isLoading ? (
                    <div className="perfil-state" role="status">
                      <div className="spinner-border text-primary" aria-hidden="true" />
                      <p className="mb-0">Carregando dados do perfil...</p>
                    </div>
                  ) : hasError ? (
                    <div className="perfil-state" role="alert">
                      <p className="perfil-copy mb-3">
                        {profileError?.message || "Não foi possível carregar seu perfil."}
                      </p>
                      <button className="btn btn-outline-primary cheer-btn-secondary d-inline-flex align-items-center gap-2" type="button" onClick={refreshProfile}>
                        <RefreshCw size={18} aria-hidden="true" />
                        Tentar novamente
                      </button>
                    </div>
                  ) : (
                    <>
                      <section className="card border-0 p-4 mb-4 perfil-panel">
                        <div className="d-flex align-items-center gap-3 mb-3">
                          <span className="perfil-avatar" aria-hidden="true">
                            {isInstituicao ? <Building2 size={24} /> : <UserRound size={24} />}
                          </span>
                          <div>
                            <span className="perfil-info-label">{accountLabel}</span>
                            <h2 className="h4 mb-0">{profile?.nome || "Conta Cheer"}</h2>
                          </div>
                        </div>
                        <p className="perfil-copy mb-0">
                          {isInstituicao
                            ? "Gerencie as oportunidades publicadas pela sua organização."
                            : "Acompanhe oportunidades e atividades vinculadas à sua conta."}
                        </p>
                      </section>

                      <section className="card border-0 p-4 perfil-panel">
                        <h2 className="h5 mb-3">Dados cadastrados</h2>
                        <div className="perfil-info-grid">
                          <ProfileInfo Icon={Mail} label="Email" value={profile?.email} />
                          <ProfileInfo Icon={Phone} label="Telefone" value={profile?.telefone} />
                          {isInstituicao && (
                            <ProfileInfo Icon={Building2} label="Categoria" value={profile?.categoria} />
                          )}
                          <ProfileInfo Icon={MapPinned} label="Localização" value={location} />
                        </div>
                      </section>
                    </>
                  )}
                </section>
              </div>

              <div className="col-lg-5">
                <aside className="card border-0 overflow-hidden perfil-card">
                  <img className="card-img-top perfil-cover" src={voluntariadosImage} alt="Voluntários em uma ação social" />
                  <div className="card-body p-4">
                    <p className="perfil-kicker mb-2">{isInstituicao ? "INSTITUIÇÃO" : "OPORTUNIDADES"}</p>
                    <h2 className="h4 mb-2">{isInstituicao ? "Publique novas ações" : "Encontre ações perto de você"}</h2>
                    <p className="perfil-copy mb-4">
                      {isInstituicao
                        ? "Crie eventos e acompanhe as oportunidades abertas para voluntários."
                        : "Consulte eventos disponíveis e participe de projetos da comunidade."}
                    </p>
                    <div className="d-grid gap-2">
                      {isInstituicao && (
                        <Link className="btn btn-primary cheer-btn-primary py-3 d-flex align-items-center justify-content-center gap-2 fw-bold" to="/criar-evento">
                          <Building2 size={18} aria-hidden="true" />
                          Criar evento
                        </Link>
                      )}
                      <Link className="btn btn-outline-primary cheer-btn-secondary py-3 d-flex align-items-center justify-content-center gap-2 fw-bold" to={isInstituicao ? "/eventos" : "/calendario"}>
                        {isInstituicao ? <MapPinned size={18} aria-hidden="true" /> : <CalendarHeart size={18} aria-hidden="true" />}
                        {isInstituicao ? "Ver eventos" : "Minhas atividades"}
                      </Link>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </main>
      </section>

      <ModalLogin />
    </>
  );
}

export default Perfil;

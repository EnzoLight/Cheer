import { useCallback, useEffect, useState } from "react";
import { CalendarHeart, RefreshCw } from "lucide-react";
import "./Calendario.css";
import UserNavbar from "../../Componentes/UserNavbar";
import ModalLogin from "../../Componentes/Modais/ModalLogin";
import useAuth from "../../Contextos/useAuth";
import { listMeusEventos, listMinhasInscricoes } from "../../Servicos/cheerApi";

function ActivityCard({ activity, isInstituicao }) {
  const location = [activity.cidade, activity.uf].filter(Boolean).join(" - ");

  return (
    <article className="card border-0 calendario-card-item">
      <div className="card-body p-3">
        <div className="d-flex align-items-start justify-content-between gap-3 mb-2">
          <h2 className="h6 mb-0">{activity.titulo}</h2>
          <span className="badge rounded-pill calendario-status">
            {isInstituicao ? `${activity.inscritos ?? 0} inscritos` : activity.status || "Inscrito"}
          </span>
        </div>
        <p className="calendario-copy mb-2">{activity.instituicao}</p>
        <dl className="row g-2 mb-0 calendario-details">
          <dt className="col-sm-4">Data</dt>
          <dd className="col-sm-8">{activity.data || "Não informada"}</dd>
          <dt className="col-sm-4">Local</dt>
          <dd className="col-sm-8">{location || "Não informado"}</dd>
          {!isInstituicao && activity.data_inscricao && (
            <>
              <dt className="col-sm-4">Inscrição</dt>
              <dd className="col-sm-8">{activity.data_inscricao}</dd>
            </>
          )}
        </dl>
      </div>
    </article>
  );
}

function Calendario() {
  const { isInstituicao } = useAuth();
  const [activities, setActivities] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  const loadActivities = useCallback(async () => {
    setStatus("loading");
    setError(null);

    try {
      const response = isInstituicao ? await listMeusEventos() : await listMinhasInscricoes();
      setActivities(response.data || []);
      setStatus("loaded");
    } catch (requestError) {
      setActivities([]);
      setError(requestError.message || "Não foi possível carregar suas atividades.");
      setStatus("error");
    }
  }, [isInstituicao]);

  useEffect(() => {
    void Promise.resolve().then(loadActivities);
  }, [loadActivities]);

  return (
    <>
      <section className="calendario-page">
        <UserNavbar />

        <main className="calendario-main py-4 py-lg-5">
          <div className="container">
            <section className="card border-0 p-4 p-lg-5 calendario-card">
              <div className="d-flex align-items-center gap-3 mb-4">
                <span className="calendario-icon" aria-hidden="true">
                  <CalendarHeart size={24} />
                </span>
                <div>
                  <p className="calendario-kicker mb-1">MINHAS ATIVIDADES</p>
                  <h1 className="h3 mb-0">{isInstituicao ? "Eventos publicados" : "Inscrições em eventos"}</h1>
                </div>
              </div>

              {status === "loading" ? (
                <div className="calendario-state" role="status">
                  <div className="spinner-border text-primary" aria-hidden="true" />
                  <p className="mb-0">Carregando atividades...</p>
                </div>
              ) : status === "error" ? (
                <div className="calendario-state" role="alert">
                  <p className="mb-3">{error}</p>
                  <button className="btn btn-outline-primary cheer-btn-secondary d-inline-flex align-items-center gap-2" type="button" onClick={loadActivities}>
                    <RefreshCw size={18} aria-hidden="true" />
                    Tentar novamente
                  </button>
                </div>
              ) : activities.length === 0 ? (
                <div className="calendario-state">
                  <p className="mb-0">
                    {isInstituicao ? "Sua instituição ainda não publicou eventos." : "Você ainda não possui inscrições."}
                  </p>
                </div>
              ) : (
                <div className="calendario-list">
                  {activities.map((activity) => (
                    <ActivityCard key={activity.id} activity={activity} isInstituicao={isInstituicao} />
                  ))}
                </div>
              )}
            </section>
          </div>
        </main>
      </section>

      <ModalLogin />
    </>
  );
}

export default Calendario;

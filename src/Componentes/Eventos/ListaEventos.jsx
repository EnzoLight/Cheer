import ContainerEvento from "../ContainerEvento";
import { EventosPanel } from "./EventosLayout";

function ListaEventos({
  eventos = [],
  title = "Eventos disponíveis",
  description = "Explore oportunidades para participar.",
  kicker = "CHEER EVENTOS",
  isLoading = false,
  error = null,
  emptyMessage = "Nenhum evento encontrado.",
  onRetry,
}) {
  return (
    <EventosPanel
      kicker={kicker}
      title={title}
      description={description}
      className="col-lg-5 eventos-list-panel"
    >
      {isLoading ? (
        <div className="eventos-state" role="status">
          <div className="spinner-border text-primary" aria-hidden="true" />
          <p className="mb-0">Carregando eventos...</p>
        </div>
      ) : error ? (
        <div className="eventos-state" role="alert">
          <p className="mb-3">{error}</p>
          {onRetry && (
            <button className="btn btn-outline-primary cheer-btn-secondary" type="button" onClick={onRetry}>
              Tentar novamente
            </button>
          )}
        </div>
      ) : eventos.length === 0 ? (
        <div className="eventos-state">
          <p className="mb-0">{emptyMessage}</p>
        </div>
      ) : (
        <div className="overflow-auto eventos-lista">
          {eventos.map((evento) => (
            <ContainerEvento key={evento.id} {...evento} />
          ))}
        </div>
      )}
    </EventosPanel>
  );
}

export default ListaEventos;

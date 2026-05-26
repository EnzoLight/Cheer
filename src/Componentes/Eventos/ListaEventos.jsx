import ContainerEvento from "../ContainerEvento";
import { EventosPanel } from "./EventosLayout";

function ListaEventos({
  eventos,
  title = "Eventos disponíveis",
  description = "Explore oportunidades para participar.",
  kicker = "CHEER EVENTOS",
}) {
  return (
    <EventosPanel
      kicker={kicker}
      title={title}
      description={description}
      className="col-lg-5 eventos-list-panel"
    >
      <div className="overflow-auto eventos-lista">
        {eventos.map((evento) => (
          <ContainerEvento key={evento.id} {...evento} />
        ))}
      </div>
    </EventosPanel>
  );
}

export default ListaEventos;

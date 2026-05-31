import { useCallback, useEffect, useState } from "react";
import InstituicaoNavbar from "../../Componentes/InstituicaoNavbar";
import ModalLogin from "../../Componentes/Modais/ModalLogin";
import { EventosPage, EventosPanel } from "../../Componentes/Eventos/EventosLayout";
import ListaEventos from "../../Componentes/Eventos/ListaEventos";
import FormularioEvento from "../../Componentes/Eventos/FormularioEvento";
import { listMeusEventos } from "../../Servicos/cheerApi";

function CriarEvento() {
  const [eventos, setEventos] = useState([]);
  const [eventosStatus, setEventosStatus] = useState("loading");
  const [eventosError, setEventosError] = useState(null);

  const loadMeusEventos = useCallback(async () => {
    setEventosStatus("loading");
    setEventosError(null);

    try {
      const response = await listMeusEventos();
      setEventos(response.data || []);
      setEventosStatus("loaded");
    } catch (error) {
      setEventos([]);
      setEventosError(error.message || "Não foi possível carregar os eventos da instituição.");
      setEventosStatus("error");
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(loadMeusEventos);
  }, [loadMeusEventos]);

  return (
    <>
      <EventosPage navbar={<InstituicaoNavbar />}>
        <EventosPanel
          className="col-lg-7"
          kicker="INSTITUIÇÃO"
          title="Criar evento"
          description="Informe os detalhes para publicar uma nova oportunidade de voluntariado."
        >
          <FormularioEvento onCreated={loadMeusEventos} />
        </EventosPanel>

        <ListaEventos
          eventos={eventos}
          title="Meus eventos"
          description="Acompanhe as ações publicadas pela sua instituição."
          isLoading={eventosStatus === "loading"}
          error={eventosStatus === "error" ? eventosError : null}
          emptyMessage="Sua instituição ainda não publicou eventos."
          onRetry={loadMeusEventos}
        />
      </EventosPage>

      <ModalLogin />
    </>
  );
}

export default CriarEvento;

import { useCallback, useEffect, useState } from "react";
import "./Evento.css";
import { useJsApiLoader } from "@react-google-maps/api";
import UserNavbar from "../../Componentes/UserNavbar";
import BuscarEndereco from "../../Componentes/BuscarEndereco";
import ModalLogin from "../../Componentes/Modais/ModalLogin";
import Mapa from "../../Componentes/Mapa";
import { EventosPage, EventosPanel } from "../../Componentes/Eventos/EventosLayout";
import ListaEventos from "../../Componentes/Eventos/ListaEventos";
import { listEventos } from "../../Servicos/cheerApi";

function Evento() {
  const [eventos, setEventos] = useState([]);
  const [eventosStatus, setEventosStatus] = useState("loading");
  const [eventosError, setEventosError] = useState(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const loadEventos = useCallback(async () => {
    setEventosStatus("loading");
    setEventosError(null);

    try {
      const response = await listEventos();
      setEventos(response.data || []);
      setEventosStatus("loaded");
    } catch (error) {
      setEventos([]);
      setEventosError(error.message || "Não foi possível carregar os eventos.");
      setEventosStatus("error");
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(loadEventos);
  }, [loadEventos]);

  return (
    <>
      <EventosPage navbar={<UserNavbar />}>
        <EventosPanel
          className="col-lg-7"
          kicker="ENCONTRE UMA AÇÃO"
          title="Mapa de eventos"
          description="Consulte iniciativas próximas e use o endereço para orientar sua busca."
        >
          <div className="rounded-3 overflow-hidden evento-map-frame">
            {isLoaded ? (
              <Mapa />
            ) : (
              <p className="h-100 m-0 d-flex align-items-center justify-content-center evento-map-loading">Carregando mapa...</p>
            )}
          </div>

          <BuscarEndereco
            title="Localização"
            showExtraFields={false}
            className="mt-4 p-3 border evento-endereco"
            idPrefix="busca-endereco"
          />
        </EventosPanel>

        <ListaEventos
          eventos={eventos}
          title="Eventos disponíveis"
          description="Oportunidades abertas para voluntários."
          isLoading={eventosStatus === "loading"}
          error={eventosStatus === "error" ? eventosError : null}
          emptyMessage="Nenhum evento disponível no momento."
          onRetry={loadEventos}
        />
      </EventosPage>

      <ModalLogin />
    </>
  );
}

export default Evento;

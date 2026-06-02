import { useCallback, useEffect, useState } from "react";
import "./Evento.css";
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
  const [mapCenter, setMapCenter] = useState(null);
  const [locationStatus, setLocationStatus] = useState(() => {
    if (typeof navigator === "undefined") {
      return "loading";
    }

    return navigator.geolocation ? "loading" : "unavailable";
  });

  const loadEventos = useCallback(async (location = null) => {
    setEventosStatus("loading");
    setEventosError(null);

    try {
      const response = await listEventos(location ? {
        lat: location.lat,
        lng: location.lng,
      } : {});

      setEventos(response.data || []);
      setEventosStatus("loaded");
    } catch (error) {
      setEventos([]);
      setEventosError(error.message || "Não foi possível carregar os eventos.");
      setEventosStatus("error");
    }
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      void Promise.resolve().then(() => loadEventos());
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        setMapCenter([location.lat, location.lng]);
        setLocationStatus("ready");
        void Promise.resolve().then(() => loadEventos(location));
      },
      () => {
        setLocationStatus("denied");
        void Promise.resolve().then(() => loadEventos());
      },
      {
        enableHighAccuracy: false,
        timeout: 8000,
        maximumAge: 600000,
      },
    );
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
            {eventosStatus === "loading" ? (
              <p className="h-100 m-0 d-flex align-items-center justify-content-center evento-map-loading">Carregando mapa...</p>
            ) : (
              <Mapa eventos={eventos} center={mapCenter} />
            )}
          </div>

          {locationStatus === "denied" && (
            <p className="mt-3 mb-0 text-muted evento-map-hint">
              Permita o acesso à localização para ver os eventos próximos no mapa.
            </p>
          )}

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

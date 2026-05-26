import InstituicaoNavbar from "../../Componentes/InstituicaoNavbar";
import ModalLogin from "../../Componentes/Modais/ModalLogin";
import { eventosDemonstracao } from "../../Componentes/Eventos/eventosDemonstracao";
import { EventosPage, EventosPanel } from "../../Componentes/Eventos/EventosLayout";
import ListaEventos from "../../Componentes/Eventos/ListaEventos";
import FormularioEvento from "../../Componentes/Eventos/FormularioEvento";

function CriarEvento() {
  return (
    <>
      <EventosPage navbar={<InstituicaoNavbar />}>
        <EventosPanel
          className="col-lg-7"
          kicker="INSTITUIÇÃO"
          title="Criar evento"
          description="Informe os detalhes para publicar uma nova oportunidade de voluntariado."
        >
          <FormularioEvento />
        </EventosPanel>

        <ListaEventos
          eventos={eventosDemonstracao}
          title="Eventos próximos"
          description="Acompanhe as ações já publicadas."
        />
      </EventosPage>

      <ModalLogin />
    </>
  );
}

export default CriarEvento;

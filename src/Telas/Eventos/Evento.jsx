import { useState } from 'react';
import "./Evento.css";
import { Link } from 'react-router-dom';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import UserNavbar from '../../Componentes/UserNavbar';
import BuscarEndereco from '../../Componentes/BuscarEndereco';
import ModalLogin from '../../Componentes/Modais/ModalLogin';
import ContainerEvento from '../../Componentes/ContainerEvento';

function Evento() {

  const [eventos] = useState([
    { id: 1, titulo: "Arrecadação de Alimentos", tipo: "Arrecadação", descricao: "Ajude famílias carentes da região central.", data_hora_inicio: "20/05/2024 08:00", data_hora_fim: "20/05/2024 14:00", local: "Centro" },
    { id: 2, titulo: "Mutirão de Limpeza", tipo: "Organização", descricao: "Limpeza da praia e conscientização ambiental.", data_hora_inicio: "22/05/2024 10:00", data_hora_fim: "22/05/2024 12:00", local: "Praia do Sol" },
    { id: 3, titulo: "Aula de Reforço", tipo: "Preparação", descricao: "Voluntários para ensinar matemática para crianças.", data_hora_inicio: "25/05/2024 14:00", data_hora_fim: "25/05/2024 15:30", local: "Escola Municipal" },
    { id: 4, titulo: "Campanha de Doação de Sangue", tipo: "Doação", descricao: "Parceria com o Hemocentro para salvar vidas.", data_hora_inicio: "28/05/2024 09:00", data_hora_fim: "28/05/2024 17:00", local: "Hospital Santa Casa" },
    { id: 5, titulo: "Oficina de Reciclagem", tipo: "Preparação", descricao: "Ensine crianças a transformar lixo em arte.", data_hora_inicio: "30/05/2024 14:00", data_hora_fim: "30/05/2024 16:00", local: "Centro Comunitário" },
    { id: 6, titulo: "Passeio com Cães do Abrigo", tipo: "Organização", descricao: "Dê carinho e exercício para animais resgatados.", data_hora_inicio: "01/06/2024 08:30", data_hora_fim: "01/06/2024 11:00", local: "Abrigo Patas Felizes" },
    { id: 7, titulo: "Distribuição de Agasalhos", tipo: "Doação", descricao: "Entrega de cobertores e roupas para moradores de rua.", data_hora_inicio: "03/06/2024 20:00", data_hora_fim: "03/06/2024 23:00", local: "Praça da Sé" }
  ]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  return (
    <>
      <section id="center">

        {/*Navbar*/}
        <UserNavbar />

        <div className="container-fluid flex-grow-1 evento-main-container">
          <div className="evento-left-section">
            <h1 className="evento-title" style={{ fontFamily: 'Poppins', fontWeight: 'bold' }}>Mapa do Evento</h1>

            <div className="map-container evento-map-container">

              {isLoaded ? (
                <GoogleMap
                  mapContainerStyle={{ width: '80%', height: '100%', borderRadius: '40px' }}
                  center={{
                    lat: -23.663611,
                    lng: -46.460177
                  }}
                  zoom={15}
                ></GoogleMap>
              ) : (
                <></>
              )}

              <div className="evento-inputs-container">
                <BuscarEndereco />
              </div>
            </div>
          </div>

          <div className="evento-right-section d-flex flex-column">
            <h1 className="evento-title mb-4" style={{ fontFamily: 'Poppins', fontWeight: 'bold' }}>Eventos Disponíveis</h1>
            <div className="event-sidebar flex-grow-1 w-100" style={{ maxHeight: '680px', overflowY: 'auto', paddingRight: '10px' }}>
              {eventos.map(evento => (
                <ContainerEvento
                  key={evento.id}
                  titulo={evento.titulo}
                  tipo={evento.tipo}
                  descricao={evento.descricao}
                  data_hora_inicio={evento.data_hora_inicio}
                  data_hora_fim={evento.data_hora_fim}
                  local={evento.local}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/*Modais*/}
      <ModalLogin />
    </>
  )
}

export default Evento;
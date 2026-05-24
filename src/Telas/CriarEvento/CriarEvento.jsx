import { useState } from 'react'
import "./CriarEvento.css"
import { Link } from 'react-router-dom'
import ContainerEvento from '../../Componentes/ContainerEvento';
import UserNavbar from '../../Componentes/InstituicaoNavbar';
import ModalLogin from '../../Componentes/Modais/ModalLogin'
import { motion } from "framer-motion";
import { ScrollAnimate } from "../../Componentes/animacaoScroll";
import InstituicaoNavbar from '../../Componentes/InstituicaoNavbar';

function CriarEvento() {
    //Teste de formatação de eventos
    const [eventos, setEventos] = useState([
        { id: 1, titulo: "Arrecadação de Alimentos", descricao: "Ajude famílias carentes da região central.", data_hora_inicio: "20/05/2024 08:00", data_hora_fim: "20/05/2024 14:00", local: "Centro" },
        { id: 2, titulo: "Mutirão de Limpeza", descricao: "Limpeza da praia e conscientização ambiental.", data_hora_inicio: "22/05/2024 10:00", data_hora_fim: "22/05/2024 12:00", local: "Praia do Sol" },
        { id: 3, titulo: "Aula de Reforço", descricao: "Voluntários para ensinar matemática para crianças.", data_hora_inicio: "25/05/2024 14:00", data_hora_fim: "25/05/2024 15:30", local: "Escola Municipal" },
        { id: 4, titulo: "Campanha de Doação de Sangue", descricao: "Parceria com o Hemocentro para salvar vidas.", data_hora_inicio: "28/05/2024 09:00", data_hora_fim: "28/05/2024 17:00", local: "Hospital Santa Casa" },
        { id: 5, titulo: "Oficina de Reciclagem", descricao: "Ensine crianças a transformar lixo em arte.", data_hora_inicio: "30/05/2024 14:00", data_hora_fim: "30/05/2024 16:00", local: "Centro Comunitário" },
        { id: 6, titulo: "Passeio com Cães do Abrigo", descricao: "Dê carinho e exercício para animais resgatados.", data_hora_inicio: "01/06/2024 08:30", data_hora_fim: "01/06/2024 11:00", local: "Abrigo Patas Felizes" },
        { id: 7, titulo: "Distribuição de Agasalhos", descricao: "Entrega de cobertores e roupas para moradores de rua.", data_hora_inicio: "03/06/2024 20:00", data_hora_fim: "03/06/2024 23:00", local: "Praça da Sé" }
    ]);
    return (
        <>
            <section style={{ background: 'linear-gradient(to bottom, #d9fcd6, #FFFFFF )', minHeight: '92vh' }}>
                <InstituicaoNavbar />

                <div className='container mt-5' style={{ width: '100%', height: '100%', alignContent: 'center', alignItems: 'center' }}>
                    <div className='row d-flex align-items-center' style={{ minHeight: '400px' }}>

                        <div className='sub_container col-md-7' style={{ backgroundColor: '#fffcf7', minHeight: '660px', marginTop: '30px' }}>
                            <h2 className='titulo'>Detalhes do Evento</h2>
                            <p className='descricao'>Insira os detalhes do evento a ser criado</p>
                            <div style={{ justifySelf: 'center', backgroundColor: '#87b8e6', borderRadius: '5%', width: '700px', height: '700px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <div className="row justify-content-center">
                                    {/*Lado Esquerdo*/}
                                    <div className="col-md-6 d-flex flex-column gap-3">
                                        <div>
                                            <label className="form-label fw-bold">Título do Evento:</label>
                                            <input
                                                className="form-control shadow-sm"
                                                type="text"
                                                placeholder="Digite o Título"
                                            />
                                        </div>

                                        <div>
                                            <label className="form-label fw-bold">Selecione o tipo de evento:</label>
                                            <select className="form-select shadow-sm">
                                                <option defaultValue>Tipo de evento</option>
                                                <option value="1">Doação</option>
                                                <option value="2">Arrecadação</option>
                                                <option value="3">Organização</option>
                                                <option value="4">Preparação</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/*Lado Direito*/}
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold">Descrição do Evento:</label>
                                        <textarea
                                            className="form-control shadow-sm"
                                            rows="5"
                                            placeholder="Descreva os detalhes do evento..."
                                            style={{ width: '300px', height: 'calc(100% - 32px)', resize: 'none' }}
                                        ></textarea>

                                        <label className="form-label fw-bold">Número de voluntários máximo:</label>
                                        <input type='number'></input>
                                    </div>
                                </div>

                                <div className="container-fluid">
                                    <div className="row justify-content-center align-items-center gap-4 py-4">
                                        {/* Bloco 1 */}
                                        <div className="col-auto">
                                            <div className="d-flex flex-column">
                                                <label className="form-label fw-bold mb-2">Data/Hora de Início</label>
                                                <div className="d-flex gap-2">
                                                    <input type="date" className="form-control" />
                                                    <input type="time" className="form-control" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bloco 2 */}
                                        <div className="col-auto">
                                            <div className="d-flex flex-column">
                                                <label className="form-label fw-bold mb-2">Data/Hora de Fim</label>
                                                <div className="d-flex gap-2">
                                                    <input type="date" className="form-control" />
                                                    <input type="time" className="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <label style={{ textAlign: 'center', width: '80%', fontFamily: 'Source-Sans-3', fontWeight: 'bold' }}>Email:</label>
                                <input style={{ width: '300px', height: '30px', marginBottom: '10px' }} type="email" placeholder="Digite seu email" />

                                <label style={{ textAlign: 'center', width: '80%', fontFamily: 'Source-Sans-3', fontWeight: 'bold' }}>Telefone:</label>
                                <input style={{ width: '300px', height: '30px', marginBottom: '10px' }} type="tel" placeholder="Digite seu telefone" />

                                <label style={{ textAlign: 'center', width: '80%', fontFamily: 'Source-Sans-3', fontWeight: 'bold' }}>CPF:</label>
                                <input style={{ width: '300px', height: '30px', marginBottom: '10px' }} type="text" placeholder="Digite seu CPF" />
                            </div>
                        </div>
                        <div className='col-md-1'>

                        </div>
                        <div className='sub_container col-md-4' style={{ backgroundColor: '#fffcf7', minHeight: '660px', marginTop: '30px' }}>
                            <h2 className='titulo' style={{ marginBottom: '20px' }}>Eventos Próximos</h2>
                            <div style={{ maxHeight: '550px', overflowY: 'auto', paddingRight: '5px' }}>
                                {eventos.map(evento => (
                                    <ContainerEvento
                                        key={evento.id}
                                        titulo={evento.titulo}
                                        descricao={evento.descricao}
                                        data_hora_inicio={evento.data_hora_inicio}
                                        data_hora_fim={evento.data_hora_fim}
                                        local={evento.local}
                                    />
                                ))}
                            </div>

                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default CriarEvento
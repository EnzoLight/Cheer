import { useState } from 'react'
import "./CriarEvento.css"
import ContainerEvento from '../../Componentes/ContainerEvento';
import InstituicaoNavbar from '../../Componentes/InstituicaoNavbar';
import ModalLogin from '../../Componentes/Modais/ModalLogin';
import BuscarEndereco from '../../Componentes/BuscarEndereco';

function CriarEvento() {
    const [eventos] = useState([
        { id: 1, titulo: "Arrecadação de Alimentos", tipo: "Arrecadação", descricao: "Ajude famílias carentes da região central.", data_hora_inicio: "20/05/2024 08:00", data_hora_fim: "20/05/2024 14:00", local: "Centro" },
        { id: 2, titulo: "Mutirão de Limpeza", tipo: "Organização", descricao: "Limpeza da praia e conscientização ambiental.", data_hora_inicio: "22/05/2024 10:00", data_hora_fim: "22/05/2024 12:00", local: "Praia do Sol" },
        { id: 3, titulo: "Aula de Reforço", tipo: "Preparação", descricao: "Voluntários para ensinar matemática para crianças.", data_hora_inicio: "25/05/2024 14:00", data_hora_fim: "25/05/2024 15:30", local: "Escola Municipal" },
        { id: 4, titulo: "Campanha de Doação de Sangue", tipo: "Doação", descricao: "Parceria com o Hemocentro para salvar vidas.", data_hora_inicio: "28/05/2024 09:00", data_hora_fim: "28/05/2024 17:00", local: "Hospital Santa Casa" },
        { id: 5, titulo: "Oficina de Reciclagem", tipo: "Preparação", descricao: "Ensine crianças a transformar lixo em arte.", data_hora_inicio: "30/05/2024 14:00", data_hora_fim: "30/05/2024 16:00", local: "Centro Comunitário" },
        { id: 6, titulo: "Passeio com Cães do Abrigo", tipo: "Organização", descricao: "Dê carinho e exercício para animais resgatados.", data_hora_inicio: "01/06/2024 08:30", data_hora_fim: "01/06/2024 11:00", local: "Abrigo Patas Felizes" },
        { id: 7, titulo: "Distribuição de Agasalhos", tipo: "Doação", descricao: "Entrega de cobertores e roupas para moradores de rua.", data_hora_inicio: "03/06/2024 20:00", data_hora_fim: "03/06/2024 23:00", local: "Praça da Sé" }
    ]);

    return (
        <>
            <section className="criar-evento-section">
                <InstituicaoNavbar />

                <div className='container event-page-container mt-5'>
                    {/* Alinhamento stretch garante que as duas colunas tenham a mesma altura visual */}
                    <div className='row g-4 d-flex align-items-stretch'>

                        {/* Coluna Esquerda: Formulário */}
                        <div className='col-lg-7 d-flex'>
                            <div className='sub_container w-100'>
                                <div className='event-panel'>
                                    <h2 className='titulo'>Detalhes do Evento</h2>
                                    <p className='descricao'>Insira os detalhes do evento a ser criado</p>

                                    <div className='event-card'>
                                        <div className='row gx-3 gy-2'>
                                            <div className='col-md-6'>
                                                <div className='form-group' style={{ marginTop: '0px', gap: '0px' }}>
                                                    <label className='form-label'>Título do Evento:</label>
                                                    <input className='form-control shadow-sm' type='text' placeholder='Digite o Título' />
                                                </div>

                                                <div className='form-group'>
                                                    <label className='form-label'>Tipo de evento:</label>
                                                    <select className='form-select shadow-sm'>
                                                        <option value=''>Selecione</option>
                                                        <option value='1'>Doação</option>
                                                        <option value='2'>Arrecadação</option>
                                                        <option value='3'>Organização</option>
                                                        <option value='4'>Preparação</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className='col-md-6'>
                                                <div className='form-group'>
                                                    <label className='form-label'>Descrição:</label>
                                                    <textarea className='form-control shadow-sm event-textarea-small' rows='5' placeholder='Descreva os detalhes...'></textarea>
                                                </div>
                                            </div>

                                            <div className='col-md-6'>
                                                <div className='form-group'>
                                                    <label className='form-label'>Frequência do evento:</label>
                                                    <select className='form-select shadow-sm'>
                                                        <option value=''>Selecione</option>
                                                        <option value='1'>Evento Único</option>
                                                        <option value='2'>Evento Semanal</option>
                                                        <option value='3'>Evento Mensal</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className='col-md-6'>
                                                <div className='form-group'>
                                                    <label className='form-label'>Número máximo de voluntários:</label>
                                                    <input className='form-control shadow-sm' type='number' placeholder='Quantidade' min='1' step='1' />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <BuscarEndereco style={{ backgroundColor: '#f8f9fa00' }} />
                                        </div>

                                        <div className='datetime-row mt-3'>
                                            <div className='datetime-group'>
                                                <label className='form-label'>Data/Hora de Início</label>
                                                <div className='datetime-inputs'>
                                                    <input type='date' className='form-control' />
                                                    <input type='time' className='form-control' />
                                                </div>
                                            </div>

                                            <div className='datetime-group'>
                                                <label className='form-label'>Data/Hora de Fim</label>
                                                <div className='datetime-inputs'>
                                                    <input type='date' className='form-control' />
                                                    <input type='time' className='form-control' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='event-contact-inputs mt-4'>
                                            <div className='contact-group'>
                                                <button id='btn_criar_evento' className='btn btn-primary w-100 py-2 ' style={{ color: 'black', fontFamily: 'Poppins', backgroundColor: '#FF8C00', borderStyle: 'none', fontWeight: 'bold', borderRadius: '12px' }}>Criar Evento</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Coluna Direita: Sidebar */}
                        <div className='col-lg-5 d-flex'>
                            <div className='sub_container w-100 d-flex flex-column'>
                                <h2 className='titulo sidebar-title'>Eventos Próximos</h2>
                                <div className='event-sidebar flex-grow-1'>
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
                </div>
                <ModalLogin />
            </section>
        </>
    )
}

export default CriarEvento;
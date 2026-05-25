import React from 'react';
import "./CSS/ContainerEvento.css";

const ContainerEvento = ({ titulo, tipo = "Geral", descricao, data_hora_inicio, data_hora_fim, local }) => {
    return (
        <div className='ContainerEvento'>
            <h5 className='titulo'>{titulo}</h5>
            <p className='descricao'>{descricao}</p>

            <div className="evento-metadados-grid">
                <div className="metado-bloco">
                    <label className="metado-label">Início</label>
                    <span className="metado-valor">
                        <i className="fas fa-calendar-alt me-1"></i> {data_hora_inicio}
                    </span>
                </div>

                <div className="metado-bloco">
                    <label className="metado-label">Fim</label>
                    <span className="metado-valor">
                        <i className="fas fa-calendar-alt me-1"></i> {data_hora_fim}
                    </span>
                </div>

                <div className="metado-bloco">
                    <label className="metado-label">Tipo</label>
                    <span className="metado-valor text-truncate">
                        <i className="fas fa-tag me-1"></i> {tipo}
                    </span>
                </div>

                <div className="metado-bloco bloco-local">
                    <label className="metado-label">Local</label>
                    <span className="metado-valor text-truncate">
                        <i className="fas fa-map-marker-alt me-1"></i> {local}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ContainerEvento;
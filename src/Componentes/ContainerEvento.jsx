import React from 'react';

const ContainerEvento = ({ titulo, descricao, data_hora_inicio, data_hora_fim, local }) => {
    return (
        <div className='ContainerEvento' style={{borderRadius: '25px'}}>
            <h5 className='titulo' style={{fontSize: 'calc(15px + 0.5vw)' ,fontFamily: 'Poppins', fontWeight: 'bold', color: '#333' }}>{titulo}</h5>
            <p className='descricao' style={{ textAlign: 'center', fontSize: '0.9rem', color: '#666', marginBottom: '10px' }}>{descricao}</p>

            <div className="d-flex justify-content-between" style={{marginRight:'20px', marginLeft:'20px', paddingBottom: '20px', marginBottom: '30px', fontSize: '0.8rem', fontWeight: '600' }}>
                <span style={{}}><i className="fas fa-calendar-alt me-1"></i> {data_hora_inicio}</span>
                <span><i className="fas fa-calendar-alt me-1"></i> {data_hora_fim}</span>
                <span><i className="fas fa-map-marker-alt me-1"></i> {local}</span>
            </div>
        </div>
    );
}

export default ContainerEvento;

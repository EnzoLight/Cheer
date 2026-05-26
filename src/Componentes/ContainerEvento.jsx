import "./CSS/ContainerEvento.css";

const ContainerEvento = ({ titulo, tipo = "Geral", descricao, data_hora_inicio, data_hora_fim, local }) => {
    return (
        <article className="card mb-3 evento-summary">
          <div className="card-body p-3">
            <span className="badge rounded-pill mb-2 evento-summary-type">{tipo}</span>
            <h2 className="evento-summary-title">{titulo}</h2>
            <p className="evento-summary-description">{descricao}</p>

            <div className="row g-2 pt-3 border-top">
                <div className="col-6 evento-summary-detail">
                    <span className="evento-summary-label">Início</span>
                    <span className="evento-summary-value">
                        {data_hora_inicio}
                    </span>
                </div>

                <div className="col-6 evento-summary-detail">
                    <span className="evento-summary-label">Fim</span>
                    <span className="evento-summary-value">
                        {data_hora_fim}
                    </span>
                </div>

                <div className="col-12 evento-summary-detail">
                    <span className="evento-summary-label">Local</span>
                    <span className="evento-summary-value">
                        {local}
                    </span>
                </div>
            </div>
          </div>
        </article>
    );
}

export default ContainerEvento;

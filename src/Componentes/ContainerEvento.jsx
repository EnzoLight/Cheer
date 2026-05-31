import "./CSS/ContainerEvento.css";

function formatValue(value) {
    return value || "Não informado";
}

const ContainerEvento = ({
    titulo,
    tipo,
    tipo_evento,
    descricao,
    data,
    data_hora_inicio,
    data_hora_fim,
    data_hora_termino,
    local,
    cidade,
    uf,
    instituicao,
    vagas,
    inscritos,
}) => {
    const eventType = tipo || tipo_evento || "Geral";
    const startDate = data_hora_inicio || data;
    const endDate = data_hora_fim || data_hora_termino;
    const place = local || [cidade, uf].filter(Boolean).join(" - ");

    return (
        <article className="card mb-3 evento-summary">
          <div className="card-body p-3">
            <span className="badge rounded-pill mb-2 evento-summary-type">{eventType}</span>
            <h2 className="evento-summary-title">{titulo}</h2>
            {instituicao && <p className="evento-summary-institution mb-1">{instituicao}</p>}
            <p className="evento-summary-description">{descricao || "Sem descrição informada."}</p>

            <div className="row g-2 pt-3 border-top">
                <div className="col-6 evento-summary-detail">
                    <span className="evento-summary-label">Início</span>
                    <span className="evento-summary-value">
                        {formatValue(startDate)}
                    </span>
                </div>

                <div className="col-6 evento-summary-detail">
                    <span className="evento-summary-label">Fim</span>
                    <span className="evento-summary-value">
                        {formatValue(endDate)}
                    </span>
                </div>

                <div className="col-12 evento-summary-detail">
                    <span className="evento-summary-label">Local</span>
                    <span className="evento-summary-value">
                        {formatValue(place)}
                    </span>
                </div>

                {(vagas !== undefined || inscritos !== undefined) && (
                    <div className="col-12 evento-summary-detail">
                        <span className="evento-summary-label">Participação</span>
                        <span className="evento-summary-value">
                            {inscritos ?? 0} inscritos{vagas ? ` / ${vagas} vagas` : ""}
                        </span>
                    </div>
                )}
            </div>
          </div>
        </article>
    );
}

export default ContainerEvento;

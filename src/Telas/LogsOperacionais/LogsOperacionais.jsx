import { useCallback, useEffect, useMemo, useState } from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.css";
import { RefreshCw } from "lucide-react";
import InstituicaoNavbar from "../../Componentes/InstituicaoNavbar";
import ModalLogin from "../../Componentes/Modais/ModalLogin";
import { getLogs } from "../../Servicos/cheerApi";
import "../DashboardInstituicao/DashboardInstituicao.css";

// DataTables exposes a static `use` method; this is not a React hook.
// eslint-disable-next-line react-hooks/rules-of-hooks
DataTable.use(DT);

const tableLanguage = {
  search: "Buscar:",
  lengthMenu: "Mostrar _MENU_ registros",
  info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
  infoEmpty: "Nenhum registro disponível",
  zeroRecords: "Nenhum registro encontrado",
  emptyTable: "Nenhum dado disponível",
  paginate: {
    first: "Primeiro",
    last: "Último",
    next: "Próximo",
    previous: "Anterior",
  },
};

function formatDate(value) {
  if (!value) {
    return "Não informada";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

function LogsOperacionais() {
  const [filters, setFilters] = useState({
    nivel: "",
    tipo_evento: "",
    origem: "",
    data_inicio: "",
    data_fim: "",
    per_page: 100,
  });
  const [logs, setLogs] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, per_page: 100, total: 0 });
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  const loadLogs = useCallback(async () => {
    setStatus("loading");
    setError(null);

    try {
      const response = await getLogs(filters);
      setLogs(response.data?.items || []);
      setPagination(response.data?.pagination || { page: 1, per_page: 100, total: 0 });
      setStatus("loaded");
    } catch (requestError) {
      setLogs([]);
      setError(requestError.message || "Não foi possível carregar os logs.");
      setStatus("error");
    }
  }, [filters]);

  useEffect(() => {
    void Promise.resolve().then(loadLogs);
  }, [loadLogs]);

  const tableData = useMemo(() => logs.map((log) => ({
    ...log,
    data_hora_formatada: formatDate(log.data_hora),
    nivel_badge: `<span class="dashboard-status dashboard-status-${log.nivel === "error" ? "rejeitado" : log.nivel === "warning" ? "pendente" : "aprovado"}">${log.nivel}</span>`,
  })), [logs]);

  function updateFilter(event) {
    const { name, value } = event.target;
    setFilters((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function clearFilters() {
    setFilters({
      nivel: "",
      tipo_evento: "",
      origem: "",
      data_inicio: "",
      data_fim: "",
      per_page: 100,
    });
  }

  return (
    <>
      <section className="dashboard-page">
        <InstituicaoNavbar />

        <main className="dashboard-main py-4 py-lg-5">
          <div className="container">
            <header className="dashboard-header mb-4">
              <p className="dashboard-kicker">OPERAÇÕES</p>
              <h1>Logs</h1>
              <p>Consulte os registros operacionais vinculados à sua instituição.</p>
            </header>

            <section className="dashboard-panel mb-4">
              <h2>Filtros</h2>
              <div className="row g-3">
                <div className="col-md-3">
                  <label className="form-label" htmlFor="logs-nivel">Nível</label>
                  <select className="form-select" id="logs-nivel" name="nivel" value={filters.nivel} onChange={updateFilter}>
                    <option value="">Todos</option>
                    <option value="info">Info</option>
                    <option value="warning">Warning</option>
                    <option value="error">Error</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label" htmlFor="logs-tipo">Tipo</label>
                  <input className="form-control" id="logs-tipo" name="tipo_evento" value={filters.tipo_evento} onChange={updateFilter} placeholder="CRIACAO_EVENTO" />
                </div>
                <div className="col-md-2">
                  <label className="form-label" htmlFor="logs-origem">Origem</label>
                  <input className="form-control" id="logs-origem" name="origem" value={filters.origem} onChange={updateFilter} placeholder="api" />
                </div>
                <div className="col-md-2">
                  <label className="form-label" htmlFor="logs-inicio">De</label>
                  <input className="form-control" id="logs-inicio" name="data_inicio" type="datetime-local" value={filters.data_inicio} onChange={updateFilter} />
                </div>
                <div className="col-md-2">
                  <label className="form-label" htmlFor="logs-fim">Até</label>
                  <input className="form-control" id="logs-fim" name="data_fim" type="datetime-local" value={filters.data_fim} onChange={updateFilter} />
                </div>
                <div className="col-12 d-flex flex-wrap gap-2">
                  <button className="btn btn-primary cheer-btn-primary d-inline-flex align-items-center gap-2" type="button" onClick={loadLogs}>
                    <RefreshCw size={18} aria-hidden="true" />
                    Atualizar
                  </button>
                  <button className="btn btn-outline-primary cheer-btn-secondary" type="button" onClick={clearFilters}>
                    Limpar filtros
                  </button>
                </div>
              </div>
            </section>

            {status === "loading" ? (
              <div className="dashboard-state" role="status">Carregando logs...</div>
            ) : status === "error" ? (
              <div className="dashboard-state" role="alert">
                <p className="mb-3">{error}</p>
                <button className="btn btn-outline-primary cheer-btn-secondary d-inline-flex align-items-center gap-2" type="button" onClick={loadLogs}>
                  <RefreshCw size={18} aria-hidden="true" />
                  Tentar novamente
                </button>
              </div>
            ) : (
              <section className="dashboard-panel">
                <div className="dashboard-modal-header">
                  <h2>Registros</h2>
                  <p className="mb-0 text-muted">{pagination.total} registros encontrados</p>
                </div>
                <DataTable
                  className="display dashboard-table"
                  data={tableData}
                  columns={[
                    { title: "Data", data: "data_hora_formatada" },
                    { title: "Tipo", data: "tipo_evento" },
                    { title: "Descrição", data: "descricao" },
                    { title: "Nível", data: "nivel_badge" },
                    { title: "Origem", data: "origem" },
                    { title: "IP", data: "ip_origem" },
                  ]}
                  options={{ language: tableLanguage, pageLength: 10 }}
                />
              </section>
            )}
          </div>
        </main>
      </section>

      <ModalLogin />
    </>
  );
}

export default LogsOperacionais;

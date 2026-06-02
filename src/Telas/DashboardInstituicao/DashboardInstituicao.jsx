import { createElement, useCallback, useEffect, useMemo, useRef, useState } from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.css";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Activity,
  CalendarClock,
  ChartPie,
  RefreshCw,
  Save,
  UsersRound,
  X,
} from "lucide-react";
import InstituicaoNavbar from "../../Componentes/InstituicaoNavbar";
import ModalLogin from "../../Componentes/Modais/ModalLogin";
import {
  deleteEvento,
  getDashboardInstituicao,
  getEvento,
  getInscritosEvento,
  getProfile,
  updateEvento,
  updateStatusInscrito,
} from "../../Servicos/cheerApi";
import "./DashboardInstituicao.css";

// DataTables exposes a static `use` method; this is not a React hook.
// eslint-disable-next-line react-hooks/rules-of-hooks
DataTable.use(DT);
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Tooltip, Legend);

const emptyDashboard = {
  kpis: {
    total_eventos: 0,
    eventos_futuros: 0,
    total_inscritos: 0,
    inscricoes_pendentes: 0,
    inscricoes_aprovadas: 0,
    inscricoes_rejeitadas: 0,
    taxa_ocupacao_percentual: 0,
  },
  series: {
    eventos_por_mes: [],
    eventos_por_tipo: [],
    inscricoes_por_status: [],
    inscritos_por_evento: [],
  },
  tables: {
    eventos: [],
    inscritos_recentes: [],
  },
};

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

const chartColors = ["#0f766e", "#f97316", "#2563eb", "#9333ea", "#64748b", "#16a34a"];
const eventTypeOptions = ["doacao", "arrecadacao", "organizacao", "preparacao", "voluntariado"];
const frequencyOptions = ["unico", "semanal", "mensal"];

function onlyDigits(value) {
  return String(value || "").replace(/\D/g, "");
}

function formatValue(value) {
  return value ?? "Não informado";
}

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

function toLocalInputValue(value) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return offsetDate.toISOString().slice(0, 16);
}

function toApiDateTime(value) {
  if (!value) {
    return null;
  }

  const localDate = new Date(value);

  if (Number.isNaN(localDate.getTime())) {
    return null;
  }

  const timezoneOffset = -localDate.getTimezoneOffset();
  const sign = timezoneOffset >= 0 ? "+" : "-";
  const absoluteOffset = Math.abs(timezoneOffset);
  const offsetHours = String(Math.floor(absoluteOffset / 60)).padStart(2, "0");
  const offsetMinutes = String(absoluteOffset % 60).padStart(2, "0");

  return `${value}:00${sign}${offsetHours}:${offsetMinutes}`;
}

function hasCompleteAddress(address) {
  return Boolean(address?.rua && address?.bairro && address?.cidade && address?.uf && address?.codigo_postal);
}

function normalizeAddress(address) {
  return {
    rua: address?.rua || "",
    numero: address?.numero || "",
    complemento: address?.complemento || "",
    bairro: address?.bairro || "",
    cidade: address?.cidade || "",
    uf: address?.uf || "",
    codigo_postal: address?.codigo_postal || "",
  };
}

function eventToForm(evento) {
  return {
    titulo: evento?.titulo || "",
    tipo_evento: evento?.tipo_evento || "",
    constancia: evento?.constancia || "",
    descricao: evento?.descricao || "",
    num_max_voluntarios: evento?.vagas ?? "",
    data_hora_inicio: toLocalInputValue(evento?.data),
    data_hora_termino: toLocalInputValue(evento?.data_hora_termino),
    endereco: normalizeAddress(evento?.endereco),
  };
}

function toChartData(series, label) {
  const labels = series.map((item) => item.label);
  const values = series.map((item) => Number(item.value || 0));

  return {
    labels,
    datasets: [
      {
        label,
        data: values,
        backgroundColor: chartColors,
        borderColor: chartColors,
        borderWidth: 2,
        tension: 0.35,
      },
    ],
  };
}

function KpiCard({ Icon, label, value, suffix = "" }) {
  return (
    <article className="dashboard-kpi">
      <span className="dashboard-kpi-icon" aria-hidden="true">
        {createElement(Icon, { size: 22 })}
      </span>
      <div>
        <p>{label}</p>
        <strong>{value}{suffix}</strong>
      </div>
    </article>
  );
}

function ChartPanel({ title, children, isEmpty }) {
  return (
    <section className="dashboard-panel">
      <h2>{title}</h2>
      <div className="dashboard-chart">
        {isEmpty ? (
          <p className="dashboard-empty">Sem dados para exibir.</p>
        ) : children}
      </div>
    </section>
  );
}

function DashboardInstituicao() {
  const [dashboard, setDashboard] = useState(emptyDashboard);
  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [inscritosModal, setInscritosModal] = useState({ open: false, event: null, items: [], status: "idle", error: null });
  const [editModal, setEditModal] = useState({ open: false, event: null, form: eventToForm(null), status: "idle", error: null });
  const eventsTableRef = useRef(null);

  const loadDashboard = useCallback(async () => {
    setStatus("loading");
    setError(null);

    try {
      const [dashboardResponse, profileResponse] = await Promise.all([
        getDashboardInstituicao(),
        getProfile(),
      ]);
      setDashboard(dashboardResponse.data || emptyDashboard);
      setProfile(profileResponse.data || null);
      setStatus("loaded");
    } catch (requestError) {
      setDashboard(emptyDashboard);
      setError(requestError.message || "Não foi possível carregar o dashboard.");
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(loadDashboard);
  }, [loadDashboard]);

  const series = dashboard.series || emptyDashboard.series;
  const kpis = dashboard.kpis || emptyDashboard.kpis;
  const institutionAddress = profile?.endereco;
  const canUseInstitutionAddress = hasCompleteAddress(institutionAddress);

  const eventosTable = useMemo(() => {
    const eventos = dashboard.tables?.eventos || [];

    return eventos.map((evento) => ({
      ...evento,
      data_formatada: formatDate(evento.data),
      termino_formatado: formatDate(evento.data_hora_termino),
      local: [evento.cidade, evento.uf].filter(Boolean).join(" - "),
    }));
  }, [dashboard.tables?.eventos]);

  const inscritosTable = useMemo(() => {
    const inscritosRecentes = dashboard.tables?.inscritos_recentes || [];

    return inscritosRecentes.map((inscrito) => ({
      ...inscrito,
      data_inscricao_formatada: formatDate(inscrito.data_inscricao),
    }));
  }, [dashboard.tables?.inscritos_recentes]);

  const inscritosModalTable = useMemo(() => (
    inscritosModal.items.map((inscrito) => ({
      ...inscrito,
      data_inscricao_formatada: formatDate(inscrito.data_inscricao),
      status_badge: `<span class="dashboard-status dashboard-status-${inscrito.status || "pendente"}">${inscrito.status || "pendente"}</span>`,
    }))
  ), [inscritosModal.items]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  const openInscritos = useCallback(async (event) => {
    setFeedback(null);
    setInscritosModal({ open: true, event, items: [], status: "loading", error: null });

    try {
      const response = await getInscritosEvento(event.id);
      setInscritosModal({ open: true, event, items: response.data || [], status: "loaded", error: null });
    } catch (requestError) {
      setInscritosModal({ open: true, event, items: [], status: "error", error: requestError.message || "Não foi possível carregar os inscritos." });
    }
  }, []);

  const openEdit = useCallback(async (event) => {
    setFeedback(null);
    setEditModal({ open: true, event, form: eventToForm(event), status: "loading", error: null });

    try {
      const response = await getEvento(event.id);
      setEditModal({ open: true, event: response.data, form: eventToForm(response.data), status: "idle", error: null });
    } catch (requestError) {
      setEditModal({ open: true, event, form: eventToForm(event), status: "error", error: requestError.message || "Não foi possível carregar o evento." });
    }
  }, []);

  const deleteSelectedEvent = useCallback(async (event) => {
    const confirmed = window.confirm(`Excluir o evento "${event.titulo}"? Esta ação também remove as inscrições vinculadas.`);

    if (!confirmed) {
      return;
    }

    setFeedback(null);

    try {
      await deleteEvento(event.id);
      setFeedback({ type: "success", message: "Evento excluído com sucesso." });
      await loadDashboard();
    } catch (requestError) {
      setFeedback({ type: "error", message: requestError.message || "Não foi possível excluir o evento." });
    }
  }, [loadDashboard]);

  useEffect(() => {
    const wrapper = eventsTableRef.current;

    if (!wrapper) {
      return undefined;
    }

    function handleClick(event) {
      const button = event.target.closest("[data-dashboard-action]");

      if (!button) {
        return;
      }

      const eventId = Number(button.dataset.eventId);
      const selectedEvent = eventosTable.find((item) => Number(item.id) === eventId);

      if (!selectedEvent) {
        return;
      }

      if (button.dataset.dashboardAction === "inscritos") {
        void openInscritos(selectedEvent);
      }

      if (button.dataset.dashboardAction === "editar") {
        void openEdit(selectedEvent);
      }

      if (button.dataset.dashboardAction === "excluir") {
        void deleteSelectedEvent(selectedEvent);
      }
    }

    wrapper.addEventListener("click", handleClick);

    return () => wrapper.removeEventListener("click", handleClick);
  }, [deleteSelectedEvent, eventosTable, openEdit, openInscritos]);

  function updateEditField(event) {
    const { name, value } = event.target;

    setEditModal((current) => ({
      ...current,
      form: {
        ...current.form,
        [name]: value,
      },
    }));
  }

  function updateEditAddressField(event) {
    const { name, value } = event.target;

    setEditModal((current) => ({
      ...current,
      form: {
        ...current.form,
        endereco: {
          ...current.form.endereco,
          [name]: value,
        },
      },
    }));
  }

  function useInstitutionAddress() {
    if (!canUseInstitutionAddress) {
      return;
    }

    setEditModal((current) => ({
      ...current,
      form: {
        ...current.form,
        endereco: normalizeAddress(institutionAddress),
      },
    }));
  }

  async function saveEvent(event) {
    event.preventDefault();
    const form = editModal.form;
    const dataHoraInicio = toApiDateTime(form.data_hora_inicio);
    const dataHoraTermino = toApiDateTime(form.data_hora_termino);

    if (!dataHoraInicio || new Date(dataHoraInicio) < new Date()) {
      setEditModal((current) => ({ ...current, error: "A data de início não pode ser anterior ao momento atual." }));
      return;
    }

    if (form.data_hora_termino && (!dataHoraTermino || new Date(dataHoraTermino) <= new Date(dataHoraInicio))) {
      setEditModal((current) => ({ ...current, error: "A data de fim precisa ser posterior ao início." }));
      return;
    }

    setEditModal((current) => ({ ...current, status: "saving", error: null }));

    try {
      await updateEvento(editModal.event.id, {
        titulo: form.titulo.trim(),
        tipo_evento: form.tipo_evento,
        constancia: form.constancia || null,
        descricao: form.descricao.trim() || null,
        num_max_voluntarios: form.num_max_voluntarios ? Number(form.num_max_voluntarios) : null,
        data_hora_inicio: dataHoraInicio,
        data_hora_termino: dataHoraTermino,
        endereco: {
          rua: form.endereco.rua.trim(),
          bairro: form.endereco.bairro.trim(),
          cidade: form.endereco.cidade.trim(),
          uf: form.endereco.uf.trim().toUpperCase(),
          codigo_postal: onlyDigits(form.endereco.codigo_postal),
        },
      });

      setEditModal({ open: false, event: null, form: eventToForm(null), status: "idle", error: null });
      setFeedback({ type: "success", message: "Evento atualizado com sucesso." });
      await loadDashboard();
    } catch (requestError) {
      const fields = requestError.fields?.length ? ` Campos: ${requestError.fields.join(", ")}.` : "";
      setEditModal((current) => ({
        ...current,
        status: "idle",
        error: `${requestError.message || "Não foi possível atualizar o evento."}${fields}`,
      }));
    }
  }

  async function changeSubscriptionStatus(inscrito, nextStatus) {
    if (!inscritosModal.event) {
      return;
    }

    setInscritosModal((current) => ({ ...current, status: "saving", error: null }));

    try {
      await updateStatusInscrito(inscritosModal.event.id, inscrito.id_voluntario, nextStatus);
      const response = await getInscritosEvento(inscritosModal.event.id);
      setInscritosModal((current) => ({
        ...current,
        items: response.data || [],
        status: "loaded",
        error: null,
      }));
      await loadDashboard();
    } catch (requestError) {
      setInscritosModal((current) => ({
        ...current,
        status: "loaded",
        error: requestError.message || "Não foi possível atualizar o status.",
      }));
    }
  }

  function closeInscritosModal() {
    setInscritosModal({ open: false, event: null, items: [], status: "idle", error: null });
  }

  function closeEditModal() {
    setEditModal({ open: false, event: null, form: eventToForm(null), status: "idle", error: null });
  }

  return (
    <>
      <section className="dashboard-page">
        <InstituicaoNavbar />

        <main className="dashboard-main py-4 py-lg-5">
          <div className="container">
            <header className="dashboard-header mb-4">
              <p className="dashboard-kicker">INSTITUIÇÃO</p>
              <h1>Dashboard</h1>
              <p>Acompanhe indicadores, eventos publicados e inscrições recentes.</p>
            </header>

            {feedback && (
              <p className={`alert ${feedback.type === "error" ? "alert-danger" : "alert-success"}`} role={feedback.type === "error" ? "alert" : "status"}>
                {feedback.message}
              </p>
            )}

            {status === "loading" ? (
              <div className="dashboard-state" role="status">
                <div className="spinner-border text-primary" aria-hidden="true" />
                <p className="mb-0">Carregando dashboard...</p>
              </div>
            ) : status === "error" ? (
              <div className="dashboard-state" role="alert">
                <p className="mb-3">{error}</p>
                <button className="btn btn-outline-primary cheer-btn-secondary d-inline-flex align-items-center gap-2" type="button" onClick={loadDashboard}>
                  <RefreshCw size={18} aria-hidden="true" />
                  Tentar novamente
                </button>
              </div>
            ) : (
              <>
                <section className="dashboard-kpis mb-4" aria-label="Indicadores da instituição">
                  <KpiCard Icon={CalendarClock} label="Eventos" value={kpis.total_eventos} />
                  <KpiCard Icon={Activity} label="Eventos futuros" value={kpis.eventos_futuros} />
                  <KpiCard Icon={UsersRound} label="Inscritos" value={kpis.total_inscritos} />
                  <KpiCard Icon={ChartPie} label="Ocupação" value={kpis.taxa_ocupacao_percentual} suffix="%" />
                </section>

                <div className="dashboard-grid mb-4">
                  <ChartPanel title="Inscritos por evento" isEmpty={(series.inscritos_por_evento || []).length === 0}>
                    <Bar data={toChartData(series.inscritos_por_evento || [], "Inscritos")} options={chartOptions} />
                  </ChartPanel>
                  <ChartPanel title="Inscrições por status" isEmpty={(series.inscricoes_por_status || []).every((item) => Number(item.value || 0) === 0)}>
                    <Doughnut data={toChartData(series.inscricoes_por_status || [], "Inscrições")} options={chartOptions} />
                  </ChartPanel>
                  <ChartPanel title="Eventos por mês" isEmpty={(series.eventos_por_mes || []).length === 0}>
                    <Line data={toChartData(series.eventos_por_mes || [], "Eventos")} options={chartOptions} />
                  </ChartPanel>
                  <ChartPanel title="Eventos por tipo" isEmpty={(series.eventos_por_tipo || []).length === 0}>
                    <Bar data={toChartData(series.eventos_por_tipo || [], "Eventos")} options={chartOptions} />
                  </ChartPanel>
                </div>

                <section className="dashboard-panel mb-4" ref={eventsTableRef}>
                  <h2>Eventos publicados</h2>
                  <DataTable
                    className="display dashboard-table"
                    data={eventosTable}
                    columns={[
                      { title: "Título", data: "titulo" },
                      { title: "Tipo", data: "tipo_evento" },
                      { title: "Início", data: "data_formatada" },
                      { title: "Local", data: "local" },
                      { title: "Vagas", data: "vagas", render: (data) => formatValue(data) },
                      { title: "Inscritos", data: "inscritos" },
                      {
                        title: "Ações",
                        data: null,
                        orderable: false,
                        searchable: false,
                        render: (_data, type, row) => {
                          if (type !== "display") {
                            return "";
                          }

                          return `
                            <div class="dashboard-table-actions">
                              <button class="btn btn-sm btn-outline-primary cheer-btn-secondary" type="button" data-dashboard-action="inscritos" data-event-id="${row.id}">Inscritos</button>
                              <button class="btn btn-sm btn-outline-primary cheer-btn-secondary" type="button" data-dashboard-action="editar" data-event-id="${row.id}">Editar</button>
                              <button class="btn btn-sm btn-outline-danger" type="button" data-dashboard-action="excluir" data-event-id="${row.id}">Excluir</button>
                            </div>
                          `;
                        },
                      },
                    ]}
                    options={{ language: tableLanguage, pageLength: 5 }}
                  />
                </section>

                <section className="dashboard-panel">
                  <h2>Inscritos recentes</h2>
                  <DataTable
                    className="display dashboard-table"
                    data={inscritosTable}
                    columns={[
                      { title: "Evento", data: "evento" },
                      { title: "Voluntário", data: "nome" },
                      { title: "Email", data: "email" },
                      { title: "Telefone", data: "telefone", render: (data) => formatValue(data) },
                      { title: "Status", data: "status", render: (data) => `<span class="dashboard-status dashboard-status-${data || "pendente"}">${data || "pendente"}</span>` },
                      { title: "Inscrição", data: "data_inscricao_formatada" },
                    ]}
                    options={{ language: tableLanguage, pageLength: 5 }}
                  />
                </section>
              </>
            )}
          </div>
        </main>
      </section>

      {inscritosModal.open && (
        <div className="dashboard-modal-backdrop" role="presentation">
          <section className="dashboard-modal dashboard-modal-wide" role="dialog" aria-modal="true" aria-labelledby="inscritos-title">
            <header className="dashboard-modal-header">
              <div>
                <p className="dashboard-kicker">INSCRITOS</p>
                <h2 id="inscritos-title">{inscritosModal.event?.titulo}</h2>
              </div>
              <button className="btn btn-outline-primary cheer-btn-secondary" type="button" onClick={closeInscritosModal} aria-label="Fechar">
                <X size={18} aria-hidden="true" />
              </button>
            </header>

            {inscritosModal.error && <p className="alert alert-danger">{inscritosModal.error}</p>}
            {inscritosModal.status === "loading" ? (
              <div className="dashboard-state" role="status">Carregando inscritos...</div>
            ) : (
              <DataTable
                className="display dashboard-table"
                data={inscritosModalTable}
                columns={[
                  { title: "Voluntário", data: "nome" },
                  { title: "Email", data: "email" },
                  { title: "Telefone", data: "telefone", render: (data) => formatValue(data) },
                  { title: "Status", data: "status_badge" },
                  { title: "Inscrição", data: "data_inscricao_formatada" },
                  {
                    title: "Ações",
                    data: null,
                    orderable: false,
                    searchable: false,
                    render: (_data, _type, row) => (
                      `<div class="dashboard-table-actions">
                        <button class="btn btn-sm btn-outline-success" type="button" data-status-action="aprovado" data-voluntario-id="${row.id_voluntario}">Aprovar</button>
                        <button class="btn btn-sm btn-outline-warning" type="button" data-status-action="pendente" data-voluntario-id="${row.id_voluntario}">Pendente</button>
                        <button class="btn btn-sm btn-outline-danger" type="button" data-status-action="rejeitado" data-voluntario-id="${row.id_voluntario}">Rejeitar</button>
                      </div>`
                    ),
                  },
                ]}
                options={{
                  language: tableLanguage,
                  pageLength: 5,
                  drawCallback() {
                    const table = this.api().table().node();
                    table.querySelectorAll("[data-status-action]").forEach((button) => {
                      button.onclick = () => {
                        const inscrito = inscritosModal.items.find((item) => Number(item.id_voluntario) === Number(button.dataset.voluntarioId));
                        if (inscrito) {
                          void changeSubscriptionStatus(inscrito, button.dataset.statusAction);
                        }
                      };
                    });
                  },
                }}
              />
            )}
          </section>
        </div>
      )}

      {editModal.open && (
        <div className="dashboard-modal-backdrop" role="presentation">
          <section className="dashboard-modal dashboard-modal-wide" role="dialog" aria-modal="true" aria-labelledby="editar-evento-title">
            <header className="dashboard-modal-header">
              <div>
                <p className="dashboard-kicker">EVENTO</p>
                <h2 id="editar-evento-title">Editar evento</h2>
              </div>
              <button className="btn btn-outline-primary cheer-btn-secondary" type="button" onClick={closeEditModal} aria-label="Fechar">
                <X size={18} aria-hidden="true" />
              </button>
            </header>

            {editModal.error && <p className="alert alert-danger">{editModal.error}</p>}

            {editModal.status === "loading" ? (
              <div className="dashboard-state" role="status">Carregando evento...</div>
            ) : (
              <form className="dashboard-edit-form" onSubmit={saveEvent}>
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label" htmlFor="edit-titulo">Título</label>
                    <input className="form-control" id="edit-titulo" name="titulo" required value={editModal.form.titulo} onChange={updateEditField} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="edit-tipo">Tipo</label>
                    <select className="form-select" id="edit-tipo" name="tipo_evento" required value={editModal.form.tipo_evento} onChange={updateEditField}>
                      <option value="">Selecione</option>
                      {eventTypeOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="edit-constancia">Frequência</label>
                    <select className="form-select" id="edit-constancia" name="constancia" value={editModal.form.constancia} onChange={updateEditField}>
                      <option value="">Selecione</option>
                      {frequencyOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label" htmlFor="edit-descricao">Descrição</label>
                    <textarea className="form-control" id="edit-descricao" name="descricao" rows="3" value={editModal.form.descricao} onChange={updateEditField} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label" htmlFor="edit-vagas">Vagas</label>
                    <input className="form-control" id="edit-vagas" name="num_max_voluntarios" type="number" min="1" step="1" value={editModal.form.num_max_voluntarios} onChange={updateEditField} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label" htmlFor="edit-inicio">Início</label>
                    <input className="form-control" id="edit-inicio" name="data_hora_inicio" type="datetime-local" required value={editModal.form.data_hora_inicio} onChange={updateEditField} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label" htmlFor="edit-fim">Fim</label>
                    <input className="form-control" id="edit-fim" name="data_hora_termino" type="datetime-local" value={editModal.form.data_hora_termino} onChange={updateEditField} />
                  </div>

                  {canUseInstitutionAddress && (
                    <div className="col-12">
                      <button className="btn btn-outline-primary cheer-btn-secondary" type="button" onClick={useInstitutionAddress}>
                        Usar endereço da instituição
                      </button>
                    </div>
                  )}

                  <div className="col-md-8">
                    <label className="form-label" htmlFor="edit-rua">Rua</label>
                    <input className="form-control" id="edit-rua" name="rua" required value={editModal.form.endereco.rua} onChange={updateEditAddressField} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label" htmlFor="edit-bairro">Bairro</label>
                    <input className="form-control" id="edit-bairro" name="bairro" required value={editModal.form.endereco.bairro} onChange={updateEditAddressField} />
                  </div>
                  <div className="col-md-5">
                    <label className="form-label" htmlFor="edit-cidade">Cidade</label>
                    <input className="form-control" id="edit-cidade" name="cidade" required value={editModal.form.endereco.cidade} onChange={updateEditAddressField} />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label" htmlFor="edit-uf">UF</label>
                    <input className="form-control" id="edit-uf" name="uf" required maxLength="2" value={editModal.form.endereco.uf} onChange={updateEditAddressField} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label" htmlFor="edit-cep">CEP</label>
                    <input className="form-control" id="edit-cep" name="codigo_postal" required value={editModal.form.endereco.codigo_postal} onChange={updateEditAddressField} />
                  </div>
                </div>

                <div className="dashboard-modal-actions">
                  <button className="btn btn-outline-primary cheer-btn-secondary d-inline-flex align-items-center gap-2" type="button" onClick={closeEditModal}>
                    <X size={18} aria-hidden="true" />
                    Cancelar
                  </button>
                  <button className="btn btn-primary cheer-btn-primary d-inline-flex align-items-center gap-2" type="submit" disabled={editModal.status === "saving"}>
                    <Save size={18} aria-hidden="true" />
                    {editModal.status === "saving" ? "Salvando..." : "Salvar"}
                  </button>
                </div>
              </form>
            )}
          </section>
        </div>
      )}

      <ModalLogin />
    </>
  );
}

export default DashboardInstituicao;

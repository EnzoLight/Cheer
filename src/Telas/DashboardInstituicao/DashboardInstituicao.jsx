import { createElement, useCallback, useEffect, useMemo, useState } from "react";
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
import { Activity, CalendarClock, ChartPie, RefreshCw, UsersRound } from "lucide-react";
import InstituicaoNavbar from "../../Componentes/InstituicaoNavbar";
import ModalLogin from "../../Componentes/Modais/ModalLogin";
import { getDashboardInstituicao } from "../../Servicos/cheerApi";
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
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  const loadDashboard = useCallback(async () => {
    setStatus("loading");
    setError(null);

    try {
      const response = await getDashboardInstituicao();
      setDashboard(response.data || emptyDashboard);
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

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

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

                <section className="dashboard-panel mb-4">
                  <h2>Eventos publicados</h2>
                  <DataTable
                    className="display dashboard-table"
                    data={eventosTable}
                    columns={[
                      { title: "Título", data: "titulo" },
                      { title: "Tipo", data: "tipo_evento" },
                      { title: "Início", data: "data_formatada" },
                      { title: "Fim", data: "termino_formatado" },
                      { title: "Local", data: "local" },
                      { title: "Vagas", data: "vagas", render: (data) => formatValue(data) },
                      { title: "Inscritos", data: "inscritos" },
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
                      { title: "Status", data: "status" },
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

      <ModalLogin />
    </>
  );
}

export default DashboardInstituicao;

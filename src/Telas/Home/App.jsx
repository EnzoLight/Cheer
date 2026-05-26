import "./App.css";
import {
  Building2,
  CalendarHeart,
  Handshake,
  HeartHandshake,
  MapPinned,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import UserNavbar from "../../Componentes/UserNavbar";
import ModalLogin from "../../Componentes/Modais/ModalLogin";
import { ScrollAnimate } from "../../Componentes/animacaoScroll";
import {
  HomeActionLink,
  HomeInfoCard,
  HomeProfileCard,
  HomeSectionHeading,
} from "../../Componentes/Home/HomeBlocks";

const principles = [
  {
    Icon: Target,
    title: "Missão",
    description:
      "Conectar pessoas e organizações sociais, ampliando o alcance de projetos beneficentes.",
  },
  {
    Icon: Sparkles,
    title: "Visão",
    description:
      "Criar um ecossistema digital seguro para ações voluntárias e impacto comunitário.",
  },
  {
    Icon: Handshake,
    title: "Valores",
    description:
      "Colaboração, confiança, transparência e melhoria contínua em cada iniciativa.",
  },
];

const profiles = [
  {
    Icon: Building2,
    title: "Instituições",
    items: [
      "Criar eventos e gerenciar voluntários",
      "Avaliar participantes e consultar reputação",
      "Apresentar projetos a parceiros",
    ],
  },
  {
    Icon: Users,
    title: "Voluntários",
    items: [
      "Encontrar oportunidades próximas",
      "Candidatar-se com rapidez",
      "Construir histórico de participação",
    ],
  },
  {
    Icon: HeartHandshake,
    title: "Empresas parceiras",
    items: [
      "Descobrir projetos e instituições",
      "Apoiar iniciativas de impacto",
      "Acompanhar resultados sociais",
    ],
  },
];

function App() {
  return (
    <>
      <section className="home-page">
        <UserNavbar />

        <main className="home-main py-4 py-lg-5">
          <div className="container">
          <section className="card border-0 overflow-hidden home-hero">
            <div className="row g-0">
            <div className="col-lg-7 p-4 p-lg-5">
              <p className="home-kicker">CHEER VOLUNTARIADO</p>
              <h1>Conecte sua vontade de ajudar a ações reais.</h1>
              <p className="home-hero-description">
                Descubra eventos solidários, conecte-se a instituições e acompanhe
                sua jornada de impacto em um só lugar.
              </p>
              <div className="d-flex flex-wrap gap-2">
                <HomeActionLink to="/registro">Criar conta</HomeActionLink>
                <HomeActionLink to="/eventos" Icon={MapPinned} variant="secondary">
                  Buscar eventos
                </HomeActionLink>
              </div>
            </div>

            <aside className="col-lg-5 p-4 d-flex flex-column justify-content-center gap-3 home-hero-panel">
              <div className="card border-0 p-3 d-flex flex-row align-items-start gap-3 home-highlight">
                <CalendarHeart size={24} />
                <div>
                  <strong>Ações próximas</strong>
                  <p>Encontre iniciativas na sua região.</p>
                </div>
              </div>
              <div className="card border-0 p-3 d-flex flex-row align-items-start gap-3 home-highlight">
                <ShieldCheck size={24} />
                <div>
                  <strong>Confiança</strong>
                  <p>Perfis e participações com histórico.</p>
                </div>
              </div>
              <div className="card border-0 p-3 d-flex flex-row align-items-start gap-3 home-highlight">
                <HeartHandshake size={24} />
                <div>
                  <strong>Impacto conjunto</strong>
                  <p>Voluntários, instituições e parceiros.</p>
                </div>
              </div>
            </aside>
            </div>
          </section>

          <ScrollAnimate>
            <section id="sobre-nos" className="home-section mt-5 pt-lg-3">
              <HomeSectionHeading
                kicker="SOBRE A CHEER"
                title="Uma ponte entre intenção e transformação"
                description="Conectamos ONGs, voluntários e empresas em um ambiente de colaboração, transparência e impacto social."
              />
              <div className="row g-3">
                {principles.map((principle) => (
                  <HomeInfoCard key={principle.title} {...principle} />
                ))}
              </div>
            </section>
          </ScrollAnimate>

          <ScrollAnimate>
            <section className="home-section mt-5 pt-lg-3">
              <HomeSectionHeading
                kicker="PARA TODOS"
                title="Uma plataforma para cada perfil"
                description="Ferramentas adequadas para quem promove, participa ou apoia ações sociais."
              />
              <div className="row g-3">
                {profiles.map((profile) => (
                  <HomeProfileCard key={profile.title} {...profile} />
                ))}
              </div>
            </section>
          </ScrollAnimate>

          <ScrollAnimate>
            <section className="home-trust rounded-4 p-4 p-lg-5 d-flex align-items-start align-items-md-center gap-3 mt-5">
              <ShieldCheck size={30} />
              <div>
                <h2>Confiança construída com feedback</h2>
                <p>
                  Após cada evento, participantes e instituições podem fortalecer
                  uma reputação transparente e útil para novas ações.
                </p>
              </div>
            </section>
          </ScrollAnimate>

          <ScrollAnimate>
            <section className="card border-0 p-4 p-lg-5 mt-5 home-cta">
              <HomeSectionHeading
                kicker="COMECE AGORA"
                title="Participe de uma rede que transforma"
                description="Cadastre-se como voluntário ou registre sua instituição para começar a gerar impacto."
              />
              <div className="d-flex flex-wrap gap-2 justify-content-center">
                <HomeActionLink to="/eventos" Icon={MapPinned}>
                  Ver eventos
                </HomeActionLink>
                <HomeActionLink to="/registro" variant="secondary">
                  Ser voluntário
                </HomeActionLink>
                <HomeActionLink to="/cadastro-instituicao" Icon={Building2} variant="secondary">
                  Cadastrar sua instituição
                </HomeActionLink>
              </div>
            </section>
          </ScrollAnimate>
          </div>
        </main>
      </section>

      <ModalLogin />
    </>
  );
}

export default App;

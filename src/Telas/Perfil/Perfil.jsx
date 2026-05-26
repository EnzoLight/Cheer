import { MapPinned, Search, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import "./Perfil.css";
import UserNavbar from "../../Componentes/UserNavbar";
import ModalLogin from "../../Componentes/Modais/ModalLogin";
import BuscarEndereco from "../../Componentes/BuscarEndereco";
import Input from "../../Componentes/Input/Input";
import voluntariadosImage from "../../assets/voluntariados.jpg";

const skills = ["Bom/Boa com números", "Organizado", "Prestativo"];

function Perfil() {
  function preventSubmit(event) {
    event.preventDefault();
  }

  return (
    <>
      <section className="perfil-page">
        <UserNavbar />

        <main className="perfil-main py-4 py-lg-5">
          <div className="container">
            <div className="row g-4 align-items-start">
              <div className="col-lg-7">
                <section className="card border-0 p-4 p-lg-5 perfil-card">
                  <p className="perfil-kicker mb-2">SEU PERFIL</p>
                  <h1 className="mb-4">Complete seu perfil</h1>

                  <section className="card border-0 p-4 mb-4 perfil-panel">
                    <h2 className="h5 mb-2">Habilidades e atividades</h2>
                    <p className="perfil-copy mb-3">
                      Adicione habilidades que ajudam instituições a encontrar você.
                    </p>

                    <form className="d-flex align-items-start gap-2 mb-3" onSubmit={preventSubmit}>
                      <Input
                        type="search"
                        placeholder="Bom com números"
                        ariaLabel="Buscar habilidade"
                        containerClassName="flex-grow-1 mb-0"
                      />
                      <button className="btn btn-outline-primary cheer-btn-secondary perfil-search-button" type="submit" aria-label="Adicionar habilidade">
                        <Search size={18} aria-hidden="true" />
                      </button>
                    </form>

                    <div className="d-flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <button className="btn btn-outline-primary cheer-btn-secondary rounded-pill" type="button" key={skill}>
                          <Sparkles size={15} className="me-1" aria-hidden="true" />
                          {skill}
                        </button>
                      ))}
                    </div>
                  </section>

                  <section className="card border-0 p-4 perfil-panel">
                    <h2 className="h5 mb-2">Endereço opcional</h2>
                    <p className="perfil-copy mb-3">
                      Informe sua região para receber oportunidades próximas.
                    </p>
                    <BuscarEndereco className="perfil-endereco" />
                    <button className="btn btn-primary cheer-btn-primary w-100 py-3 fw-bold mt-3" type="button">
                      Finalizar perfil
                    </button>
                  </section>
                </section>
              </div>

              <div className="col-lg-5">
                <aside className="card border-0 overflow-hidden perfil-card">
                  <img className="card-img-top perfil-cover" src={voluntariadosImage} alt="Voluntários em uma ação social" />
                  <div className="card-body p-4">
                    <p className="perfil-kicker mb-2">OPORTUNIDADES</p>
                    <h2 className="h4 mb-2">Encontre ações perto de você</h2>
                    <p className="perfil-copy mb-4">
                      Consulte eventos disponíveis e participe de projetos da comunidade.
                    </p>
                    <Link className="btn btn-primary cheer-btn-primary w-100 py-3 d-flex align-items-center justify-content-center gap-2 fw-bold" to="/eventos">
                      <MapPinned size={18} aria-hidden="true" />
                      Buscar eventos
                    </Link>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </main>
      </section>

      <ModalLogin />
    </>
  );
}

export default Perfil;

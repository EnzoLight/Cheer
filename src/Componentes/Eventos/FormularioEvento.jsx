import BuscarEndereco from "../BuscarEndereco";
import Input, { Select, Textarea } from "../Input/Input";

function FormularioEvento() {
  return (
    <form className="eventos-form" onSubmit={(event) => event.preventDefault()}>
      <div className="row g-3">
        <Input
          label="Título do evento"
          name="titulo"
          placeholder="Digite o título"
          required
          containerClassName="col-12 mb-0"
        />

        <Select label="Tipo de evento" name="tipo_evento" required containerClassName="col-md-6 mb-0">
          <option value="">Selecione</option>
          <option value="doacao">Doação</option>
          <option value="arrecadacao">Arrecadação</option>
          <option value="organizacao">Organização</option>
          <option value="preparacao">Preparação</option>
        </Select>

        <Select label="Frequência do evento" name="constancia" containerClassName="col-md-6 mb-0">
          <option value="">Selecione</option>
          <option value="unico">Evento único</option>
          <option value="semanal">Evento semanal</option>
          <option value="mensal">Evento mensal</option>
        </Select>

        <Textarea
          label="Descrição"
          name="descricao"
          containerClassName="col-12 mb-0"
          className="eventos-textarea"
          rows={4}
          placeholder="Descreva os detalhes da ação..."
        />

        <Input
          label="Número máximo de voluntários"
          name="num_max_voluntarios"
          type="number"
          placeholder="Quantidade"
          min="1"
          step="1"
          containerClassName="col-12 mb-0"
        />

        <Input label="Data de início" name="data_inicio" type="date" required containerClassName="col-sm-6 mb-0" />
        <Input label="Hora de início" name="hora_inicio" type="time" required containerClassName="col-sm-6 mb-0" />

        <Input label="Data de fim" name="data_fim" type="date" containerClassName="col-sm-6 mb-0" />
        <Input label="Hora de fim" name="hora_fim" type="time" containerClassName="col-sm-6 mb-0" />

        <BuscarEndereco
          title="Endereço do evento"
          required
          className="col-12 mt-2 p-3 border eventos-address"
          idPrefix="evento-endereco"
        />
      </div>

      <button className="btn btn-primary cheer-btn-primary w-100 py-3 fw-bold mt-4" type="submit">
        Criar evento
      </button>
    </form>
  );
}

export default FormularioEvento;

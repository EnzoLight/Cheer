import { useState } from "react";
import BuscarEndereco from "../BuscarEndereco";
import Input, { Select, Textarea } from "../Input/Input";
import { createEvento } from "../../Servicos/cheerApi";
import useAuth from "../../Contextos/useAuth";

const emptyAddress = {
  codigo_postal: "",
  numero: "",
  complemento: "",
  rua: "",
  bairro: "",
  uf: "",
  cidade: "",
};

const initialFormData = {
  titulo: "",
  tipo_evento: "",
  constancia: "",
  descricao: "",
  num_max_voluntarios: "",
  data_inicio: "",
  hora_inicio: "",
  data_fim: "",
  hora_fim: "",
  endereco: emptyAddress,
};

function onlyDigits(value) {
  return value.replace(/\D/g, "");
}

function toApiDateTime(date, time) {
  if (!date || !time) {
    return null;
  }

  const localDate = new Date(`${date}T${time}:00`);

  if (Number.isNaN(localDate.getTime())) {
    return null;
  }

  const timezoneOffset = -localDate.getTimezoneOffset();
  const sign = timezoneOffset >= 0 ? "+" : "-";
  const absoluteOffset = Math.abs(timezoneOffset);
  const offsetHours = String(Math.floor(absoluteOffset / 60)).padStart(2, "0");
  const offsetMinutes = String(absoluteOffset % 60).padStart(2, "0");

  return `${date}T${time}:00${sign}${offsetHours}:${offsetMinutes}`;
}

function todayInputValue() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function hasCompleteAddress(address) {
  return Boolean(
    address?.rua
    && address?.bairro
    && address?.cidade
    && address?.uf
    && address?.codigo_postal
  );
}

function normalizeAddress(address) {
  return {
    codigo_postal: address.codigo_postal || "",
    numero: address.numero || "",
    complemento: address.complemento || "",
    rua: address.rua || "",
    bairro: address.bairro || "",
    uf: address.uf || "",
    cidade: address.cidade || "",
  };
}

function FormularioEvento({ onCreated }) {
  const { profile } = useAuth();
  const [formData, setFormData] = useState(initialFormData);
  const [feedback, setFeedback] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addressVersion, setAddressVersion] = useState(0);
  const institutionAddress = profile?.endereco;
  const canUseInstitutionAddress = hasCompleteAddress(institutionAddress);
  const today = todayInputValue();

  function updateField(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function updateAddress(address) {
    setFormData((currentData) => ({
      ...currentData,
      endereco: address,
    }));
  }

  function useInstitutionAddress() {
    if (!canUseInstitutionAddress) {
      return;
    }

    setFormData((currentData) => ({
      ...currentData,
      endereco: normalizeAddress(institutionAddress),
    }));
    setAddressVersion((version) => version + 1);
    setFeedback(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFeedback(null);

    const dataHoraInicio = toApiDateTime(formData.data_inicio, formData.hora_inicio);
    const dataHoraTermino = toApiDateTime(formData.data_fim, formData.hora_fim);

    if (!dataHoraInicio) {
      setFeedback({
        type: "error",
        message: "Informe data e hora de início válidas.",
      });
      return;
    }

    if (new Date(dataHoraInicio) < new Date()) {
      setFeedback({
        type: "error",
        message: "A data de início não pode ser anterior ao momento atual.",
      });
      return;
    }

    if ((formData.data_fim || formData.hora_fim) && !dataHoraTermino) {
      setFeedback({
        type: "error",
        message: "Informe data e hora de fim ou deixe ambos em branco.",
      });
      return;
    }

    if (dataHoraTermino && new Date(dataHoraTermino) <= new Date(dataHoraInicio)) {
      setFeedback({
        type: "error",
        message: "A data de fim precisa ser posterior ao início.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await createEvento({
        titulo: formData.titulo.trim(),
        tipo_evento: formData.tipo_evento,
        constancia: formData.constancia || null,
        descricao: formData.descricao.trim() || null,
        num_max_voluntarios: formData.num_max_voluntarios ? Number(formData.num_max_voluntarios) : null,
        data_hora_inicio: dataHoraInicio,
        data_hora_termino: dataHoraTermino,
        endereco: {
          rua: formData.endereco.rua.trim(),
          numero: formData.endereco.numero.trim(),
          complemento: formData.endereco.complemento.trim(),
          bairro: formData.endereco.bairro.trim(),
          cidade: formData.endereco.cidade.trim(),
          uf: formData.endereco.uf.trim().toUpperCase(),
          codigo_postal: onlyDigits(formData.endereco.codigo_postal),
        },
      });

      setFeedback({
        type: "success",
        message: "Evento criado com sucesso.",
      });
      setFormData({ ...initialFormData, endereco: { ...emptyAddress } });
      setAddressVersion((version) => version + 1);
      onCreated?.();
    } catch (error) {
      const fields = error.fields?.length ? ` Campos: ${error.fields.join(", ")}.` : "";
      setFeedback({
        type: "error",
        message: `${error.message || "Não foi possível criar o evento."}${fields}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="eventos-form" onSubmit={handleSubmit}>
      <div className="row g-3">
        <Input
          label="Título do evento"
          name="titulo"
          placeholder="Digite o título"
          required
          value={formData.titulo}
          onChange={updateField}
          containerClassName="col-12 mb-0"
        />

        <Select label="Tipo de evento" name="tipo_evento" required value={formData.tipo_evento} onChange={updateField} containerClassName="col-md-6 mb-0">
          <option value="">Selecione</option>
          <option value="doacao">Doação</option>
          <option value="arrecadacao">Arrecadação</option>
          <option value="organizacao">Organização</option>
          <option value="preparacao">Preparação</option>
          <option value="voluntariado">Voluntariado</option>
        </Select>

        <Select label="Frequência do evento" name="constancia" value={formData.constancia} onChange={updateField} containerClassName="col-md-6 mb-0">
          <option value="">Selecione</option>
          <option value="unico">Evento único</option>
          <option value="semanal">Evento semanal</option>
          <option value="mensal">Evento mensal</option>
        </Select>

        <Textarea
          label="Descrição"
          name="descricao"
          value={formData.descricao}
          onChange={updateField}
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
          value={formData.num_max_voluntarios}
          onChange={updateField}
          containerClassName="col-12 mb-0"
        />

        <Input label="Data de início" name="data_inicio" type="date" required min={today} value={formData.data_inicio} onChange={updateField} containerClassName="col-sm-6 mb-0" />
        <Input label="Hora de início" name="hora_inicio" type="time" required value={formData.hora_inicio} onChange={updateField} containerClassName="col-sm-6 mb-0" />

        <Input label="Data de fim" name="data_fim" type="date" min={formData.data_inicio || today} value={formData.data_fim} onChange={updateField} containerClassName="col-sm-6 mb-0" />
        <Input label="Hora de fim" name="hora_fim" type="time" value={formData.hora_fim} onChange={updateField} containerClassName="col-sm-6 mb-0" />

        {canUseInstitutionAddress && (
          <div className="col-12 mb-0">
            <button className="btn btn-outline-primary cheer-btn-secondary" type="button" onClick={useInstitutionAddress}>
              Usar endereço da instituição
            </button>
          </div>
        )}

        <BuscarEndereco
          key={addressVersion}
          value={formData.endereco}
          onChange={updateAddress}
          title="Endereço do evento"
          required
          showExtraFields={true}
          className="col-12 mt-2 p-3 border eventos-address"
          idPrefix="evento-endereco"
        />
      </div>

      {feedback && (
        <p
          className={`alert mt-3 mb-0 eventos-feedback ${feedback.type === "error" ? "alert-danger" : "alert-success"}`}
          role={feedback.type === "error" ? "alert" : "status"}
        >
          {feedback.message}
        </p>
      )}

      <button className="btn btn-primary cheer-btn-primary w-100 py-3 fw-bold mt-4" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Criando evento..." : "Criar evento"}
      </button>
    </form>
  );
}

export default FormularioEvento;

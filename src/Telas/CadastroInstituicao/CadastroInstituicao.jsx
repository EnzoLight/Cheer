import { useState } from "react";
import "../Registre-se/Registro.css";
import UserNavbar from "../../Componentes/UserNavbar";
import ModalLogin from "../../Componentes/Modais/ModalLogin";
import Input, { Select } from "../../Componentes/Input/Input";
import BuscarEndereco from "../../Componentes/BuscarEndereco";
import { Building2, CalendarDays, CreditCard, Lock, Mail, Phone, Tag } from "lucide-react";
import { registerInstituicao } from "../../Servicos/cheerApi";
import { formatCnpj, formatPhone, hasValidPhoneLength, onlyDigits } from "../../utils/brFormatters";

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
  nome: "",
  email: "",
  telefone: "",
  cnpj: "",
  tipo: "",
  categoria: "",
  ano_fundacao: "",
  internacional: "",
  password: "",
  passwordConfirmation: "",
  endereco: emptyAddress,
};

const currentYear = new Date().getFullYear();

function CadastroInstituicao() {
  const [formData, setFormData] = useState(initialFormData);
  const [feedback, setFeedback] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addressVersion, setAddressVersion] = useState(0);
  const password = formData.password;

  const validations = {
    hasNumber: /\d/.test(password),
    hasUpper: /[A-Z]/.test(password),
    hasSpecial: /[!@#$%^&*]/.test(password),
    minLength: password.length >= 8,
  };
  const hasValidPassword = Object.values(validations).every(Boolean);

  function updateField(event) {
    const { name, value } = event.target;
    const formattedValue = {
      cnpj: formatCnpj,
      telefone: formatPhone,
    }[name]?.(value) ?? value;

    setFormData((currentData) => ({
      ...currentData,
      [name]: formattedValue,
    }));
  }

  function updateAddress(address) {
    setFormData((currentData) => ({
      ...currentData,
      endereco: address,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFeedback(null);

    if (onlyDigits(formData.cnpj).length !== 14) {
      setFeedback({
        type: "error",
        message: "Informe um CNPJ válido com 14 números.",
      });
      return;
    }

    if (formData.telefone && !hasValidPhoneLength(formData.telefone)) {
      setFeedback({
        type: "error",
        message: "Informe um telefone válido com DDD.",
      });
      return;
    }

    if (!hasValidPassword) {
      setFeedback({
        type: "error",
        message: "A senha precisa atender a todos os requisitos informados.",
      });
      return;
    }

    if (formData.password !== formData.passwordConfirmation) {
      setFeedback({
        type: "error",
        message: "A confirmação de senha não corresponde à senha criada.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await registerInstituicao({
        nome: formData.nome.trim(),
        email: formData.email.trim(),
        password: formData.password,
        telefone: formData.telefone ? onlyDigits(formData.telefone) : null,
        cnpj: onlyDigits(formData.cnpj),
        tipo: formData.tipo.trim() || null,
        ano_fundacao: formData.ano_fundacao ? Number(formData.ano_fundacao) : null,
        categoria: formData.categoria.trim() || null,
        internacional: formData.internacional === "" ? null : formData.internacional === "true",
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
        message: "Instituição cadastrada. Entre na sua conta para continuar.",
      });
      setFormData({ ...initialFormData, endereco: { ...emptyAddress } });
      setAddressVersion((version) => version + 1);
    } catch (error) {
      const fields = error.fields?.length ? ` Campos: ${error.fields.join(", ")}.` : "";
      setFeedback({
        type: "error",
        message: `${error.message || "Não foi possível cadastrar a instituição."}${fields}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <section className="registro-page">
        <UserNavbar />

        <main className="registro-main py-4 py-lg-5">
          <div className="container">
          <div className="card border-0 overflow-hidden registro-card">
            <div className="row g-0">
            <aside className="col-lg-4 p-4 p-xl-5 d-flex flex-column justify-content-center registro-intro">
              <p className="registro-kicker">CHEER INSTITUIÇÃO</p>
              <h1>Cadastre sua instituição</h1>
              <p className="registro-copy">
                Conecte sua organização a voluntários e prepare-se para publicar
                novas oportunidades de impacto.
              </p>

              <div className="card border-0 p-3 registro-password-panel" aria-live="polite">
                <h2>Sua senha precisa ter:</h2>
                <ul className="list-unstyled mb-0">
                  <li className={`d-flex align-items-center gap-2 mt-2 ${validations.hasUpper ? "is-valid" : ""}`}>
                    <span className="registro-rule-icon" aria-hidden="true">
                      {validations.hasUpper ? "✓" : ""}
                    </span>
                    Uma letra maiúscula
                  </li>
                  <li className={`d-flex align-items-center gap-2 mt-2 ${validations.hasNumber ? "is-valid" : ""}`}>
                    <span className="registro-rule-icon" aria-hidden="true">
                      {validations.hasNumber ? "✓" : ""}
                    </span>
                    Pelo menos um número
                  </li>
                  <li className={`d-flex align-items-center gap-2 mt-2 ${validations.minLength ? "is-valid" : ""}`}>
                    <span className="registro-rule-icon" aria-hidden="true">
                      {validations.minLength ? "✓" : ""}
                    </span>
                    Mínimo de 8 caracteres
                  </li>
                  <li className={`d-flex align-items-center gap-2 mt-2 ${validations.hasSpecial ? "is-valid" : ""}`}>
                    <span className="registro-rule-icon" aria-hidden="true">
                      {validations.hasSpecial ? "✓" : ""}
                    </span>
                    Um caractere especial (!@#$%^&*)
                  </li>
                </ul>
              </div>
            </aside>

            <form className="col-lg-8 p-4 p-xl-5 registro-form" onSubmit={handleSubmit}>
              <div className="registro-form-header">
                <h2>Dados institucionais</h2>
                <p>Informe os dados da organização e o endereço de atuação.</p>
              </div>

              <div className="row g-3">
                <Input
                  id="institution-name"
                  name="nome"
                  label="Nome da instituição"
                  placeholder="Instituto Esperança"
                  autoComplete="organization"
                  required
                  Icon={Building2}
                  value={formData.nome}
                  onChange={updateField}
                  containerClassName="col-12 mb-0"
                />
                <Input
                  id="institution-email"
                  name="email"
                  type="email"
                  label="Email institucional"
                  placeholder="contato@instituto.org"
                  autoComplete="email"
                  required
                  Icon={Mail}
                  value={formData.email}
                  onChange={updateField}
                  containerClassName="col-12 mb-0"
                />
                <Input
                  id="institution-phone"
                  name="telefone"
                  type="tel"
                  label="Telefone (opcional)"
                  placeholder="(00) 00000-0000"
                  autoComplete="tel"
                  inputMode="tel"
                  maxLength={15}
                  Icon={Phone}
                  value={formData.telefone}
                  onChange={updateField}
                  containerClassName="col-md-6 mb-0"
                />
                <Input
                  id="institution-cnpj"
                  name="cnpj"
                  label="CNPJ"
                  placeholder="00.000.000/0001-00"
                  inputMode="numeric"
                  maxLength={18}
                  required
                  Icon={CreditCard}
                  value={formData.cnpj}
                  onChange={updateField}
                  containerClassName="col-md-6 mb-0"
                />
                <Input
                  id="institution-type"
                  name="tipo"
                  label="Tipo (opcional)"
                  placeholder="ONG"
                  Icon={Building2}
                  value={formData.tipo}
                  onChange={updateField}
                  containerClassName="col-md-6 mb-0"
                />
                <Input
                  id="institution-category"
                  name="categoria"
                  label="Categoria (opcional)"
                  placeholder="Educação"
                  Icon={Tag}
                  value={formData.categoria}
                  onChange={updateField}
                  containerClassName="col-md-6 mb-0"
                />
                <Input
                  id="institution-founded"
                  name="ano_fundacao"
                  type="number"
                  label="Ano de fundação (opcional)"
                  placeholder="2010"
                  min={1800}
                  max={currentYear}
                  step={1}
                  Icon={CalendarDays}
                  value={formData.ano_fundacao}
                  onChange={updateField}
                  containerClassName="col-md-6 mb-0"
                />
                <Select
                  id="institution-international"
                  name="internacional"
                  label="Atuação internacional (opcional)"
                  value={formData.internacional}
                  onChange={updateField}
                  containerClassName="col-md-6 mb-0"
                >
                  <option value="">Não informado</option>
                  <option value="false">Não</option>
                  <option value="true">Sim</option>
                </Select>
                <Input
                  id="institution-password"
                  name="password"
                  type="password"
                  label="Senha"
                  placeholder="Crie uma senha"
                  autoComplete="new-password"
                  required
                  minLength={8}
                  Icon={Lock}
                  value={formData.password}
                  onChange={updateField}
                  containerClassName="col-md-6 mb-0"
                />
                <Input
                  id="institution-password-confirmation"
                  name="passwordConfirmation"
                  type="password"
                  label="Confirmar senha"
                  placeholder="Confirme sua senha"
                  autoComplete="new-password"
                  required
                  minLength={8}
                  Icon={Lock}
                  value={formData.passwordConfirmation}
                  onChange={updateField}
                  containerClassName="col-md-6 mb-0"
                />

                <BuscarEndereco
                  key={addressVersion}
                  value={formData.endereco}
                  onChange={updateAddress}
                  required
                  showExtraFields={true}
                  title="Endereço da instituição"
                  idPrefix="instituicao-endereco"
                  className="col-12 mt-2 pt-3 border-top registro-endereco"
                />
              </div>

              {feedback && (
                <p
                  className={`alert mt-3 mb-0 registro-feedback ${feedback.type === "error" ? "alert-danger" : "alert-success"}`}
                  role={feedback.type === "error" ? "alert" : "status"}
                >
                  {feedback.message}
                </p>
              )}

              <button
                id="btn_registro_instituicao"
                className="btn btn-primary cheer-btn-primary w-100 py-3 fw-bold mt-3 registro-submit"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Cadastrando instituição..." : "Cadastrar instituição"}
              </button>

              <p className="text-center mt-4 mb-0 registro-login">
                Sua instituição já tem cadastro?
                <button className="btn btn-link p-0 ms-1 registro-login-action" type="button" data-bs-toggle="modal" data-bs-target="#LoginModal">
                  Entrar
                </button>
              </p>
            </form>
            </div>
          </div>
          </div>
        </main>
      </section>

      <ModalLogin />
    </>
  );
}

export default CadastroInstituicao;

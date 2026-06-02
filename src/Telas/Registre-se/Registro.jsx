import { useState } from 'react'
import "./Registro.css"
import UserNavbar from '../../Componentes/UserNavbar';
import ModalLogin from '../../Componentes/Modais/ModalLogin';
import Input from '../../Componentes/Input/Input';
import { CreditCard, Lock, Mail, Phone, UserRound } from 'lucide-react';
import { registerVoluntario } from '../../Servicos/cheerApi';
import BuscarEndereco from '../../Componentes/BuscarEndereco';

const emptyAddress = {
  codigo_postal: '',
  numero: '',
  complemento: '',
  rua: '',
  bairro: '',
  uf: '',
  cidade: '',
};

const initialFormData = {
  nome: '',
  email: '',
  telefone: '',
  cpf: '',
  password: '',
  passwordConfirmation: '',
  endereco: emptyAddress,
};

function Registro() {
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

    setFormData((currentData) => ({
      ...currentData,
      [name]: name === 'uf' ? value.toUpperCase() : value,
    }));
  }

  function onlyDigits(value) {
    return value.replace(/\D/g, '');
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

    if (!hasValidPassword) {
      setFeedback({
        type: 'error',
        message: 'A senha precisa atender a todos os requisitos informados.',
      });
      return;
    }

    if (formData.password !== formData.passwordConfirmation) {
      setFeedback({
        type: 'error',
        message: 'A confirmacao de senha nao corresponde a senha criada.',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await registerVoluntario({
        nome: formData.nome.trim(),
        email: formData.email.trim(),
        password: formData.password,
        telefone: formData.telefone ? onlyDigits(formData.telefone) : null,
        cpf: onlyDigits(formData.cpf),
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
        type: 'success',
        message: 'Cadastro realizado. Entre na sua conta para continuar.',
      });
      setFormData({ ...initialFormData, endereco: { ...emptyAddress } });
      setAddressVersion((version) => version + 1);
    } catch (error) {
      const fields = error.fields?.length ? ` Campos: ${error.fields.join(', ')}.` : '';
      setFeedback({
        type: 'error',
        message: `${error.message || 'Nao foi possivel realizar o cadastro.'}${fields}`,
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
              <p className="registro-kicker">CHEER VOLUNTÁRIO</p>
              <h1>Crie sua conta</h1>
              <p className="registro-copy">
                Encontre eventos, acompanhe suas ações e conecte-se a projetos
                que precisam da sua ajuda.
              </p>

              <div className="card border-0 p-3 registro-password-panel" aria-live="polite">
                <h2>Sua senha precisa ter:</h2>
                <ul className="list-unstyled mb-0">
                  <li className={`d-flex align-items-center gap-2 mt-2 ${validations.hasUpper ? 'is-valid' : ''}`}>
                    <span className="registro-rule-icon" aria-hidden="true">
                      {validations.hasUpper ? '✓' : ''}
                    </span>
                    Uma letra maiúscula
                  </li>
                  <li className={`d-flex align-items-center gap-2 mt-2 ${validations.hasNumber ? 'is-valid' : ''}`}>
                    <span className="registro-rule-icon" aria-hidden="true">
                      {validations.hasNumber ? '✓' : ''}
                    </span>
                    Pelo menos um número
                  </li>
                  <li className={`d-flex align-items-center gap-2 mt-2 ${validations.minLength ? 'is-valid' : ''}`}>
                    <span className="registro-rule-icon" aria-hidden="true">
                      {validations.minLength ? '✓' : ''}
                    </span>
                    Mínimo de 8 caracteres
                  </li>
                  <li className={`d-flex align-items-center gap-2 mt-2 ${validations.hasSpecial ? 'is-valid' : ''}`}>
                    <span className="registro-rule-icon" aria-hidden="true">
                      {validations.hasSpecial ? '✓' : ''}
                    </span>
                    Um caractere especial (!@#$%^&*)
                  </li>
                </ul>
              </div>
            </aside>

            <form className="col-lg-8 p-4 p-xl-5 registro-form" onSubmit={handleSubmit}>
              <div className="registro-form-header">
                <h2>Preencha seus dados</h2>
                <p>Informe seus dados e endereço para criar seu perfil.</p>
              </div>

              <div className="row g-3">
                <Input
                  id="full-name"
                  name="nome"
                  label="Nome completo"
                  placeholder="Digite seu nome completo"
                  autoComplete="name"
                  required
                  Icon={UserRound}
                  value={formData.nome}
                  onChange={updateField}
                  containerClassName="col-12 mb-0"
                />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="voluntario@email.com"
                  autoComplete="email"
                  required
                  Icon={Mail}
                  value={formData.email}
                  onChange={updateField}
                  containerClassName="col-12 mb-0"
                />
                <Input
                  id="phone"
                  name="telefone"
                  type="tel"
                  label="Telefone (opcional)"
                  placeholder="(00) 00000-0000"
                  autoComplete="tel"
                  inputMode="tel"
                  Icon={Phone}
                  value={formData.telefone}
                  onChange={updateField}
                  containerClassName="col-md-6 mb-0"
                />
                <Input
                  id="cpf"
                  name="cpf"
                  label="CPF"
                  placeholder="000.000.000-00"
                  inputMode="numeric"
                  maxLength={14}
                  required
                  Icon={CreditCard}
                  value={formData.cpf}
                  onChange={updateField}
                  containerClassName="col-md-6 mb-0"
                />
                <Input
                  id="password"
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
                  id="password-confirmation"
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
                  title="Endereço"
                  idPrefix="registro-endereco"
                  className="col-12 mt-2 pt-3 border-top registro-endereco"
                />
              </div>

              {feedback && (
                <p
                  className={`alert mt-3 mb-0 registro-feedback ${feedback.type === 'error' ? 'alert-danger' : 'alert-success'}`}
                  role={feedback.type === 'error' ? 'alert' : 'status'}
                >
                  {feedback.message}
                </p>
              )}

              <button
                id="btn_registro_user"
                className="btn btn-primary cheer-btn-primary w-100 py-3 fw-bold mt-3 registro-submit"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Criando conta...' : 'Criar conta'}
              </button>

              <p className="text-center mt-4 mb-0 registro-login">
                Já tem cadastro?
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
  )
}

export default Registro

import { useEffect, useRef, useState } from "react";
import Input from "./Input/Input";
import { buscarEnderecoPorCep } from "../Servicos/viaCepApi";
import "./CSS/BuscarEndereco.css";

const emptyAddress = {
  codigo_postal: "",
  numero: "",
  complemento: "",
  rua: "",
  bairro: "",
  uf: "",
  cidade: "",
};

function BuscarEndereco({
  value,
  onChange,
  required = false,
  showExtraFields = true,
  title,
  className = "",
  idPrefix = "endereco",
}) {
  const [internalValue, setInternalValue] = useState(emptyAddress);
  const [status, setStatus] = useState(null);
  const activeCep = useRef("");
  const address = value || internalValue;
  const currentAddress = useRef(address);

  useEffect(() => {
    currentAddress.current = address;

    if (!address.codigo_postal) {
      activeCep.current = "";
    }
  }, [address]);

  function updateAddress(changes) {
    const updatedAddress = {
      ...currentAddress.current,
      ...changes,
    };

    currentAddress.current = updatedAddress;

    if (value === undefined) {
      setInternalValue(updatedAddress);
    }

    onChange?.(updatedAddress);
  }

  function clearLocatedFields(cep = address.codigo_postal) {
    updateAddress({
      codigo_postal: cep,
      rua: "",
      bairro: "",
      uf: "",
      cidade: "",
    });
  }

  async function handleCepChange(event) {
    const cep = event.target.value.replace(/\D/g, "").slice(0, 8);

    activeCep.current = cep;
    setStatus(null);
    updateAddress({ codigo_postal: cep });

    if (cep.length !== 8) {
      clearLocatedFields(cep);
      return;
    }

    setStatus({ type: "loading", message: "Buscando endereço..." });

    try {
      const locatedAddress = await buscarEnderecoPorCep(cep);

      if (activeCep.current !== cep) {
        return;
      }

      if (locatedAddress.erro) {
        clearLocatedFields(cep);
        setStatus({ type: "error", message: "CEP não encontrado." });
        return;
      }

      updateAddress({
        codigo_postal: cep,
        rua: locatedAddress.logradouro || "",
        bairro: locatedAddress.bairro || "",
        uf: locatedAddress.uf || "",
        cidade: locatedAddress.localidade || "",
      });
      setStatus({ type: "success", message: "Endereço localizado." });
    } catch {
      if (activeCep.current === cep) {
        setStatus({ type: "error", message: "Não foi possível consultar o CEP." });
      }
    }
  }

  function handleFieldChange(event) {
    const { name, value: fieldValue } = event.target;

    updateAddress({
      [name]: name === "uf" ? fieldValue.toUpperCase() : fieldValue,
    });
  }

  return (
    <section className={`endereco-fields rounded-3 p-3 ${className}`.trim()}>
      {title && <h3 className="endereco-fields-title mb-3">{title}</h3>}

      <div className="row g-3">
        <Input
          id={`${idPrefix}-cep`}
          name="codigo_postal"
          label="CEP"
          placeholder="00000-000"
          autoComplete="postal-code"
          inputMode="numeric"
          maxLength={8}
          required={required}
          value={address.codigo_postal}
          onChange={handleCepChange}
          containerClassName="col-sm-4 col-lg-3 mb-0"
        />

        {showExtraFields && (
          <>
            <Input
              id={`${idPrefix}-numero`}
              name="numero"
              label="Número"
              placeholder="123"
              inputMode="numeric"
              value={address.numero}
              onChange={handleFieldChange}
              containerClassName="col-sm-4 col-lg-3 mb-0"
            />
            <Input
              id={`${idPrefix}-complemento`}
              name="complemento"
              label="Complemento"
              placeholder="Apto. 101"
              value={address.complemento}
              onChange={handleFieldChange}
              containerClassName="col-sm-4 col-lg-6 mb-0"
            />
          </>
        )}

        <Input
          id={`${idPrefix}-rua`}
          name="rua"
          label="Rua"
          placeholder="Digite sua rua"
          autoComplete="address-line1"
          required={required}
          value={address.rua}
          onChange={handleFieldChange}
          containerClassName="col-md-8 mb-0"
        />
        <Input
          id={`${idPrefix}-bairro`}
          name="bairro"
          label="Bairro"
          placeholder="Digite seu bairro"
          required={required}
          value={address.bairro}
          onChange={handleFieldChange}
          containerClassName="col-md-4 mb-0"
        />
        <Input
          id={`${idPrefix}-cidade`}
          name="cidade"
          label="Cidade"
          placeholder="Digite sua cidade"
          autoComplete="address-level2"
          required={required}
          value={address.cidade}
          onChange={handleFieldChange}
          containerClassName="col-md-8 mb-0"
        />
        <Input
          id={`${idPrefix}-uf`}
          name="uf"
          label="UF"
          placeholder="SP"
          autoComplete="address-level1"
          maxLength={2}
          minLength={2}
          required={required}
          value={address.uf}
          onChange={handleFieldChange}
          containerClassName="col-md-4 mb-0"
        />
      </div>

      {status && (
        <p className={`endereco-status mt-3 mb-0 is-${status.type}`} role={status.type === "error" ? "alert" : "status"}>
          {status.message}
        </p>
      )}
    </section>
  );
}

export default BuscarEndereco;

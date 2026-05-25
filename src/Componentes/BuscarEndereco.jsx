import React, { useState } from "react";
import "./CSS/BuscarEndereco.css";

function BuscarEndereco() { 
    // Api Cep - Definindo inputs
    const [cep, setCep] = useState("");
    const [numero, setNumero] = useState("");
    const [complemento, setComplemento] = useState("");
    const [rua, setRua] = useState("");
    const [bairro, setBairro] = useState("");
    const [uf, setUf] = useState("");
    const [cidade, setCidade] = useState("");

    // Busca o cep ao chegar a 8 digitos
    const handleCepChange = async (e) => {
        const valorCep = e.target.value.replace(/\D/g, ""); // Remove hifens ou letras se o usuário digitar
        setCep(valorCep);

        if (valorCep.length === 8) {
            try {
                const resposta = await fetch(`https://viacep.com.br/ws/${valorCep}/json/`);
                const dados = await resposta.json();

                if (!dados.erro) {
                    // Preenche os estados com as informações retornadas da API
                    setRua(dados.logradouro);
                    setBairro(dados.bairro);
                    setUf(dados.uf);
                    setCidade(dados.localidade);
                } else {
                    alert("CEP não encontrado!");
                    limparCamposEndereco();
                }
            } catch (error) {
                console.error("Erro ao buscar o CEP:", error);
            }
        }
    };

    const limparCamposEndereco = () => {
        setRua("");
        setBairro("");
        setUf("");
        setCidade("");
    };

    return ( 
        <>
            <div className="evento-inputs-container" style={{backgroundColor: "aliceblue"}}>
                <div className="evento-inputs-row">
                    <p className="evento-input-label">CEP: </p>
                    <input
                        className="form-control evento-input-cep"
                        type="text"
                        maxLength="9" // Permite espaço para o formato padrão
                        placeholder="12345-678"
                        value={cep}
                        onChange={handleCepChange} // Gatilho de monitoramento
                    />
                    
                    <p className="evento-input-label">Número: </p>
                    <input
                        className="form-control evento-input-numero"
                        type="text"
                        placeholder="123"
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                    />

                    <p className="evento-input-label">Complemento: </p>
                    <input
                        className="form-control evento-input-complemento"
                        type="text"
                        placeholder="Apt 101"
                        value={complemento}
                        onChange={(e) => setComplemento(e.target.value)}
                    />
                </div>

                <div className="evento-inputs-row">
                    <p className="evento-input-label">Rua: </p>
                    <input
                        className="form-control evento-input-rua"
                        type="text"
                        placeholder="Rua Exemplo"
                        value={rua} 
                        readOnly 
                    />

                    <p className="evento-input-label">Bairro: </p>
                    <input
                        className="form-control evento-input-bairro"
                        type="text"
                        placeholder="Bairro Exemplo"
                        value={bairro} 
                        readOnly 
                    />
                </div>

                <div className="evento-inputs-row">
                    <p className="evento-input-label">UF: </p>
                    <input
                        className="form-control evento-input-uf"
                        type="text"
                        placeholder="SP"
                        value={uf} 
                        readOnly 
                    />

                    <p className="evento-input-label">Cidade: </p>
                    <input
                        className="form-control evento-input-cidade"
                        type="text"
                        placeholder="Cidade Exemplo"
                        value={cidade} 
                        readOnly 
                    />
                </div>
            </div>
        </>
    );
}

export default BuscarEndereco;
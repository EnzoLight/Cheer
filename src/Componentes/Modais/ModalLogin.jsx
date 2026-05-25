import React from "react";
import { Link } from "react-router-dom";
import Input from "../Input/Input";
import { Mail, Lock } from "lucide-react";

function ModalLogin() {
  return (
    <div
      className="modal fade"
      id="LoginModal"
      tabIndex="-1"
      aria-labelledby="loginModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div
          className="modal-content"
          style={{
            borderRadius: "15px",
            border: "none",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          }}
        >
          <div
            className="modal-header"
            style={{
              borderBottom: "none",
              padding: "20px 20px 0 20px",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h2
              id="loginModalLabel"
              style={{
                textAlign: "center",
                fontFamily: "Poppins",
                fontWeight: 700,
                color: "#333",
                marginBottom: "0",
              }}
            >
              Bem-vindo de volta
            </h2>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              style={{ position: "absolute", right: "20px", top: "20px" }}
            ></button>
          </div>

          <div className="modal-body" style={{ padding: "0 40px 20px 40px" }}>
            <Input
              type="email"
              label="Email"
              placeholder="voluntario@email.com"
              Icon={Mail}
              iconPosition="left"
            />

            <Input
              type="password"
              label="Senha"
              placeholder="Senha#123"
              Icon={Lock}
              iconPosition="left"
            />

            <div className="d-flex justify-content-center">
              <button
                id="btn_login"
                style={{
                  border: "none",
                  backgroundColor: "#b2d7e4",
                  color: "black",
                  width: "30%",
                  padding: "12px",
                  borderRadius: "8px",
                  fontFamily: "Montserrat",
                  fontWeight: 700,
                  fontSize: "1rem",
                  transition: "all 0.3s ease",
                }}
                type="button"
                className="btn"
                data-bs-dismiss="modal"
              >
                ENTRAR
              </button>
            </div>
          </div>

          <div
            className="modal-footer justify-content-center"
            style={{
              borderTop: "1px solid #eee",
              padding: "20px",
              backgroundColor: "#f9f9f9",
              borderBottomLeftRadius: "15px",
              borderBottomRightRadius: "15px",
            }}
          >
            <h4
              style={{
                textAlign: "center",
                fontFamily: "Poppins",
                fontSize: "0.95rem",
                color: "#555",
                margin: "0",
              }}
            >
              Não tem um perfil de voluntário?
            </h4>
          </div>

          <div
            className="text-center"
            style={{
              paddingBottom: "25px",
              backgroundColor: "#f9f9f9",
              borderBottomLeftRadius: "15px",
              borderBottomRightRadius: "15px",
            }}
          >
            <Link style={{ textDecoration: "none" }} to="/registro">
              <button
                style={{
                  border: "none",
                  backgroundColor: "#FF8C00",
                  color: "black",
                  padding: "10px 30px",
                  borderRadius: "8px",
                  fontFamily: "Montserrat",
                  fontWeight: 700,
                  boxShadow: "0 4px 15px rgba(255, 140, 0, 0.3)",
                }}
                type="button"
                className="btn"
                data-bs-dismiss="modal"
              >
                Registre-se
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalLogin;

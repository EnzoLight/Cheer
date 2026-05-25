import { useState } from "react";

export default function Input({
  type,
  placeholder,
  label,
  id,
  name,
  Icon, // componente Lucide passado por prop
  iconPosition = "left", // padrão à esquerda para UX mais comum
  iconSize = 18, // tamanho confortável sem pesar
  iconColor = "#999", // cinza suave para não competir com o texto
}) {
  const [value, setValue] = useState("");

  const hasIcon = !!Icon; // facilita a lógica do padding
  const iconOffset = 12; // distância do ícone até a borda interna
  const iconGap = 16; // espaço entre o ícone e o texto (mais confortável)
  const minIconPadding = 64; // padding mínimo para empurrar o placeholder
  const iconPadding = Math.max(minIconPadding, iconOffset + iconSize + iconGap);
  const paddingLeft =
    hasIcon && iconPosition === "left" ? `${iconPadding}px` : "12px";
  const paddingRight =
    hasIcon && iconPosition === "right" ? `${iconPadding}px` : "12px";
  const inputId = id || name;

  return (
    <div className="row justify-content-center">
      <div className="col-12 mb-3">
        {label && (
          <label
            htmlFor={inputId}
            style={{
              fontFamily: "Poppins",
              fontWeight: 600,
              fontSize: "0.9rem",
              color: "#666",
              marginBottom: "5px",
              display: "block",
            }}
          >
            {label}
          </label>
        )}

        <div style={{ position: "relative" }}>
          {hasIcon && (
            <span
              style={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                left: iconPosition === "left" ? "12px" : "unset",
                right: iconPosition === "right" ? "12px" : "unset",
                color: iconColor,
                pointerEvents: "none", // não bloquear clique no input
                display: "flex",
                alignItems: "center",
              }}
            >
              <Icon size={iconSize} aria-hidden="true" />
            </span>
          )}

          <input
            id={inputId}
            name={name}
            type={type}
            className="form-control"
            placeholder={placeholder}
            style={{
              borderRadius: "8px",
              padding: "12px",
              paddingLeft, // espaço para o ícone
              paddingRight, // espaço se o ícone for à direita
              border: "1px solid #ddd",
              fontFamily: "Poppins",
            }}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

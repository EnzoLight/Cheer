import { useState } from "react";
import "./Input.css";

function Field({ label, inputId, containerClassName = "", children }) {
  return (
    <div className={`mb-3 cheer-field ${containerClassName}`.trim()}>
      {label && (
        <label className="form-label cheer-field-label" htmlFor={inputId}>
          {label}
        </label>
      )}
      {children}
    </div>
  );
}

export default function Input({
  type = "text",
  placeholder,
  label,
  id,
  name,
  value,
  onChange,
  autoComplete,
  required = false,
  inputMode,
  maxLength,
  minLength,
  min,
  max,
  step,
  disabled = false,
  readOnly = false,
  ariaLabel,
  className = "",
  containerClassName = "",
  Icon,
  iconPosition = "left",
  iconSize = 18,
}) {
  const [internalValue, setInternalValue] = useState("");
  const hasIcon = Boolean(Icon);
  const inputId = id || name;
  const currentValue = value === undefined ? internalValue : value;

  function handleChange(event) {
    if (value === undefined) {
      setInternalValue(event.target.value);
    }

    onChange?.(event);
  }

  const control = (
    <input
      id={inputId}
      name={name}
      type={type}
      autoComplete={autoComplete}
      required={required}
      inputMode={inputMode}
      maxLength={maxLength}
      minLength={minLength}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      readOnly={readOnly}
      aria-label={ariaLabel}
      className={`form-control cheer-control ${className}`.trim()}
      placeholder={placeholder}
      value={currentValue}
      onChange={handleChange}
    />
  );

  return (
    <Field label={label} inputId={inputId} containerClassName={containerClassName}>
      {hasIcon ? (
        <div className="input-group">
          {iconPosition === "left" && (
            <span className="input-group-text cheer-input-icon" aria-hidden="true">
              <Icon size={iconSize} />
            </span>
          )}
          {control}
          {iconPosition === "right" && (
            <span className="input-group-text cheer-input-icon" aria-hidden="true">
              <Icon size={iconSize} />
            </span>
          )}
        </div>
      ) : control}
    </Field>
  );
}

export function Select({
  label,
  id,
  name,
  value,
  onChange,
  required = false,
  disabled = false,
  className = "",
  containerClassName = "",
  children,
}) {
  const inputId = id || name;

  return (
    <Field label={label} inputId={inputId} containerClassName={containerClassName}>
      <select
        id={inputId}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`form-select cheer-control ${className}`.trim()}
      >
        {children}
      </select>
    </Field>
  );
}

export function Textarea({
  label,
  id,
  name,
  value,
  onChange,
  required = false,
  disabled = false,
  rows = 4,
  placeholder,
  className = "",
  containerClassName = "",
}) {
  const inputId = id || name;

  return (
    <Field label={label} inputId={inputId} containerClassName={containerClassName}>
      <textarea
        id={inputId}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        rows={rows}
        placeholder={placeholder}
        className={`form-control cheer-control ${className}`.trim()}
      />
    </Field>
  );
}

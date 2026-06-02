import "./EventosLayout.css";

export function EventosPage({ navbar, children, className = "" }) {
  return (
    <section className="eventos-page">
      {navbar}
      <main className="eventos-main py-4 py-lg-5">
        <div className="container">
          <div className={`row g-4 align-items-start ${className}`.trim()}>{children}</div>
        </div>
      </main>
    </section>
  );
}

export function EventosPanel({
  kicker,
  title,
  description,
  children,
  className = "",
}) {
  return (
    <div className={className || "col-12"}>
      <section className="card h-100 border-0 p-4 eventos-panel">
        <header className="mb-4 eventos-panel-header">
          {kicker && <p className="eventos-kicker">{kicker}</p>}
          <h1>{title}</h1>
          {description && <p className="eventos-panel-copy">{description}</p>}
        </header>
        {children}
      </section>
    </div>
  );
}

import { createElement } from "react";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

export function HomeSectionHeading({ kicker, title, description, centered = true }) {
  return (
    <header className={`home-section-heading mb-4 ${centered ? "mx-auto text-center" : ""}`.trim()}>
      {kicker && <p className="home-kicker">{kicker}</p>}
      <h2>{title}</h2>
      {description && <p className="home-section-description">{description}</p>}
    </header>
  );
}

export function HomeInfoCard({ Icon, title, description }) {
  return (
    <div className="col-md-4">
      <article className="card h-100 border-0 p-4 home-info-card">
        <div className="home-card-icon mb-3 d-inline-flex align-items-center justify-content-center">
          {createElement(Icon, { size: 23 })}
        </div>
        <h3>{title}</h3>
        <p className="mb-0">{description}</p>
      </article>
    </div>
  );
}

export function HomeProfileCard({ Icon, title, items }) {
  return (
    <div className="col-md-4">
      <article className="card h-100 border-0 p-4 home-profile-card">
        <div className="home-card-icon mb-3 d-inline-flex align-items-center justify-content-center">
          {createElement(Icon, { size: 23 })}
        </div>
        <h3>{title}</h3>
        <ul className="list-unstyled mb-0">
          {items.map((item) => (
            <li className="d-flex align-items-start gap-2 mt-2" key={item}>
              <Check size={16} aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}

export function HomeActionLink({ to, children, Icon, variant = "primary" }) {
  return (
    <Link
      className={`btn d-inline-flex align-items-center gap-2 px-4 py-3 fw-semibold ${variant === "primary" ? "btn-primary cheer-btn-primary" : "btn-outline-primary cheer-btn-secondary"}`}
      to={to}
    >
      {Icon && <Icon size={18} aria-hidden="true" />}
      {children}
    </Link>
  );
}

import "./Logo.css";

function Logo({ className = "", alt = "Cheer" }) {
  return (
    <div className={`cheer-logo ${className}`.trim()}>
      <img className="cheer-logo-image" src="/cheer.svg" alt={alt} />
    </div>
  );
}

export default Logo;

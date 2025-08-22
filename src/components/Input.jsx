import React from "react";

export default function Input({ label, error, className = "", ...props }) {
  return (
    <div className="mb-4">
      {label && <label className="label">{label}</label>}
      <input className={`input ${className}`} {...props} />
      {error && <p className="error">{error}</p>}
    </div>
  );
}

import React from "react";
export default function Card({ children, className = "" }) {
  return (
    <div className={`card min-w-52 md:min-w-96 lg:min-w-[28rem] ${className}`}>
      {children}
    </div>
  );
}

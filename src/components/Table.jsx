import React from "react";

export default function Table({ children }) {
  return (
    <div className="-mx-8 sm:-mx-8 px-8  sm:px-8 py-4 overflow-x-auto mt-6">
      <div className="inline-block min-w-full border shadow-xl rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">{children}</table>
      </div>
    </div>
  );
}
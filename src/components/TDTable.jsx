import React from "react";

export default function TDTable({ name, children,onclick }) {
  return (
    <td onClick={onclick} className="px-3 py-2 border-b cursor-pointer border-gray-200 bg-white text-sm w-2/5">
      <div className="flex items-center text-center">
        <div className="ml-3">
          {name ? (
            <p className="text-gray-600 text-sm whitespace-nowrap text-center">
              {name}
            </p>
          ) : (
            <div>{children}</div>
          )}
        </div>
      </div>
    </td>
  );
}
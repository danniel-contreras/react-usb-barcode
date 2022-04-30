import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  getItems,
  getTotal,
  removeItem,
  sumItemCart,
} from "../utils/functions";
import { faPlus, faTrash, faMinus } from "@fortawesome/free-solid-svg-icons";

export const ProductsList = ({ reload, setReload }) => {
  const [prods, setProds] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setReload(false);
    setTotal(getTotal());
    return setProds(getItems());
  }, [reload]);
  const remove = (item) => {
    removeItem(item, "minus");
    setReload(true);
  };
  const deletep = (item) => {
    removeItem(item, "remove");
    setReload(true);
  };
  const sum = (item) => {
    sumItemCart(item);
    setReload(true);
  };
  return (
    <div className="mt-3 h-80 max-h-80 mb-10 ">
      <div className="flex text-white font-semibold">
        <div className="w-64 bg-gray-500 py-2">Producto</div>
        <div className="w-40 bg-gray-600 py-2">Cantidad</div>
        <div className="w-32 bg-gray-500 py-2">Total</div>
      </div>
      <div className="overflow-auto overflow-x-hidden">
        {prods.length > 0 &&
          prods.map((p, index) => (
            <div key={index} className="flex text-white font-semibold">
              <div className="w-64 text-xs text-justify bg-gray-400 py-2 pl-4">
                {p.name}
              </div>
              <div className="w-40 text-base bg-gray-500 py-2">
                <FontAwesomeIcon
                  onClick={() => remove(p)}
                  className=" bg-orange-500 mx-2 w-4 rounded-full p-1 h-4 cursor-pointer"
                  icon={faMinus}
                />
                {p.quantity && p.quantity > 1 ? p.quantity : 1}
                <FontAwesomeIcon
                  onClick={() => sum(p)}
                  className="bg-green-500 h-4 p-1 mx-2 rounded-full w-4 cursor-pointer"
                  icon={faPlus}
                />
                <FontAwesomeIcon
                  onClick={() => deletep(p)}
                  className=" bg-red-500 h-4 p-1 mx-2 rounded-full w-4 cursor-pointer"
                  icon={faTrash}
                />
              </div>
              <div className="w-32 text-xs bg-gray-400 py-2">
                {p.quantity && p.quantity > 1
                  ? `$${(Number(p.quantity) * Number(p.price)).toFixed(2)}`
                  : `$${Number(p.price)}`}
              </div>
            </div>
          ))}
      </div>
      <div className="flex text-white font-semibold">
        <div className="w-64 bg-gray-500 py-2 text-justify pl-4">
          Total a Pagar
        </div>
        <div className="w-40 bg-gray-600 py-2"></div>
        <div className="w-32 bg-gray-600 py-2">${total.toFixed(2)}</div>
      </div>
    </div>
  );
};

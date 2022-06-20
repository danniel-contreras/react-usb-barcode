import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getItems, getTotal, removeItem, sumItemCart } from '../utils/functions';
import { faPlus, faTrash, faMinus } from '@fortawesome/free-solid-svg-icons';

export const ProductsList = ({ reload, setReload }) => {
  const [prods, setProds] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setReload(false);
    setTotal(getTotal());
    return setProds(getItems());
  }, [reload]);
  const remove = (item) => {
    removeItem(item, 'minus');
    setReload(true);
  };
  const deletep = (item) => {
    removeItem(item, 'remove');
    setReload(true);
  };
  const sum = (item) => {
    sumItemCart(item);
    setReload(true);
  };
  return (
    <div>
      <p className="text-red-500 text-base font-semibold  text-left mb-2">LISTADO DE PRODUCTOS</p>
      <div className="flex text-white font-semibold">
        <div style={{ width: '50%' }} className="bg-gray-500 py-2">
          Producto
        </div>
        <div style={{ width: '35%' }} className="bg-gray-600 py-2">
          Cantidad
        </div>
        <div style={{ width: '15%' }} className="bg-gray-500 py-2">
          Total
        </div>
      </div>
      <div className="overflow-auto responsive__height overflow-x-hidden border">
        {prods.length > 0 &&
          prods.map((p, index) => (
            <div key={index} className="flex text-white font-semibold">
              <div
                style={{ width: '50%' }}
                className="border-b md:text-sm lg:text-lg text-justify bg-gray-400 py-2 pl-4"
              >
                {p.name}
              </div>
              <div
                style={{ width: '35%' }}
                className="border-b flex items-center md:text-sm lg:text-lg bg-gray-500 py-2"
              >
                <FontAwesomeIcon
                  onClick={() => remove(p)}
                  className=" bg-orange-500 mx-3 md:w-5 lg:w-7 mt-1 rounded-full p-1 md:h-5 lg:h-7  cursor-pointer"
                  icon={faMinus}
                />
                {p.quantity && p.quantity > 1 ? p.quantity : 1}
                <FontAwesomeIcon
                  onClick={() => sum(p)}
                  className="bg-green-500 mx-3 md:w-5 lg:w-7 mt-1 rounded-full p-1 md:h-5 lg:h-7  cursor-pointer"
                  icon={faPlus}
                />
                <FontAwesomeIcon
                  onClick={() => deletep(p)}
                  className=" bg-red-500 md:w-5 lg:w-7 mt-1 rounded-full p-1 md:h-5 lg:h-7  cursor-pointer"
                  icon={faTrash}
                />
              </div>
              <div style={{ width: '15%' }} className="border-b text-lg bg-gray-400 py-2">
                {p.quantity && p.quantity > 1
                  ? `$${(Number(p.quantity) * Number(p.price)).toFixed(2)}`
                  : `$${Number(p.price)}`}
              </div>
            </div>
          ))}
      </div>
      <div className="flex text-white font-semibold">
        <div style={{ width: '50%' }} className="bg-gray-500 py-2 text-justify pl-4">
          Total a Pagar
        </div>
        <div style={{ width: '35%' }} className=" bg-gray-600 py-2"></div>
        <div style={{ width: '35%' }} className="bg-gray-600 py-2">
          ${total}
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from "react";
import { getProductByCode } from "../api/products.api";
import { deleteItems, formatDate, getItems, setItemCart } from "../utils/functions";
import { ProductsList } from "../components/ProductsList";
import useEventListener from "../hooks/use-event-listener";
import Clock from "../components/Clock";
import { Layout } from "../components/Layout";
import { Link } from "react-router-dom";
import { ChartBar } from "../components/Chart";
import { addSale } from "../api/sale.api";
import { toast } from "react-toastify";

export const Home = () => {
  const [reload, setReload] = useState(false);
  const [code, setCode] = useState("");
  let barcode = "";
  let interval;
  const handler = function (evt) {
    if (interval) clearInterval(interval);
    if (evt.code == "Enter") {
      if (barcode) getProduct(barcode);
      barcode = "";
      return;
    }
    if (evt.key != "Shift") barcode += evt.key;
    interval = setInterval(() => (barcode = ""), 200000);
  };
  useEventListener("keydown", handler);
  const getProduct = (code) => {
    getProductByCode(code).then(({ data }) => {
      setItemCart(data.data);
      setReload(true);
    });
  };
  const onchange = (e) => {
    setCode(e.target.value);
  };
  const onsubmit = (e) => {
    e.preventDefault();
    getProduct(code);
  };

  const addNewSale = () => {
    if (getItems()) {
      addSale(getItems()).then(({ data }) => {
        if (data.ok) {
          toast.success("Se ah realizado la compra")
          deleteItems()
          setReload(true);
        };
      });
    }
  };

  return (
    <Layout>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-red-500 text-2xl">LISTA DE PRODUCTOS</p>
          <ProductsList reload={reload} setReload={setReload} />
          <button onClick={addNewSale} className="bg-quepal w-full text-white py-2 mt-28 text-lg font-semibold px-8 rounded-xl">
            Realizar Venta
          </button>
          <button className="bg-hydrogen w-full text-white py-2 mt-6 text-lg font-semibold px-8 rounded-xl">
            Venta de Servicios
          </button>
          <div className="flex justify-center mt-8">
            <p className="text-sm font-semibold px-4">Daniel Contreras</p>
            <span className="text-sm font-semibold">-</span>
            <Clock />
            <span className="text-sm font-semibold">-</span>
            <p className="text-sm font-semibold px-4">{formatDate()}</p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="border rounded shadow w-full text-justify p-4 flex justify-center flex-col">
            <label className="text-xs text-gradient font-bold">
              Ingresar Codigo
            </label>
            <form onSubmit={onsubmit} className="flex flex-col">
              <input
                className="border rounded w-fulll mt-1 px-2 py-2 text-sm"
                placeholder="Escribe el codigo del producto"
                name="code"
                onChange={onchange}
              />
              <button className="bg-very-blue text-white py-2 rounded-xl text-base font-semibold mt-3">
                Aceptar
              </button>
            </form>
          </div>
          <div className="border rounded mt-6 shadow w-full text-justify p-4 flex justify-center flex-col">
            <p className="text-gradient text-base font-semibold">
              Ventas Totales: 56
            </p>
            <p className="text-gradient text-base font-semibold mt-3">
              Ingreso Total: $56
            </p>
          </div>
          <div>
            <ChartBar />
          </div>
          <button className="bg-sunrise mt-7 text-white py-2 text-lg font-semibold px-8 rounded-xl">
            <Link to="/products">Ver Productos</Link>
          </button>
          <button className="gradient-noname text-white py-2 text-lg mt-4 font-semibold px-8 rounded-xl">
          <Link to="/sales-history">Ver Historial de Ventas</Link>
          </button>
          <button className="bg-danger text-white py-2 text-lg mt-4 font-semibold px-8 rounded-xl">
            Cerrar Sesion
          </button>
        </div>
      </div>
    </Layout>
  );
};

import React, { useState, useEffect } from "react";
import { getProductByCode } from "../api/products.api";
import {
  deleteItems,
  formatDate,
  getItems,
  setItemCart,
} from "../utils/functions";
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
          toast.success("Se ah realizado la compra");
          deleteItems();
          setReload(true);
        }
      });
    }
  };

  return (
    <Layout>
      <div className="flex responsive__page flex-row">
        <div className="responsive__section">
          <ProductsList reload={reload} setReload={setReload} />
        </div>
        <div className="flex flex-col ml-10 responsive__section__two">
          <div className="responsive__cards">
            <div>
              <p className="text-red-500 text-xl md:text-lg lg:text-xl  text-left md:mb-4 lg:mb-6 uppercase">
                Buscar Producto
              </p>
              <div className="border rounded responsive__card shadow w-full text-justify p-4 flex justify-center flex-col">
                <label className="text-sm md:text-xs lg:text-sm text-gradient font-bold">
                  Ingresar Codigo
                </label>
                <form onSubmit={onsubmit} className="flex flex-col">
                  <input
                    className="border rounded w-fulll mt-1 px-2 py-2 md:py-1 lg:py-2 text-sm md:text-xs lg:text-sm"
                    placeholder="Escribe el codigo del producto"
                    name="code"
                    onChange={onchange}
                  />
                  <button className="bg-very-blue text-white py-3 md:py-1 lg:py-3 rounded-2xl text-xl md:text-base lg:text-xl font-semibold mt-3">
                    Aceptar
                  </button>
                </form>
              </div>
            </div>
            <div>
              <p className="text-red-500 responsive__text text-xl md:text-lg lg:text-xl  text-left mb-6 md:mb-4 lg:mb-6 uppercase  mt-6 md:mt-6 lg:mt-6">
                calculo de venta
              </p>
              <div className="border responsive__card rounded shadow w-full text-justify p-4 flex justify-center flex-col">
                <label className="text-sm md:text-xs lg:text-sm text-gradient font-bold">
                  Ingresar Cantidad de pago
                </label>
                <form onSubmit={onsubmit} className="flex flex-col">
                  <input
                    className="border rounded w-fulll mt-1 px-2 py-2 text-sm md:py-1 lg:py-2 md:text-xs lg:text-sm"
                    placeholder="Escribe el codigo del producto"
                    name="code"
                    onChange={onchange}
                  />
                  <span className="text-xl md:text-sm lg:text-xl text-gradient my-3 md:my-2 lg:my-3">
                    Cambio: $2.40
                  </span>
                  <button className="bg-very-blue text-white py-3 md:py-1 lg:py-3 rounded-xl text-xl md:text-base lg:text-xl font-semibold mt-3">
                    Aceptar
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="responsive__group__buttons">
            <button
              onClick={addNewSale}
              className="bg-quepal w-full text-white py-4 md:py-1 lg:py-4 mt-8 md:mt-4 lg:mt-8  text-xl md:text-base lg:text-xl font-semibold px-8 rounded-2xl"
            >
              Realizar Venta
            </button>
            <button className="bg-hydrogen w-full text-white py-4 md:py-1 lg:py-4 mt-8 md:mt-4 lg:mt-8  text-xl md:text-base lg:text-xl font-semibold px-8 rounded-2xl">
              Venta de Servicios
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center responsive__footer md:justify-start lg:justify-center md:mt-0 lg:mt-8">
        <p className="text-xl md:text-sm lg:text-xl font-semibold px-4">
          Daniel Contreras
        </p>
        <span className="text-xl md:text-sm lg:text-xl font-semibold">-</span>
        <Clock />
        <span className="text-xl md:text-sm lg:text-xl font-semibold">-</span>
        <p className="text-xl md:text-sm lg:text-xl font-semibold px-4">
          {formatDate()}
        </p>
      </div>
    </Layout>
  );
};

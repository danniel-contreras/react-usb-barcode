import React, { useState, useEffect } from "react";
import { getProductByCode } from "../api/products.api";
import {
  deleteItems,
  formatDate,
  getItems,
  getTotal,
  setItemCart,
} from "../utils/functions";
import { ProductsList } from "../components/ProductsList";
import Modal from "../components/Modal";
import useEventListener from "../hooks/use-event-listener";
import Clock from "../components/Clock";
import { Layout } from "../components/Layout";
import { addSale } from "../api/sale.api";
import { toast } from "react-toastify";
import { closeBox, deleteBox, getBox } from "../api/box";
import { Box } from "../components/Box";
import { useSelector } from "react-redux";
import ExpensesForm from "../components/ExpensesForm";

export const Home = () => {
  const [reload, setReload] = useState(false);
  const [code, setCode] = useState("");
  const [change, setChange] = useState(0);
  const [box, setBox] = useState();
  const [newBox, setNewBox] = useState(false);
  const [cajaFisica, setCajaFisica] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalser, setModalser] = useState(false);

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    setNewBox(false);
    return setBox(getBox());
  }, [newBox]);

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
    getProductByCode(code)
      .then(({ data }) => {
        setItemCart(data.data);
        setReload(true);
      })
      .catch(({ response }) => {
        if (!response.ok) {
          toast.error("No hay productos con este codigo");
        }
      });
  };
  const onchange = (e) => {
    setCode(e.target.value);
  };
  const onsubmit = (e) => {
    e.preventDefault();
    getProduct(code);
  };
  const onchange_change = (e) => {
    const money = Number(e.target.value);
    if(money === 0){
      setChange(0);
      return;
    }
    setChange(money - getTotal());
  };
  const addNewSale = () => {
    if (getItems()) {
      const data = { products: getItems(), boxId: getBox() };
      addSale(data)
        .then(({ data }) => {
          if (data.ok) {
            toast.success("Se ah realizado la compra");
            deleteItems();
            setReload(true);
          }
        })
        .catch(() => {
          toast.error("Ah ocurrido un error inesperado");
        });
    }
  };

  const close_the_box = () => {
    if (cajaFisica <= 0) {
      toast.warning("Debes escribir la cantidad en caja");
      return;
    }
    const data = {
      state: false,
      cajaFisica,
    };
    closeBox(data, getBox())
      .then(({ data }) => {
        if (data.ok) {
          toast.success("¡La caja se ah cerrado");
          deleteBox();
          setShowModal(false);
          setNewBox(true);
        }
      })
      .catch(() => {
        toast.error("No se completo la accion");
      });
  };

  return (
    <Layout>
      {!box ? (
        <Box setNewBox={setNewBox} />
      ) : (
        <>
          <div className="flex responsive__page flex-row">
            <div className="responsive__section">
              <ProductsList reload={reload} setReload={setReload} />
            </div>
            <div className="flex flex-col ml-10 responsive__section__two">
              <div className="responsive__cards">
                <div>
                  <p className="text-red-500 text-base font-semibold  text-left mb-1 uppercase">
                    Buscar por Codigo
                  </p>
                  <div className="border rounded responsive__card shadow w-full text-justify p-4 flex justify-center flex-col">
                    <label className="text-sm text-gradient font-bold">
                      Ingresar el Codigo
                    </label>
                    <form onSubmit={onsubmit} className="flex">
                      <input
                        className="border rounded w-64 px-2 mt-1 py-1 text-sm md:text-xs lg:text-sm"
                        placeholder="Escribe el codigo del producto"
                        name="code"
                        onChange={onchange}
                      />
                      <button className="bg-very-blue ml-4 text-white py-2 px-8 rounded-2xl text-base font-semibold mt-1">
                        Aceptar
                      </button>
                    </form>
                  </div>
                </div>
                <div>
                  <p className="text-red-500 responsive__text text-base font-semibold text-left md:mb-2 lg:mb-4 uppercase  mt-2">
                    Calculo de venta
                  </p>
                  <div className="border responsive__card rounded shadow w-full text-justify p-4 flex justify-center flex-col">
                    <label className="text-sm md:text-xs lg:text-sm text-gradient font-bold">
                      Ingresar Cantidad de pago
                    </label>

                    <div className="flex w-full">
                      <input
                        step=".01"
                        min={0}
                        className="border rounded w-64 mt-1 px-2 py-1 text-sm md:text-xs lg:text-sm"
                        placeholder="Escribe la cantidad de pago"
                        name="change"
                        type="number"
                        onChange={onchange_change}
                      />
                    </div>
                    <span className="text-base text-gradient my-2">
                      Cambio: ${change}
                    </span>
                  </div>
                </div>
              </div>
              <div className="responsive__group__buttons">
                <button
                  onClick={addNewSale}
                  className="bg-quepal w-full text-white py-4 md:py-1 lg:py-3 md:mt-4 lg:mt-6  text-xl md:text-base lg:text-lg font-semibold px-8 rounded-2xl"
                >
                  Realizar Venta
                </button>
                <div className="flex">
                  <button
                    onClick={() => setModalser(true)}
                    className="bg-hydrogen w-full text-white py-4 md:py-1 lg:py-3 md:mt-4 lg:mt-4  text-base font-semibold px-8 rounded-2xl"
                  >
                    Venta de Servicios
                  </button>
                  <button
                    onClick={() => setShowModal(true)}
                    className="bg-sunrise w-full text-white py-4 md:py-1 lg:py-3 md:mt-4 lg:mt-4  text-base font-semibold px-8 ml-4 rounded-2xl"
                  >
                    Cerrar Caja
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center responsive__footer md:justify-start lg:justify-center md:mt-0 lg:mt-8">
            <p className="text-xl md:text-sm lg:text-xl font-semibold px-4">
              {auth?.user.email}
            </p>
            <span className="text-xl md:text-sm lg:text-xl font-semibold">
              -
            </span>
            <Clock />
            <span className="text-xl md:text-sm lg:text-xl font-semibold">
              -
            </span>
            <p className="text-xl md:text-sm lg:text-xl font-semibold px-4">
              {formatDate()}
            </p>
          </div>
        </>
      )}
      <Modal
        title="Cerrar Caja Actual"
        showModal={showModal}
        setShowModal={setShowModal}
      >
        <div className="flex flex-col w-72">
          <label className="text-sm md:text-xs lg:text-sm text-gradient font-bold">
            Total en caja
          </label>
          <input
            placeholder="Escribe la cantidad"
            type="number"
            onChange={(e) => setCajaFisica(e.currentTarget.value)}
            className="border rounded w-fulll mt-1 px-2 py-2 md:py-1 lg:py-2 text-sm md:text-xs lg:text-sm"
          />
          <button
            onClick={close_the_box}
            className="bg-hydrogen w-full text-white py-4 md:py-1 lg:py-3 md:mt-4 lg:mt-4  text-xl md:text-base lg:text-lg font-semibold px-8 rounded-2xl"
          >
            Cerrar Caja
          </button>
        </div>
      </Modal>
      <Modal
        showModal={modalser}
        setShowModal={setModalser}
        title="Nuevo servicio de venta"
      >
        <ExpensesForm setShow={setModalser} />
      </Modal>
    </Layout>
  );
};

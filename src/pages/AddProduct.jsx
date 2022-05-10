import React, { useRef, useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import { useFormik } from "formik";
import * as yup from "yup";
import useEventListener from "../hooks/use-event-listener";
import { getCategories } from "../api/categories.api";
import { getStores } from "../api/stores.api";
import { getStore } from "../api/token";
import { Link, useNavigate } from "react-router-dom";
import { addProduct } from "../api/products.api";

export const AddProduct = () => {
  const [stores, setStores] = useState([]);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  const getAllCategories = () => {
    getCategories(1, 100).then(({ data }) => {
      if (data.ok) {
        setCategories(data.categories);
      }
    });
  };

  const getAllStores = () => {
    getStores(1, 100).then(({ data }) => {
      if (data.ok) {
        setStores(data.stores);
      }
    });
  };

  useEffect(() => {
    getAllCategories();
    getAllStores();
    return;
  }, []);

  let barcode = "";
  const barcode_input = useRef(null);
  let interval;
  const handler = function (evt) {
    if (interval) clearInterval(interval);
    if (evt.code == "Enter") {
      if (barcode) {
        barcode_input.current.value = barcode;
      }
      barcode = "";
      return;
    }
    if (evt.key != "Shift") barcode += evt.key;
    interval = setInterval(() => (barcode = ""), 200000);
  };
  useEventListener("keydown", handler);

  const formik = useFormik({
    initialValues: initial(),
    validationSchema: yup.object({
      categoriesId: yup
        .number()
        .required("Debes seleccionar la categoria")
        .typeError("Debes seleccionar la categoria"),
      name: yup.string().required("Debes escribir el nombre"),
      price: yup
        .number()
        .required("El precio es requerido")
        .typeError("Precio invalido"),
      stock: yup
        .number()
        .required("El stock es requerido")
        .typeError("stock invalido"),
      minimunStock: yup
        .number()
        .required("El stock minimo es requerido")
        .typeError("Stock minimo invalido"),
      code: yup.string().required("Debes escribir el codigo"),
    }),
    onSubmit: (values) => {
      const data = { ...values, storesId: getStore() };
      addProduct(data).then(({ data }) => {
        if (data.ok) {
          navigate("/products");
        }
      });
    },
  });
  return (
    <Layout>
      <p className="text-red-400 text-xl">AGREGAR NUEVO PRODUCTO</p>
      <div className="flex justify-center items-center">
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col p-1 mt-1 w-96 text-justify">
            <label className="text-sm font-semibold text-gradient">
              Nombre
            </label>
            <input
              type="text"
              name="name"
              onChange={formik.handleChange}
              placeholder="Ingresa el nombre de la categoria"
              className={
                "w-full border p-2 mt-2 text-sm rounded outline-none hover:border-green-400 " +
                (formik.errors.name && formik.touched.name
                  ? "border-red-400"
                  : "border-gray-300")
              }
            />
            {formik.errors.name && formik.touched.name && (
              <span className="text-sm font-normal text-red-400">
                {formik.errors.name}
              </span>
            )}
          </div>
          <div className="flex flex-col p-1 mt-1 w-96 text-justify">
            <label className="text-sm text-gradient font-semibold">
              Precio
            </label>
            <input
              type="text"
              name="price"
              onChange={formik.handleChange}
              placeholder="Ingresa el nombre de la categoria"
              className={
                "w-full border p-2 mt-2 text-sm rounded outline-none hover:border-green-400 " +
                (formik.errors.price && formik.touched.price
                  ? "border-red-400"
                  : "border-gray-300")
              }
            />
            {formik.errors.price && formik.touched.price && (
              <span className="text-sm font-normal text-red-400">
                {formik.errors.price}
              </span>
            )}
          </div>
         
          <div className="flex flex-col p-1 mt-1 w-96 text-justify">
            <label className="text-sm font-semibold text-gradient">Stock</label>
            <input
              type="text"
              name="stock"
              onChange={formik.handleChange}
              placeholder="Ingresa el nombre de la categoria"
              className={
                "w-full border p-2 mt-2 text-sm rounded outline-none hover:border-green-400 " +
                (formik.errors.stock && formik.touched.stock
                  ? "border-red-400"
                  : "border-gray-300")
              }
            />
            {formik.errors.stock && formik.touched.stock && (
              <span className="text-sm font-normal text-red-400">
                {formik.errors.stock}
              </span>
            )}
          </div>
          <div className="flex flex-col p-1 mt-1 w-96 text-justify">
            <label className="text-sm font-semibold text-gradient">
              Stock Minimo
            </label>
            <input
              type="text"
              name="minimunStock"
              onChange={formik.handleChange}
              placeholder="Ingresa el nombre de la categoria"
              className={
                "w-full border p-2 mt-2 text-sm rounded outline-none hover:border-green-400 " +
                (formik.errors.minimunStock && formik.touched.minimunStock
                  ? "border-red-400"
                  : "border-gray-300")
              }
            />
            {formik.errors.minimunStock && formik.touched.minimunStock && (
              <span className="text-sm font-normal text-red-400">
                {formik.errors.minimunStock}
              </span>
            )}
          </div>
          <div className="flex flex-col p-1 mt-1 w-96 text-justify">
            <label className="text-sm font-semibold text-gradient">
              Categoria
            </label>
            <select
              name="categoriesId"
              defaultValue={"DEFAULT"}
              onChange={formik.handleChange}
              className={
                "w-full border p-2 mt-2 text-sm rounded outline-none hover:border-green-400 " +
                (formik.errors.categoriesId && formik.touched.categoriesId
                  ? "border-red-400"
                  : "border-gray-300")
              }
            >
              <option disabled value={"DEFAULT"}>
                Seleccionar categoria
              </option>
              {categories.length > 0 &&
                categories.map((c, index) => (
                  <option key={index} value={c.id}>
                    {c.name}
                  </option>
                ))}
            </select>
            {formik.errors.categoriesId && formik.touched.categoriesId && (
              <span className="text-sm font-normal text-red-400">
                {formik.errors.categoriesId}
              </span>
            )}
          </div>
          <div className="flex flex-col p-1 mt-1 w-96 text-justify">
            <label className="text-sm font-semibold text-gradient">
              Sucursal
            </label>
            <select
              name="storesId"
              disabled
              defaultValue={getStore()}
              placeholder="Ingresa el nombre de la categoria"
              className={
                "w-full border p-2 mt-2 text-sm rounded outline-none hover:border-green-400 "
              }
            >
              <option disabled value={"DEFAULT"}>
                Seleccionar sucursal
              </option>
              {stores.length > 0 &&
                stores.map((c, index) => (
                  <option key={index} value={c.id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex flex-col p-1 mt-1 w-96 text-justify">
          <label className="text-sm font-semibold text-gradient">
            Codigo
          </label>
          <input
            ref={barcode_input}
            type="text"
            name="code"
            onChange={formik.handleChange}
            placeholder="Ingresa el nombre de la categoria"
            className={
              "w-full border p-2 mt-2 text-sm rounded outline-none hover:border-green-400 " +
              (formik.errors.code && formik.touched.code
                ? "border-red-400"
                : "border-gray-300")
            }
          />
          {formik.errors.code && formik.touched.code && (
            <span className="text-sm font-normal text-red-400">
              {formik.errors.code}
            </span>
          )}
        </div>
          <button
            type="submit"
            className="bg-quepal w-full text-white py-2 mt-4 text-lg font-semibold px-8 rounded-xl"
          >
            Guardar
          </button>
        </form>
      </div>
      <div className="flex">
        <button className="gradient-noname mx-4 mt-6 text-white py-2 text-lg font-semibold px-12 rounded">
          <Link to="/products">Regresar</Link>
        </button>
        <button className="bg-danger mx-4 mt-6 text-white py-2 text-lg font-semibold px-12 rounded">
        <Link to="/">Ir al Inicio</Link>
        </button>
      </div>
    </Layout>
  );
};

const initial = () => {
  return {
    categoriesId: "",
    name: "",
    price: 0,
    stock: 0,
    minimunStock: 0,
    code: "",
  };
};

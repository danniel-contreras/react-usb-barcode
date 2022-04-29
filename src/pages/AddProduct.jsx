import React from "react";
import { Layout } from "../components/Layout";
import { useFormik } from "formik";
import * as yup from "yup";

export const AddProduct = () => {
  const formik = useFormik({
    initialValues: initial(),
    validationSchema: yup.object({
      storesId: yup
        .number()
        .required("Debes seleccionar la sucursal")
        .typeError("Debes seleccionar la sucursal"),
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
    onSubmit: (values) => {},
  });
  return (
    <Layout>
      <p className="text-red-400 text-xl">Agregar nuevo producto</p>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col p-1 mt-1 w-96 text-justify">
            <label className="text-sm font-semibold text-gradient">Nombre</label>
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
            <label className="text-sm text-gradient font-semibold">Precio</label>
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
            <label className="text-sm font-semibold text-gradient">Nombre</label>
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
            <label className="text-sm font-semibold text-gradient">Nombre</label>
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
            <label className="text-sm font-semibold text-gradient">Nombre</label>
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
            <label className="text-sm font-semibold text-gradient">Nombre</label>
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
          <label className="text-sm font-semibold text-gradient">Nombre</label>
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
        </form>
      </div>
    </Layout>
  );
};

const initial = () => {
  return {
    storesId: "",
    categoriesId: "",
    name: "",
    price: 0,
    stock: 0,
    minimunStock: 0,
    code: "",
  };
};

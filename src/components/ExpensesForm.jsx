import { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { saveExpense } from "../api/sale.api";
import { toast } from "react-toastify";
import { getBox } from "../api/box";

export default function ExpensesForm({ setShow }) {
  const [cashBox, setCashBox] = useState(false);
  const formik = useFormik({
    initialValues: initial(),
    validationSchema: yup.object({
      amount: yup.number().required("Escribe la cantidad"),
      cashBox: yup.boolean(),
      description: yup.string().required("Escribe la descripcion"),
      type: yup.string().required("Escribe el tipo"),
    }),
    onSubmit: (values) => {
      const data = {
        ...values,
        cashBox,
        howMuch: cashBox ? values.howMuch : 0,
        boxId:getBox()
      };
      saveExpense(data)
        .then(({ data }) => {
          if (data.ok) {
            toast.info("Se agrego con exito!!");
            setShow(false);
          }
        })
        .catch(() => {
          toast.error("No se ah podido completar la accion!!");
        });
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col p-1 mt-1 w-96 text-justify">
          <label className="text-sm font-semibold text-gradient">
            Tipo de servicio
          </label>
          <input
            type="text"
            name="type"
            onChange={formik.handleChange}
            placeholder="Ingresa el tipo de servicio a vender"
            className={
              "w-full border p-2 mt-2 text-sm rounded outline-none hover:border-green-400 " +
              (formik.errors.type && formik.touched.type
                ? "border-red-400"
                : "border-gray-300")
            }
          />
          {formik.errors.type && formik.touched.type && (
            <span className="text-sm font-normal text-red-400">
              {formik.errors.type}
            </span>
          )}
        </div>
        <div className="flex flex-col p-1 mt-1 w-96 text-justify">
          <label className="text-sm font-semibold text-gradient">
            Descripcion del servicio
          </label>
          <textarea
            type="text"
            name="description"
            onChange={formik.handleChange}
            cols={3}
            roes={3}
            placeholder="Ingresa la descripcion"
            className={
              "w-full border p-2 mt-2 text-sm rounded outline-none hover:border-green-400 " +
              (formik.errors.description && formik.touched.description
                ? "border-red-400"
                : "border-gray-300")
            }
          />
          {formik.errors.description && formik.touched.description && (
            <span className="text-sm font-normal text-red-400">
              {formik.errors.description}
            </span>
          )}
        </div>
        <div className="flex flex-col p-1 mt-1 w-96 text-justify">
          <label className="text-sm font-semibold text-gradient">
            Monto del servicio
          </label>
          <input
            type="text"
            name="amount"
            onChange={formik.handleChange}
            placeholder="Ingresa la descripcion"
            className={
              "w-full border p-2 mt-2 text-sm rounded outline-none hover:border-green-400 " +
              (formik.errors.amount && formik.touched.amount
                ? "border-red-400"
                : "border-gray-300")
            }
          />
          {formik.errors.amount && formik.touched.amount && (
            <span className="text-sm font-normal text-red-400">
              {formik.errors.amount}
            </span>
          )}
        </div>
        <div className="flex mt-5">
          <label className="text-sm font-semibold text-gradient">
            Usara dinero de caja
          </label>
          <input
            defaultChecked={cashBox}
            onChange={() => setCashBox(!cashBox)}
            className="w-5 h-5 ml-4"
            type="checkbox"
          />
        </div>
        {cashBox && (
          <div className="flex flex-col p-1 mt-3 w-96 text-justify">
            <label className="text-sm font-semibold text-gradient">
              Cantidad a usar
            </label>
            <input
              type="text"
              name="howMuch"
              onChange={formik.handleChange}
              placeholder="Ingresa la descripcion"
              className={
                "w-full border p-2 mt-2 text-sm rounded outline-none hover:border-green-400 " +
                (formik.errors.howMuch && formik.touched.howMuch
                  ? "border-red-400"
                  : "border-gray-300")
              }
            />
            {formik.errors.howMuch && formik.touched.howMuch && (
              <span className="text-sm font-normal text-red-400">
                {formik.errors.howMuch}
              </span>
            )}
          </div>
        )}
        <button
          type="submit"
          className="bg-quepal w-full text-white py-2 mt-4 text-lg font-semibold px-8 rounded-xl"
        >
          Guardar
        </button>
      </form>
    </div>
  );
}
const initial = () => {
  return {
    amount: "",
    description: "",
    howMuch: 0,
    type: "",
  };
};

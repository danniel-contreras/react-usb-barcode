import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { addBox, saveBox } from "../api/box";
import { toast } from "react-toastify";

export const Box = ({ setNewBox }) => {
  const formik = useFormik({
    initialValues: { boxStart: 0 },
    validationSchema: yup.object({
      boxStart: yup
        .number()
        .required("Debes proporcionar el monto inicial")
        .typeError("Debes proporcionar el monto inicial"),
    }),
    onSubmit: (values) => {
      addBox(values).then(({ data }) => {
        if (data.ok) {
          toast.info("Se creo la caja!!")
          saveBox(data.expenses.id);
          setNewBox(true);
        }
      }).catch(()=>{
        toast.error("Ah ocurrido un error inesperado")
      });
    },
  });
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="h-auto w-96 p-5 border rounded shadow">
        <span className="text-lg text-gradient font-semibold">
          Crear nueva caja
        </span>
        <form onSubmit={formik.handleSubmit}>
          <div className="text-left mt-3">
            <label className="my-2 text-xs text-gradient font-semibold">
              Monto inicial
            </label>
            <input
              name="boxStart"
              onChange={formik.handleChange}
              type="number"
              placeholder="Escribe el monto inicial"
              className="border w-full text-xs py-2 px-3 rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-quepal w-full text-white py-2 mt-4 text-lg font-semibold px-8 rounded-xl"
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};

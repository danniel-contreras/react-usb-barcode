import React, { useState } from "react";
import { login } from "../api/auth.api";
import { useDispatch } from "react-redux";
import { newLogin } from "../redux/actions/auth.actions";
import { toast } from "react-toastify";

export const Auth = () => {
  const [data, setData] = useState({ email: "", pass: "" });
  const dispatch = useDispatch();
  const onchange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onsubmit = (e) => {      
    e.preventDefault();
    login(data)
      .then(({ data }) => {
        toast.success("¡¡Bienvenido");
        dispatch(
          newLogin(data.token, data.data?.stores.id, data.data?.roles.id)
        );
      })
      .catch(() => {
        toast.error("¡¡Los datos son incorrectos");
      });
  };

  return (
    <div className="App flex flex-col w-screen h-screen justify-center items-center">
      <div className="h-80 w-80 bg-white rounded-xl p-8">
        <p className="text-gradient text-2xl font-bold">Bienvenido!!!</p>
        <form onSubmit={onsubmit}>
          <div className="flex flex-col text-left mt-2">
            <label className="text-sm font-semibold text-gradient">Email</label>
            <input
              name="email"
              onChange={onchange}
              placeholder="Escribe tu email"
              className="border rounded text-xs px-2 py-2"
            />
          </div>
          <div className="flex flex-col text-left mt-5">
            <label className="text-sm font-semibold text-gradient">
              Password
            </label>
            <input
              name="pass"
              onChange={onchange}
              type="password"
              placeholder="Escribe tu password"
              className="border rounded text-xs px-2 py-2"
            />
          </div>
          <button
            type="submit"
            className="bg-kimoby mx-4 mt-6 text-white py-2 text-lg font-semibold px-14 rounded"
          >
            Iniciar Sesion
          </button>
        </form>
      </div>
    </div>
  );
};

import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { getProductsPaginated } from "../api/products.api";
import { Layout } from "../components/Layout";
import Pagination from "../components/Pagination";
import Table from "../components/Table";
import TDTable from "../components/TDTable";
import THTable from "../components/THTable";
import Crontab from "reactjs-crontab";

export const Products = () => {
  const sayHello = () => {
    console.log("HOLA MUNDO");
  };
  const tasks = useMemo(
    () => [
      {
        fn: sayHello,
        config: "30 19 * * *",
        // this runs every minutes
      },
    ],
    []
  );
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    last: 0,
    size: 10,
    current: 0,
  });
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const getProducts = (page,name="") => {
    getProductsPaginated(page,name).then(({ data }) => {
      console.log(data);
      if (data.ok) {
        setProducts(data.products);
        setPagination({
          ...pagination,
          total: data.total,
          last: data.totalPag,
          current: data.curentPag,
        });
      }
    });
  };
  useEffect(() => {
    return getProducts(page);
  }, [page]);

  useEffect(() => {
    return getProducts(1, name);
  }, [name]);
  return (
    <Layout>
      <Crontab
        tasks={tasks}
        timeZone="local" // UTC timezone.
        dashboard={{
          hidden: false, // if true, dashboard is hidden
          route: "/", // dashboard will only appear in '/' route
        }}
      />
      <p className="text-red-500 text-xl">LISTA DE PRODUCTOS DISPONIBLES</p>
      <div className="flex mt-2">
        <div className="mt-1">
          <label className="text-gradient font-semibold text-sm">
            Buscar Producto
          </label>
          <input
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Escribe para buscar"
            className="ml-4 border w-96 rounded py-2 px-2 text-sm"
          />
        </div>
        <button className="bg-very-blue text-white py-2 rounded-xl text-base font-semibold w-64 ml-10">
          <Link to="/add-product">Agregar Producto</Link>
        </button>
      </div>
      <Table>
        <thead>
          <tr>
            <THTable name="nombre" />
            <THTable name="categoria" />
            <THTable name="precio" />
            <THTable name="stock" />
            <THTable name="codigo" />
            <THTable name="stock minimo" />
          </tr>
        </thead>
        <tbody>
          {products?.map((p) => (
            <tr key={p.id}>
              <TDTable name={p.name} />
              <TDTable name={p.categories.name} />
              <TDTable name={`$${p.price}`} />
              <TDTable name={p.stock} />
              <TDTable name={p.code} />
              <TDTable name={p.minimunStock} />
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        className="pagination-bar"
        onPageChange={setPage}
        last={pagination.last}
        totalCount={pagination.total}
        currentPage={pagination.current}
        pageSize={pagination.size} />
    </Layout>
  );
};

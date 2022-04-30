import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProductsPaginated } from "../api/products.api";
import { Layout } from "../components/Layout";
import Pagination from "../components/Pagination";
import Table from "../components/Table";
import TDTable from "../components/TDTable";
import THTable from "../components/THTable";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    last: 0,
    size: 10,
    current: 0,
  });
  const [page, setPage] = useState(1);
  const getProducts = (page) => {
    getProductsPaginated(page).then(({ data }) => {
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
  return (
    <Layout>
      <p className="text-red-500 text-xl">LISTA DE PRODUCTOS DISPONIBLES</p>
      <div className="flex mt-2">
        <div className="mt-1">
          <label className="text-gradient font-semibold text-sm">
            Buscar Producto
          </label>
          <input
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
            <THTable name="acciones" />
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
              <TDTable></TDTable>
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
        pageSize={pagination.size}
      />
      <div className="flex">
        <button className="gradient-noname mx-4 mt-6 text-white py-2 text-lg font-semibold px-8 rounded">
          <Link to="/">Volver al inicio</Link>
        </button>
        <button className="bg-danger mx-4 mt-6 text-white py-2 text-lg font-semibold px-8 rounded">
          Cerrar Sesion
        </button>
      </div>
    </Layout>
  );
};

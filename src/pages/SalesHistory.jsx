import React, { useState, useEffect } from "react";
import { getSales } from "../api/sale.api";
import { formatRelative, subDays } from "date-fns";
import { es } from "date-fns/locale";
import { Layout } from "../components/Layout";
import Pagination from "../components/Pagination";
import Table from "../components/Table";
import TDTable from "../components/TDTable";
import THTable from "../components/THTable";
import { Link } from "react-router-dom";

export const SalesHistory = () => {
  const [sales, setSales] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    last: 0,
    size: 10,
    current: 0,
  });
  const [page, setPage] = useState(1);

  const getAllSales = (page) => {
    getSales(page).then(({ data }) => {
      if (data.ok) {
        setSales(data.sales);
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
    return getAllSales(page);
  }, [page]);

  return (
    <Layout>
      <p className="text-red-500 text-xl">LISTA DE VENTAS REALIZADAS</p>
      <Table>
        <thead>
          <tr>
            <THTable name="fecha" />
            <THTable name="Vendido por" />
            <THTable name="total" />
            <THTable name="accionbes" />
          </tr>
        </thead>
        <tbody>
          {sales?.map((p) => (
            <tr key={p.id}>
              <TDTable
                name={formatRelative(
                  subDays(new Date(p.dateOfSale), 0),
                  new Date(),
                  {
                    locale: es,
                  }
                )}
              />
              <TDTable name={p.users.name} />
              <TDTable name={`$${p.total}`} />
              <TDTable>
                <button className="bg-very-blue whitespace-nowrap font-semibold text-white text-xs px-8 py-2 rounded">
                  Ver Detalle
                </button>
              </TDTable>
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

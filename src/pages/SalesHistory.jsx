import React, { useState, useEffect } from "react";
import { getExpenses, getSales } from "../api/sale.api";
import { formatRelative, subDays } from "date-fns";
import { es } from "date-fns/locale";
import { Layout } from "../components/Layout";
import Pagination from "../components/Pagination";
import Table from "../components/Table";
import TDTable from "../components/TDTable";
import THTable from "../components/THTable";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import { Details } from "../components/Details";
import { toast } from "react-toastify";

export const SalesHistory = () => {
  const [sales, setSales] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [bread, setBread] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    last: 0,
    size: 10,
    current: 0,
  });
  const [paginationX, setPaginationX] = useState({
    total: 0,
    last: 0,
    size: 10,
    current: 0,
  });
  const [page, setPage] = useState(1);
  const [pageX, setPageX] = useState(1);
  const [sale, setSale] = useState();

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
    }).catch(()=>{
      toast.warning("Intente mas tarde!!")
    });
  };
  const getAllExpenses = (page) => {
    getExpenses(page).then(({ data }) => {
      if (data.ok) {
        setExpenses(data.expenses);
        setPaginationX({
          ...pagination,
          total: data.total,
          last: data.totalPag,
          current: data.curentPag,
        });
      }
    }).catch(()=>{
      toast.warning("Intente mas tarde!!")
    });
  };

  useEffect(() => {
    return getAllSales(page);
  }, [page]);
  useEffect(() => {
    return getAllExpenses(pageX);
  }, [pageX]);

  const details = (sale) => {
    setSale(sale);
    setShowModal(true);
  };

  return (
    <Layout>
      <p className="text-red-500 text-xl">LISTA DE VENTAS REALIZADAS</p>
      <div className="w-full mt-4">
        <ol className="flex justify-center text-gray-500 bg-gray-100 rounded py-2 px-2">
          <li
            onClick={() => setBread(1)}
            className={
              "px-2 cursor-pointer text-gradient md:text-sm lg:text-base " +
              (bread === 1 && ` font-bold`)
            }
          >
            Ventas del sistema
          </li>
          <li className="text-gray-500 select-none md:text-sm lg:text-base ">
            &rsaquo;
          </li>
          <li
            onClick={() => setBread(2)}
            className={
              "px-2 cursor-pointer text-gradient md:text-sm lg:text-base " +
              (bread === 2 && ` font-bold`)
            }
          >
            Venta de servicios
          </li>
        </ol>
      </div>
      <>
        {bread === 1 && (
          <>
            <Table>
              <thead>
                <tr>
                  <THTable name="fecha" />
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
                    <TDTable name={`$${p.total}`} />
                    <TDTable>
                      <button
                        onClick={() => details(p)}
                        className="bg-very-blue whitespace-nowrap font-semibold text-white text-xs px-8 py-2 rounded"
                      >
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
          </>
        )}
      </>
      <>
        {bread === 2 && (
          <>
            <Table>
              <thead>
                <tr>
                  <THTable name="fecha" />
                  <THTable name="total" />
                  <THTable name="tipo" />
                  <THTable name="Vendido por" />

                </tr>
              </thead>
              <tbody>
                {expenses?.map((p) => (
                  <tr key={p.id}>
                    <TDTable
                      name={formatRelative(
                        subDays(new Date(p.date), 0),
                        new Date(),
                        {
                          locale: es,
                        }
                      )}
                    />
                    <TDTable name={`$${p.amount}`} />
                    <TDTable name={p.type} />
                    <TDTable name={p.box?.users.name} />
                  </tr>
                ))}
              </tbody>
            </Table>
            <Pagination
              className="pagination-bar"
              onPageChange={setPageX}
              last={paginationX.last}
              totalCount={paginationX.total}
              currentPage={paginationX.current}
              pageSize={paginationX.size}
            />
          </>
        )}
      </>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        title="Detalles de la venta"
      >
        <Details sale={sale} />
      </Modal>
    </Layout>
  );
};

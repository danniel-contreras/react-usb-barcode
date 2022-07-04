import React from "react";
import Pagination from "../Pagination";
import Table from "../Table";
import TDTable from "../TDTable";
import THTable from "../THTable";

export default function ProductsTable({ setPage, products, pagination }) {
  return (
    <>
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
        pageSize={pagination.size}
      />
    </>
  );
}

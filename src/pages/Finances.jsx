import React, { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { ChartBar } from "../components/Chart";
import { LineChart } from "../components/LineChart";

import { getSales } from "../api/sale.api";
import { getSalerPerDate } from "../utils/filters";
import { reduceTotal } from "../utils/reducers";

export const Finances = () => {
  const [sales, setSales] = useState([]);

  const getAllSales = () => {
    getSales(1, 100000000000).then(({ data }) => {
      if (data.ok) {
        setSales(data.sales);
        console.log(getSalerPerDate(3, data.sales));
      }
    });
  };

  useEffect(() => {
    return getAllSales();
  }, []);

  return (
    <Layout>
      <p className="text-red-500 text-xl uppercase">Finanzas del sistema</p>
      <div className="w-full h-full grid grid-cols-2 gap-9 mt-6">
        <div className="h-96 ">
          <ChartBar sales={sales} />
        </div>
        <div className="h-96 ">
          <LineChart sales={sales} />
        </div>
        <div className="h-40  border shadow flex justify-center items-center text-gradient font-semibold text-2xl rounded-xl">
          <p>Ventas totales: {sales && sales.length}</p>
        </div>
        <div className="h-40  border shadow flex justify-center items-center text-gradient font-semibold text-2xl rounded-xl">
          <p>Efectivo total: ${reduceTotal(sales)}</p>
        </div>
      </div>
    </Layout>
  );
};

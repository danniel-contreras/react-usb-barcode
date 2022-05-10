import React, { useEffect, useState } from "react";
import { getDetailsSale } from "../api/sale.api";

export const Details = ({ sale }) => {
  const [details, setDetails] = useState();
  console.log(sale);
  const getDetails = () => {
    getDetailsSale(sale?.id).then(({ data }) => {
      console.log(data);
      if (data.sales) {
        setDetails(data.sales);
      }
    });
  };
  useEffect(() => {
    return getDetails();
  }, []);
  return (
    <div>
      <ul className="mas-h-96 overflow-auto">
        {details &&
          details.map((d, index) => (
            <li key={index}>
              <div className="flex mt-3">
                <span className="text-xl">{d.products.name} -</span>
                <span className="text-xl ml-6">{d.quantity} -</span>
                <span className="text-xl ml-6">${Number(d.totalUnit).toFixed(2)}</span>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

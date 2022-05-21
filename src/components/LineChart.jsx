import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { getSalerPerMonth } from "../utils/filters";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const LineChart = ({ sales }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Ventas Semi-Anuales",
      },
    },
  };

  const labels =
    new Date().getMonth() <= 5
      ? ["Ene", "Feb", "Mar", "Abr", "May", "Jun"]
      : ["Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  const data = {
    labels,
    datasets: [
      {
        label: "Numero de ventas",
        data:
          new Date().getMonth() <= 5
            ? [
                getSalerPerMonth(1, sales),
                getSalerPerMonth(2, sales),
                getSalerPerMonth(3, sales),
                getSalerPerMonth(4, sales),
                getSalerPerMonth(5, sales),
                getSalerPerMonth(6, sales),
              ]
            : [
                getSalerPerMonth(7, sales),
                getSalerPerMonth(8, sales),
                getSalerPerMonth(9, sales),
                getSalerPerMonth(10, sales),
                getSalerPerMonth(11, sales),
                getSalerPerMonth(12, sales),
              ],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return <Line options={options} data={data} />;
};

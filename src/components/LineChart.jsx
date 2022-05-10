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

  const labels = ["Ene", "Feb", "Mar", "Abr", "May", "Jun"];
  const data = {
    labels,
    datasets: [
      {
        label: "Numero de ventas",
        data: [
          getSalerPerMonth(1, sales),
          getSalerPerMonth(2, sales),
          getSalerPerMonth(3,sales),
          getSalerPerMonth(4,sales),
          getSalerPerMonth(5,sales),
          getSalerPerMonth(6,sales),
        ],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return <Line options={options} data={data} />;
};

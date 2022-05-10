import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { getSalerPerDate } from "../utils/filters";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function ChartBar({ sales }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Ventas semanales",
      },
    },
  };

  const labels = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Ventas totales",
        data: [
          getSalerPerDate(1, sales),
          getSalerPerDate(2, sales),
          getSalerPerDate(3, sales),
          getSalerPerDate(4, sales),
          getSalerPerDate(5, sales),
          getSalerPerDate(6, sales),
          getSalerPerDate(7, sales),
        ],
        backgroundColor: "#4b6cb7",
      },
    ],
  };
  return <Bar options={options} data={data} />;
}

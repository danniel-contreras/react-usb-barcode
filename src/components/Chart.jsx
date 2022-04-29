import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: "Ventas semanales",
    },
  },
};

const labels = ['Lunes', 'Martes', 'Miercoles','Jueves', 'Viernes', 'Sabado',  'Domingo'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Ventas totales',
      data: [1,2,3,4,5,6,7],
      backgroundColor: '#4b6cb7',
    },
  ],
};

export function ChartBar() {
  return <Bar options={options} data={data} />;
}

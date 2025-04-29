import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const EpsChart = ({ data }) => {
  // Ensure data is an array and has items
  const validData = Array.isArray(data) ? data : [];

  const chartData = {
    labels: validData.map((item) => item.year),
    datasets: [
      {
        label: "Earnings Per Share",
        data: validData.map((item) => item.eps || 0),
        borderColor: "rgb(153, 102, 255)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderWidth: 2,
        tension: 0.3,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const item = validData[context.dataIndex];
            return [
              `EPS: $${context.parsed.y.toFixed(2)}`,
              `Net Profit: $${(item?.net_profit || 0).toLocaleString()}`,
              `Shares Outstanding: ${(
                item?.shares_outstanding || 0
              ).toLocaleString()}`,
            ];
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          font: {
            size: 12,
          },
          callback: function (value) {
            return `$${value.toFixed(2)}`;
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
  };

  return (
    <div style={{ width: "100%", height: "100%", minHeight: "300px" }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default EpsChart;

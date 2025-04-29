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

const ProfitMarginChart = ({ data }) => {
  // Ensure data is an array and has items
  const validData = Array.isArray(data) ? data : [];

  // Calculate gross profit margin if not directly available
  const processedData = validData.map((item) => ({
    ...item,
    gross_profit_margin:
      item.gross_profit_margin ||
      ((item.revenue - item.cost_of_sales) / item.revenue) * 100 ||
      0,
    net_profit_margin:
      item.net_profit_margin || (item.net_profit / item.revenue) * 100 || 0,
  }));

  const chartData = {
    labels: processedData.map((item) => item.year),
    datasets: [
      {
        label: "Gross Profit Margin",
        data: processedData.map((item) => item.gross_profit_margin),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        tension: 0.3,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: "Net Profit Margin",
        data: processedData.map((item) => item.net_profit_margin),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
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
            return `${context.dataset.label}: ${context.parsed.y.toFixed(2)}%`;
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
            return `${value.toFixed(1)}%`;
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

export default ProfitMarginChart;

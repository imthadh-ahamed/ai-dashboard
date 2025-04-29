import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ShareholdersChart = ({ data }) => {
  // Ensure data is an array and has items
  const validData = Array.isArray(data) ? data : [];

  const chartData = {
    labels: validData.map((item) => item.year),
    datasets: [
      {
        label: "Institutional Investors",
        data: validData.map((item) => item.institutional_investors || 0),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Individual Investors",
        data: validData.map((item) => item.individual_investors || 0),
        backgroundColor: "rgba(255, 159, 64, 0.6)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
      {
        label: "Employee Shareholders",
        data: validData.map((item) => item.employee_shareholders || 0),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
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
            const value = context.raw || 0;
            const dataset = context.dataset.label;
            const total = validData[context.dataIndex]?.total_shareholders || 0;
            const percentage =
              total > 0 ? ((value / total) * 100).toFixed(1) : 0;
            return `${dataset}: ${value.toLocaleString()} (${percentage}%)`;
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
            return value.toLocaleString();
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
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ShareholdersChart;

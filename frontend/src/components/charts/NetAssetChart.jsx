import React from "react";
import { Bar } from "react-chartjs-2";
import { Paper, Typography } from "@mui/material";
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

const NetAssetChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.year),
    datasets: [
      {
        label: "Net Asset Per Share (LKR)",
        data: data.map((item) => item.net_asset_per_share),
        backgroundColor: "rgba(255, 159, 64, 0.7)",
      },
      {
        label: "Industry Average (LKR)",
        data: data.map(() => 125), // Placeholder for industry average
        backgroundColor: "rgba(201, 203, 207, 0.7)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: LKR ${context.parsed.y.toFixed(
              2
            )}`;
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return `LKR ${value.toFixed(2)}`;
          },
        },
      },
    },
  };

  return (
    <Paper
      sx={{ p: 2, display: "flex", flexDirection: "column", height: "100%" }}
    >
      <Typography variant="h6" gutterBottom>
        Net Asset Per Share vs Industry Benchmark
      </Typography>
      <div style={{ height: "400px" }}>
        <Bar data={chartData} options={options} />
      </div>
    </Paper>
  );
};

export default NetAssetChart;

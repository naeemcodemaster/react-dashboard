import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const LineChart = ({ darkMode, chartData }) => {
  // Transform the chartData
  const labels = chartData?.map(item => item.dateTime) || ["9 AM", "12 PM", "3 PM", "6 PM", "9 PM", "12 AM"];
  const cpuLoadTime = chartData?.map(item => item.cpuLoadTime) || [90, 100, 80, 105, 90, 75];
  const queryResponseTime = chartData?.map(item => item.queryResponseTime) || [70, 60, 65, 55, 65, 45];
  console.log("cpu load time",cpuLoadTime);
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Updates",
        data: cpuLoadTime,
        borderColor: "rgba(0, 255, 0, 1)",
        backgroundColor: "rgba(0, 255, 0, 0.2)",
        tension: 0.4,
        fill: true,
        shadowColor: "rgba(0, 255, 0, 0.5)",
        shadowBlur: 10,
      },
      {
        label: "Alerts",
        data: queryResponseTime,
        borderColor: "rgba(0, 0, 255, 1)",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
        tension: 0.4,
        fill: true,
        shadowColor: "rgba(0, 0, 255, 0.5)",
        shadowBlur: 10,
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
          color: `${darkMode ? "#6b6b6b" : "#000"}`,
          font: {
            size: 8,
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: `${darkMode ? "#6b6b6b" : "#000"}`,
          font: {
            size: 8,
          },
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: `${darkMode ? "#6b6b6b" : "#000"}`,
          font: {
            size: 8,
          },
        },
        min: 0,
        max: 450,
      },
    },
  };

  // Custom plugin for shadow effect
  const shadowPlugin = {
    id: "shadowPlugin",
    beforeDraw: (chart) => {
      const ctx = chart.ctx;
      const datasets = chart.config.data.datasets;

      datasets.forEach((dataset, index) => {
        const meta = chart.getDatasetMeta(index);
        meta.data.forEach((line) => {
          ctx.save();
          ctx.shadowColor = dataset.shadowColor || "rgba(0,0,0,0.5)";
          ctx.shadowBlur = dataset.shadowBlur || 10;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 5;
          ctx.stroke();
          ctx.restore();
        });
      });
    },
  };

  ChartJS.register(shadowPlugin);

  return (
    <div className="bg-white dark:bg-[#1c1c1c] p-2 rounded-lg shadow-md">
      <h3 className="text-[10px] text-black dark:text-white mb-1">Alerts and Updates</h3>
      <p className="text-gray-400 text-[8px] mb-2">3 Alerts | 10 Updates</p>
      {/* Set fixed height and width */}
      <div style={{ width: "100%", height: "150px" }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default LineChart;

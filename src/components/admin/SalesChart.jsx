import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const SalesChart = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    axios.get("/api/admin/sales").then((res) => setSalesData(res.data));
  }, []);

  const data = {
    labels: salesData.map(data => data.date),
    datasets: [
      {
        label: "Sales Revenue",
        data: salesData.map(data => data.revenue),
        fill: false,
        borderColor: "purple",
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h3 className="text-xl font-semibold mb-4">Sales Analytics</h3>
      <Line data={data} />
    </div>
  );
};

export default SalesChart;

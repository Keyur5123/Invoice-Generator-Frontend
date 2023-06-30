import React from "react";
import { Pie } from "react-chartjs-2";

function PieChart({ chartData }) {
  return (
    <div className="chart-container">
      {/* <h2 style={{ textAlign: "center" }}>Pie Chart</h2> */}
      <Pie
        className="max-h-96"
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Manufacture of pcs during whole year"
            }
          }
        }}
      />
    </div>
  );
}
export default PieChart;
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip);
const labels = ["짜장면", "치킨", "곱창", "피자", "족발", "한강라면"];

export const data = {
  labels,
  datasets: [
    {
      // 툴팁에 표시 될 라벨
      label: "지금 가장 먹고 싶은 음식",
      // 각 항목에 대한 데이터
      data: [10, 80, 30, 20, 70, 60],
      // 각 항목별 컬러
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      // 테두리 컬러
      borderColor: ["gray", "darkgray"],
      borderWidth: 0.5,
    },
  ],
};


const DoughnutChart = () => {
    return (
        <Doughnut data={data} />
    );
};

export default DoughnutChart;
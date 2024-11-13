import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";
import styled from "styled-components";
ChartJS.register(ArcElement, Tooltip);
const labels = ["짜장면", "치킨", "곱창", "피자", "족발", "한강라면"];

// 차트를 감싸는 div에 크기 설정
const ChartContainer = styled.div`
  width: 25vw; /* 차트의 너비 */
  height: 25vh; /* 차트의 높이 */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: -230px;
`;
// 색상 칩 스타일
const ColorChip = styled.span`
  display: inline-block;
  width: 15px;
  height: 15px;
  background-color: ${(props) => props.color};
  margin-right: 8px;
  border-radius: 20%;
`;

const data = {
  labels,
  datasets: [
    {
      // 툴팁에 표시 될 라벨
      label: "지금 가장 먹고 싶은 음식",
      // 각 항목에 대한 데이터
      data: [10, 80, 30, 1000, 70, 60],
      // 각 항목별 컬러
      backgroundColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      // 테두리 컬러
      borderColor: ["gray", "darkgray"],
      borderWidth: 0.5,
    },
  ],
};

const options = {
  responsive: true,

  plugins: {
    tooltip: {
      enabled: true,
    },
  },
};
const DataTextContainer = styled.div`
  margin-top: 20px;
  font-size: 16px;
  color: #333;
  text-align: center;
  margin-bottom: -250px;
`;
const FormInput = styled.input`
  padding: 8px;
  border: 5px solid #c8bef3;
  border-radius: 10px;
  margin-bottom: -100px;
  text-align: center;
  outline: none;
  width: 60%;
  height: 8vh;
`;
let sumdata = data.datasets[0].data.reduce((acc, num) => acc + num, 0);
const sumConma = sumdata
  .toString()
  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
const DoughnutChart = () => {
  return (
    <>
      <ChartContainer>
        <Pie data={data} options={options} />
        <DataTextContainer>
          {data.labels.map((label, index) => (
            <p key={index}>
              <ColorChip color={data.datasets[0].backgroundColor[index]} />
              <strong>{label}</strong>: {data.datasets[0].data[index]}
            </p>
          ))}
        </DataTextContainer>
      </ChartContainer>
      <FormInput
        type="text"
        name="saving"
        value={`예상 소비금액: ${sumConma}`}
      />
    </>
  );
};

export default DoughnutChart;

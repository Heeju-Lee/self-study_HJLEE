import React, { useEffect, useState, useContext } from "react";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";
import styled from "styled-components";
import { PlanContext } from "../../../../pages/context/MoneyPlanContext";

ChartJS.register(ArcElement, Tooltip);

const DoughnutChart = () => {
  const { plan } = useContext(PlanContext);
  const labels = ["쇼핑", "교통수단", "편의점", "음식", "기타", "저축"];
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

  const dataValues = [
    { label: "쇼핑", value: plan.shopping },
    { label: "교통", value: plan.transport },
    { label: "편의점", value: plan.cvs },
    { label: "음식", value: plan.food },
    { label: "기타", value: plan.others },
    { label: "저축", value: plan.saving },
  ];
  // 내림차순으로 정렬 (value 기준)
  dataValues.sort((a, b) => b.value - a.value);

  // 정렬된 데이터와 레이블 추출
  const sortedLabels = dataValues.map((item) => item.label);
  const sortedDataValues = dataValues.map((item) => item.value);
  const backgroundColors = [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
  ];
  const data = {
    labels: sortedLabels,
    datasets: [
      {
        // 툴팁에 표시 될 라벨
        label: "미리보기 차트",
        // 각 항목에 대한 데이터
        data: sortedDataValues,
        // 각 항목별 컬러
        backgroundColor: backgroundColors.slice(0, sortedLabels.length),
        // 테두리 컬러
        borderColor: ["gray", "darkgray"],
        borderWidth: 0.5,
      },
    ],
  };
  // 옵션 수정 - 레전드와 툴팁 숨기기
  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: false, // 툴팁 숨기기
      },
      legend: {
        display: false, // 레전드(항목 이름) 숨기기
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
  let sumdata = sortedDataValues.reduce(
    (acc, num) => acc + parseInt(num, 10),
    0
  );
  const sumConma = sumdata
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

  return (
    <>
      <ChartContainer>
        <Pie data={data} options={options} />
        <DataTextContainer>
          {data.labels.map((label, index) => (
            <p key={index}>
              <ColorChip color={backgroundColors[index]} />
              <strong>{label}</strong>: {sortedDataValues[index]}
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

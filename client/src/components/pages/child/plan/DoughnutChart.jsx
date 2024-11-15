import React, { useEffect, useState, useContext } from "react";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";
import styled from "styled-components";
import { PlanContext } from "../../../../pages/context/MoneyPlanContext";

ChartJS.register(ArcElement, Tooltip);

const DoughnutChart = () => {
 
  const { plan } = useContext(PlanContext);
  // 데이터 값 처리: plan 값이 없을 경우 기본값 0으로 처리
  const dataValues = [
    { label: "쇼핑", value: plan.shopping  },
    { label: "교통", value: plan.transport },
    { label: "편의점", value: plan.cvs  },
    { label: "음식", value: plan.food  },
    { label: "기타", value: plan.others  },
    { label: "저축", value: plan.saving },
  ];
 
  const ChartContainer = styled.div`
    width: 50vw; /* 차트의 너비 */
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

  const backgroundColors = [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(0,74,158,1)",
    "rgba(255, 159, 64, 1)",
  ];

  // 내림차순으로 정렬 (value 기준)
  dataValues.sort((a, b) => b.value - a.value);

  // 정렬된 데이터와 레이블 추출
  const sortedLabels = dataValues.map((item) => item.label);
  // sortedDataValues 배열의 쉼표 제거 후 숫자로 변환
  const sortedDataValues = dataValues.map((item) => parseFloat(String(item.value).replace(/,/g, "")) || 0);

const data = {
  labels: sortedLabels,
  datasets: [
    {
      label: "미리보기 차트",
      data: sortedDataValues,
      backgroundColor: backgroundColors.slice(0, sortedLabels.length),
      borderColor: ["gray", "darkgray"],
      borderWidth: 0.5,
    },
  ],
};

console.log("Updated sortedDataValues (numeric):", sortedDataValues);
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
  console.log("Chart Data:", data);
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

  // sumdata 계산 (배열 값 합산)
  let sumdata = 0;
  // sortedDataValues.forEach((value) => {
  //   // 쉼표 제거 후 숫자로 변환하여 더하기
  //   sumdata += parseFloat(value.replace(/,/g, "")) || 0;
  // });
  // sumdata 계산 (배열 값 합산)

sortedDataValues.forEach((value) => {
  // 이미 숫자로 변환된 sortedDataValues를 더하기만 함
  sumdata += value || 0;
});
  // sumdata가 유효한 숫자인지 확인하고 천 단위 구분기호 추가
  const sumConma = !isNaN(sumdata) && sumdata !== 0
    ? sumdata.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : "0";
 console.log("sortedDataValues",sortedDataValues );
console.log("sumdata:", sumdata);
console.log("sumConma:", sumConma);
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
      <FormInput type="text" value={`예상 소비금액: ${sumConma || "0"}`} readOnly />
    </>
  );
};

export default DoughnutChart;

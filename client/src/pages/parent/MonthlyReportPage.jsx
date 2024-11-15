import React, { useState } from "react";
import PlanReport from "../../components/pages/parent/monthly-report/PlanReport";
import SendMessage from "../../components/pages/parent/monthly-report/SendMessage";
import SelectOptionNav from "../../components/pages/parent/SelectOptionNav";
import { GlobalStyles } from "../../styles/GlobalStyle";
import styled from "styled-components";

const MonthlyReportPage = () => {
  const [selectOption, setSelectOption] = useState({
    childNum: 1,
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });

  const handleChildData = (updateData) => {
    console.log("data : ", updateData);

    setSelectOption((prev) => ({
      ...prev,
      ...updateData, // 기존 데이터에 새로 전달된 값 병합
    }));
  };

  return (
    <>
    <ContainAll>
      <SelectOptionNav onHandleData={handleChildData} />
      {/* 선택한 옵션값 확인 (지워두 됨) */}
      {/* <p>ChildNum : {selectOption.childNum}</p>
      <p>year: {selectOption.year}</p>
      <p>month : {selectOption.month}</p> */}

      {/* <PlanReport /> */}
      <PlanReport 
              childNum={selectOption.childNum} 
              year={selectOption.year} 
              month={selectOption.month}
      />

      {/* SendMessage */}
    </ContainAll>
      <SendMessage />
    </>
  );
};

const ContainAll = styled.div`
  /* display: flex;
  flex-direction: column;
  margin-top: 50px; */

  margin-bottom: 150px;
`

export default MonthlyReportPage;
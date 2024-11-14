import React, { useState } from "react";
import PlanReport from "../../components/pages/parent/monthly-report/PlanReport";
import SelectOptionNav from "../../components/pages/parent/SelectOptionNav";

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
    <div>
      <SelectOptionNav onHandleData={handleChildData} />
      {/* 선택한 옵션값 확인 (지워두 됨) */}
      <p>ChildNum : {selectOption.childNum}</p>
      <p>year: {selectOption.year}</p>
      <p>month : {selectOption.month}</p>

      {/* <PlanReport /> */}
    </div>
  );
};

export default MonthlyReportPage;

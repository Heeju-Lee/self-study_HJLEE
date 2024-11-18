import React, { useState } from "react";
import SelectOptionNav from "../../components/pages/parent/SelectOptionNav";
import Agreement from "../../components/pages/parent/agreement/Agreement";
import Order from "../../components/pages/parent/agreement/Order";

const AgreementPage = () => {
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
      <Agreement />
      <Order />
    </div>
  );
};

export default AgreementPage;

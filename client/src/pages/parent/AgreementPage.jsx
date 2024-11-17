import React, { useState } from "react";
import SelectOptionNav from "../../components/pages/parent/SelectOptionNav";
import Agreement from '../../components/pages/parent/agreement/Agreement';
import Order from '../../components/pages/parent/agreement/Order';
import AccessDeniedPage from '../common/AccessDeniedPage';

const AgreementPage = () => {

  const [selectOption, setSelectOption] = useState({
    childNum: 1,
    childName:"",
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

  const role = localStorage.getItem("role");

  //결제 상태 관리
  const [paymentStatusUpdate, setPaymentSatusUpdate] = useState(false);

  return (
      <>  
        {role === "ROLE_CHILD" && <AccessDeniedPage/>}
        {role === "ROLE_PARENT" && (
          <>
            <SelectOptionNav onHandleData={handleChildData} />
            <Agreement 
                childNum={selectOption.childNum}
                year={selectOption.year}
                month={selectOption.month}
                childName={selectOption.childName}

                //현재 상태값(prev)을 반대로 변경
                paymentSuccess={() => setPaymentSatusUpdate((prev) => !prev)} // 결제 성공 시 상태 갱신
            />
            <Order 
                childNum = {selectOption.childNum}
                year = {selectOption.year}
                month = {selectOption.month}    
                paymentStatusUpdate={paymentStatusUpdate}          
            />
          </>
        )}
      </>
  );
};

export default AgreementPage;
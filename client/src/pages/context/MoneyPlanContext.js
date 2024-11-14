import React, { createContext, useContext, useState,useEffect } from "react"; 
import axios from "axios";
// 전역관리 용 context
export const PlanContext = createContext();

// PlanProvider를 사용하여 자식 컴포넌트에 Plan 상태를 제공
const PlanProvider = ({ children }) => {
  const [plan, setPlan] = useState({
    shopping: "50",
    transport: "70",
    cvs: "1000",
    food: "10000",
    others: "1000",
    saving: "1100",
  });




  return (
    <PlanContext.Provider value={{ plan, setPlan }}>
      {children}
    </PlanContext.Provider>
  );
};

// PlanProvider를 기본 내보내기
export default PlanProvider;
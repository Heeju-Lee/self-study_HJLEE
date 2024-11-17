import React, { createContext, useContext, useState, useEffect } from "react"; 
import axios from "axios";


const PlanContext = createContext();

// PlanProvider 컴포넌트
const PlanProvider = ({ children }) => {
  // plan 데이터의 초기값 설정
  const [plan, setPlan] = useState({
    shopping: 0,
    transport: 0,
    cvs: 0,
    food: 0,
    others: 0,
    saving: 0,
  });
  const [selectedYear, setSelectedYear] = useState(0); // 연도 상태
  const [selectedMonth, setSelectedMonth] = useState(0); // 월 상태
  const [overlayStatus, setOverlayStatus] = useState(null); 
  
  return (
    <PlanContext.Provider value={{ plan, setPlan,selectedMonth, setSelectedMonth,selectedYear, setSelectedYear,overlayStatus, setOverlayStatus }}>
      {children}
    </PlanContext.Provider>
  );
};

// Default export PlanProvider
export default PlanProvider;

// Named export PlanContext (기존대로)
export { PlanContext };
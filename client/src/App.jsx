import { BrowserRouter, useLocation } from "react-router-dom";
import { GlobalStyle } from "./styles/GlobalStyle";
import Header from "./components/layouts/Header";
import Navirouter from "./Navirouter";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./components/layouts/Layout";
import PlanProvider from "./pages/context/MoneyPlanContext";
// import PlanReport from "./components/pages/parent/PlanReport";
// import MonthlyReportPage from "./pages/parent/MonthlyReportPage";
import { createContext, useEffect, useState } from "react";

/*useContext 를 이용해서 하위 컴포넌트들이 데이터 공유하기*/
export const LogingedContext = createContext();

function App() {
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 현재 페이지에 따라 스크롤 활성화 여부 결정 (랜딩페이지에서는 전체스크롤 비활성화)
  const scrollEnabled = location.pathname !== "/";
  // console.log("scrollEnabled : ", scrollEnabled);

  //컴포넌트가 mount or update 될때 로그인 여부에 따른 상태값 변경
  useEffect(() => {
    localStorage.getItem("id") != null
      ? setIsLoggedIn(true)
      : setIsLoggedIn(false);
    console.log("App useEffect isLoggeedIn = ", isLoggedIn);
  });

  /*
로그인(LoginForm.jsx) or 로그아웃(Header.jsx) 될 때 로그인여부 상태값을 변경할 이벤트
handleLoggedChange 와 isLoggedIn 를 사용해야 하는 컴포넌트들이 여럿이기에
createContex 를 이용하여 서로 공유할수 있도록 한다.
*/

  // 역할과 사용자 ID (role : ROLE_PARENT , ROLE_CHILD)
  // 로그인 정보가 없으면 로그인 페이지로 이동
  const handleLoggedChange = (isLoggedIn) => {
    setIsLoggedIn(isLoggedIn);
  };
  return (
    <LogingedContext.Provider
      value={{ isLoggedIn: isLoggedIn, onLoggedChange: handleLoggedChange }}
    >
      <PlanProvider>  
      <div>
        {/* <BrowserRouter> */}
        {/* 전역 스타일 */}
        <GlobalStyle scrollEnabled={scrollEnabled} />
        {/* 헤더 (공통) */}
        <Header />
        {/* 각 페이지 */}
        <Navirouter />
        {/* </BrowserRouter> */}
      </div>
      </PlanProvider>
    </LogingedContext.Provider>
  );
}

export default App;
import React from "react";
import { Route, Routes } from "react-router-dom";
// import SaveForm from "./components/pages/child/plan/SaveForm";
// import UpdateForm from "./components/pages/child/plan/UpdateForm";
// import PlanPage from "./pages/child/PlanPage";
// import SendTest from "./pages/test/child/SendTest";
// import ParentTest from "./pages/test/parent/ParentTest";

import LandingPage from "./pages/common/LandingPage";
import ChildReportPage from "./pages/child/ChildReportPage";
import EduPage from "./pages/child/EduPage";
import MoneyPlanPage from "./pages/child/MoneyPlanPage";
import MyWishListPage from "./pages/child/MyWishListPage";
import AgreementPage from "./pages/parent/AgreementPage";
import MonthlyReportPage from "./pages/parent/MonthlyReportPage";
import WishListPage from "./pages/parent/WishListPage";
import LoginPage from "./pages/common/LoginPage";
import SelectUserType from "./pages/common/SelectUserType";
import LoginForm from "./components/pages/LoginForm";
import { RegisterPage } from "./pages/common/RegisterPage";


const Navirouter = () => {
  return (
    <div>
      <Routes>
        {/* 공통 */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/select-user" element={<SelectUserType />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* 아이 페이지 */} 
        <Route path="/child-report" element={<ChildReportPage />} />
        <Route path="/edu" element={<EduPage />} />
        <Route path="/money-plan" element={<MoneyPlanPage />} />
        <Route path="/mywish-list" element={<MyWishListPage />} />
        {/* <Route path="/register-child" element={<ChildRegisterPage />} /> */}

        {/* 부모 페이지 */}
        <Route path="/agreement" element={<AgreementPage />} />
        <Route path="/monthly-report" element={<MonthlyReportPage />} />
        <Route path="/wish-list" element={<WishListPage />} />
        {/* <Route path="/register-parent" element={<RegisterPage />} /> */}

        {/* <Route path="/save-form" element={<SaveForm />} />
        <Route path="/update-form" element={<UpdateForm />} />
        <Route path="/plan" element={<PlanPage />} /> */}
        {/* <Route path="/test-child" element={<SendTest />} />
        <Route path="/test-parent" element={<ParentTest />} /> */}
      </Routes>
    </div>
  );
};

export default Navirouter;

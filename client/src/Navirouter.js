import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/common/HomePage";
import SaveForm from "./components/pages/child/plan/SaveForm";
import UpdateForm from "./components/pages/child/plan/UpdateForm";
import PlanPage from "./pages/child/PlanPage";
import SendTest from "./pages/test/child/SendTest";
import ParentTest from "./pages/test/parent/ParentTest";

const Navirouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/save-form" element={<SaveForm />} />
        <Route path="/update-form" element={<UpdateForm />} />
        <Route path="/plan-page" element={<PlanPage />} />
        <Route path="/test-child" element={<SendTest />} />
        <Route path="/test-parent" element={<ParentTest />} />
      </Routes>
    </div>
  );
};

export default Navirouter;

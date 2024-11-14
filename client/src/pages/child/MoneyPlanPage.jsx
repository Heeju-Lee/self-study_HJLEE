import React, { createContext, useContext, useState } from "react";
import PlanForm from "../../components/pages/child/plan/PlanForm";
import styled from "styled-components";
import SaveForm from "../../components/pages/child/plan/SaveForm";
import SelectBox from "../../components/pages/child/plan/SelectBox";
import PlanProvider from "../context/MoneyPlanContext";

const TitleWapper = styled.div`
  display: flex;
  margin-bottom: 30px;
  justify-content: flex-end;
`;
const Wapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const PageTitle = styled.h3`
  margin-top: -40px;
  margin-bottom: 40px;
  font-weight: bold;
  color: #3d3d3d;
  text-align: center;
`;
const UpdateBtn = styled.button`
  background-color: #4829d7;
  color: white;
  font-style: bold;
  font-size: 1.2rem;
  border: 2px solid #4829d7;
  border-radius: 10px;
  width: 15vw;
  height: 5.8vh;
  font-weight: bold;
`;
const SendBtn = styled.button`
  background-color: #4829d7;
  color: white;
  font-style: bold;
  font-size: 1.2rem;
  border: 2px solid #4829d7;
  border-radius: 10px;
  width: 25vw;
  height: 5.8vh;
  font-weight: bold;
  margin-left: 30px;
`;
const BtnWapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: -20px;
  margin-bottom: 20px;
`;

const MoneyPlanPage = () => {
  return (
    <>
      <PlanProvider>
        <TitleWapper>
          <PageTitle>소비계획 세우기</PageTitle>
          <SelectBox />
        </TitleWapper>
        <Wapper>
          <PlanForm />
          <SaveForm />
        </Wapper>
        <BtnWapper>
          <UpdateBtn>수정하기</UpdateBtn>
          <SendBtn>부모님한테 보내기</SendBtn>
        </BtnWapper>
      </PlanProvider>
    </>
  );
};

export default MoneyPlanPage;

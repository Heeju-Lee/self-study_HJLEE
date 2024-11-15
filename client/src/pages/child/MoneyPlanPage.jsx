import React, { createContext, useContext, useState } from "react";
import PlanForm from "../../components/pages/child/plan/PlanForm";
import styled from "styled-components";
import SaveForm from "../../components/pages/child/plan/SaveForm";
import SelectBox from "../../components/pages/child/plan/SelectBox";
import PlanProvider from "../context/MoneyPlanContext";
import { Modal } from "../../components/commons/Modal"; 
import { PlanContext } from "../context/MoneyPlanContext";
import axios from 'axios';
const TitleWapper = styled.div`
  display: flex;
  margin-top: 30px;
  margin-bottom: 30px;
  justify-content: space-evenly;
`;
const Wapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
justify-content: center;
gap: 50px;
`;

const PageTitle = styled.h3`
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
  const [isModalOpen, setModalOpen] = useState(false);  // 모달 열림/닫힘 상태
  const { plan } = useContext(PlanContext);  // Context에서 데이터를 가져옴
  // 데이터값 배열 생성
  const dataValues = [
    { label: "쇼핑", value: plan.shopping ?? 0 },
    { label: "교통", value: plan.transport ?? 0 },
    { label: "편의점", value: plan.cvs ?? 0 },
    { label: "음식", value: plan.food ?? 0 },
    { label: "기타", value: plan.others ?? 0 },
    { label: "저축", value: plan.saving ?? 0 },
  ];
  const dataToSend = {
    shopping: plan.shopping ?? 0,
    transport: plan.transport ?? 0,
    cvs: plan.cvs ?? 0,
    food: plan.food ?? 0,
    others: plan.others ?? 0,
    saving: plan.saving ?? 0,
  };
   console.log("MoneyPlanPage plan : ", plan);  
  console.log("MoneyPlanPage dataValues : ", dataValues);
  const handleSend = () => {
    setModalOpen(true);  // "부모님한테 보내기" 버튼 클릭 시 모달 열기
  };
  const token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IuuwleuPhOuLiCIsImlkIjoiYWJjIiwicm9sZSI6IlJPTEVfQ0hJTEQiLCJtZW1iZXJObyI6MSwiaWF0IjoxNzMxNjU4Nzg3LCJleHAiOjE3MzE3NDUxODd9.R5wF7JEe9nP9OP-ivWZcdF8lOoUV0jQTcwmvGezx2Ng"; // 로�� 스토리지에서 ����� 가져오기
  const [isLoading, setIsLoading] = useState(false); // 전송 중 로딩 상태
  const [errorMessage, setErrorMessage] = useState(null); // 에러 메시지 상태
  const submitJoin = (e) => {
    e.preventDefault(); // 폼 제출 시 새로고침 방지
    setIsLoading(true);
    setErrorMessage(null);
    axios({
      method: "POST",
      url: "http://localhost:9999/children/plans",
      data: dataToSend,
      headers: {
        "Authorization": `Bearer ${token}`, // Authorization 헤더에 토큰 추가
        "Content-Type": "application/json", // 데이터가 JSON 형식임을 명시
      },
    })
      .then((res) => {
        console.log("axios res", res);
        setModalOpen(false); // 모달 닫기
        setIsLoading(false); // 로딩 상태 해제
      })
      .catch((err) => {
        console.error('Error:', err.message); // 오류 메시지 출력
        console.error('Error response:', err.response); // 서버 응답 (응답이 있을 경우)
        console.error('Error stack:', err.stack); // 오류 스택 추적
        setIsLoading(false); // 로딩 상태 해제
        setErrorMessage("전송 중 오류가 발생했습니다. 다시 시도해주세요.");
      });
      console.log("MoneyPlanPage dataToSend : ", dataToSend);  // 전��할 데이터 확인
  };

  return (
    <>
   
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
          <SendBtn onClick={handleSend}>부모님한테 보내기</SendBtn>
        </BtnWapper>
        {/* 모달이 열렸을 때만 표시 */}
        {isModalOpen && (
          <Modal width="500px" height="400px" padding="20px">
            <h3>보낼 계획 내용</h3>
            <div>
             {/* dataValues 배열을 순회하며 데이터를 표시 */}
             {dataValues.map((item, index) => (
                <p key={index}><strong>{item.label}:</strong> {item.value} 원</p>
              ))}
            </div>
            <BtnWapper>
            <button onClick={() => setModalOpen(false)}>닫기</button>
            <button onClick={submitJoin} disabled={isLoading}>
              {isLoading ? "전송 중..." : "전송"}
            </button>
            </BtnWapper>
          </Modal>
        )}
    </>
  );
};

export default MoneyPlanPage;

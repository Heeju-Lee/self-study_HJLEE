import React, { createContext, useContext, useState, useEffect } from "react";
import PlanForm from "../../components/pages/child/plan/PlanForm";
import styled from "styled-components";
import SaveForm from "../../components/pages/child/plan/SaveForm";
import SelectBox from "../../components/pages/child/plan/SelectBox";
import PlanProvider from "../context/MoneyPlanContext";
import { Modal } from "../../components/commons/Modal";
import { PlanContext } from "../context/MoneyPlanContext";
import axios from "axios";
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
  position: relative; /* OverlayDiv 위치 제어를 위해 추가 */
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
const OverlayDiv = styled.div`
  position: absolute; /* Wapper 내부에서 위치 고정 */
  top: 0;
  left: 130px;
  width: 80%; /* Wapper의 전체 너비 */
  height: 95%; /* Wapper의 전체 높이 */
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Wapper의 다른 요소 위에 표시 */
`;
const OverlayMessage = styled.h1`
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  background: #4829d7;
  padding: 20px;
  border-radius: 8px;
`;

const MoneyPlanPage = () => {
  const [isModalOpen, setModalOpen] = useState(false); // 모달 열림/닫힘 상태
  const { plan } = useContext(PlanContext); // Context에서 데이터를 가져옴
  const [isOverlayVisible, setOverlayVisible] = useState(false); // 오버레이 상태 추가
  const [dataValues, setDataValues] = useState([]); // 데이터값 배열
  // 데이터값 배열 생성
  // Context 값이 변경될 때 dataValues 동기화
  useEffect(() => {
    if (plan) {
      setDataValues([
        { label: "쇼핑", value: plan.shopping ?? 0 },
        { label: "교통", value: plan.transport ?? 0 },
        { label: "편의점", value: plan.cvs ?? 0 },
        { label: "음식", value: plan.food ?? 0 },
        { label: "기타", value: plan.others ?? 0 },
        { label: "저축", value: plan.saving ?? 0 },
      ]);
    }
  }, [plan]); // plan 변경 시 실행

  const handleSend = () => {
    // 모달을 열기 전에 Context 값을 기반으로 동기화
    setDataValues([
      { label: "쇼핑", value: plan.shopping ?? 0 },
      { label: "교통", value: plan.transport ?? 0 },
      { label: "편의점", value: plan.cvs ?? 0 },
      { label: "음식", value: plan.food ?? 0 },
      { label: "기타", value: plan.others ?? 0 },
      { label: "저축", value: plan.saving ?? 0 },
    ]);
    setModalOpen(true); // "부모님한테 보내기" 버튼 클릭 시 모달 열기
  };
  // Context 값을 기반으로 서버에 전송할 데이터 구성
  const dataToSend = {
    shopping: plan.shopping
      ? parseInt(plan.shopping.toString().replace(/,/g, ""), 10)
      : 0,
    transport: plan.transport
      ? parseInt(plan.transport.toString().replace(/,/g, ""), 10)
      : 0,
    cvs: plan.cvs ? parseInt(plan.cvs.toString().replace(/,/g, ""), 10) : 0,
    food: plan.food ? parseInt(plan.food.toString().replace(/,/g, ""), 10) : 0,
    others: plan.others
      ? parseInt(plan.others.toString().replace(/,/g, ""), 10)
      : 0,
    saving: plan.saving
      ? parseInt(plan.saving.toString().replace(/,/g, ""), 10)
      : 0,
  };
  console.log("MoneyPlanPage plan : ", plan);
  console.log("MoneyPlanPage dataValues : ", dataValues);
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IuuwleuPhOuLiCIsImlkIjoiYWJjIiwicm9sZSI6IlJPTEVfQ0hJTEQiLCJtZW1iZXJObyI6MSwiaWF0IjoxNzMxNjU4Nzg3LCJleHAiOjE3MzE3NDUxODd9.R5wF7JEe9nP9OP-ivWZcdF8lOoUV0jQTcwmvGezx2Ng"; // 로�� 스토리지에서 ����� 가져오기
  const [isLoading, setIsLoading] = useState(false); // 전송 중 로딩 상태
  const [errorMessage, setErrorMessage] = useState(null); // 에러 메시지 상태
  const submitJoin = (e) => {
    e.preventDefault(); // 폼 제출 시 새로고침 방지
    setIsLoading(true);
    setErrorMessage(null);

    axios({
      method: "POST",
      url: `http://localhost:9999/children/plans?year=${currentYear}&month=${currentMonth}`,
      data: dataToSend,
      headers: {
        Authorization: `Bearer ${token}`, // Authorization 헤더에 토큰 추가
        "Content-Type": "application/json", // 데이터가 JSON 형식임을 명시
      },
    })
      .then((res) => {
        console.log("axios res", res);
        setModalOpen(false); // 모달 닫기
        setIsLoading(false); // 로딩 상태 해제
        setOverlayVisible(true); // 성공 시 오버레이 표시
      })
      .catch((err) => {
        console.error("Error:", err.message); // 오류 메시지 출력
        console.error("Error response:", err.response); // 서버 응답 (응답이 있을 경우)
        console.error("Error stack:", err.stack); // 오류 스택 추적
        setIsLoading(false); // 로딩 상태 해제
        setErrorMessage("전송 중 오류가 발생했습니다. 다시 시도해주세요.");
      });
    console.log("MoneyPlanPage dataToSend : ", dataToSend); // 전��할 데이터 확인
  };

  const getplan = (e) => {
    e.preventDefault(); // 폼 제출 시 새로고침 방지
    setIsLoading(true);
    setErrorMessage(null);
    axios({
      method: "GET",
      url: `http://localhost:9999/children/show/plans?year=${currentYear}&month=${currentMonth}`,
      data: dataToSend,
      headers: {
        Authorization: `Bearer ${token}`, // Authorization 헤더에 토큰 추가
        "Content-Type": "application/json", // 데이터가 JSON 형식임을 명시
      },
    })
      .then((res) => {
        console.log("axios res", res);
        const planData = res.data;
        setDataValues([
          { label: "쇼핑", value: planData.shopping ?? 0 },
          { label: "교통", value: planData.transport ?? 0 },
          { label: "편의점", value: planData.cvs ?? 0 },
          { label: "음식", value: planData.food ?? 0 },
          { label: "기타", value: planData.others ?? 0 },
          { label: "저축", value: planData.saving ?? 0 },
        ]);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err.message); // 오류 메시지 출력
        console.error("Error response:", err.response); // 서버 응답 (응답이 있을 경우)
        console.error("Error stack:", err.stack); // 오류 스택 추적
        setIsLoading(false); // 로딩 상태 해제
        setErrorMessage("전송 중 오류가 발생했습니다. 다시 시도해주세요.");
      });
  };

  return (
    <>
      <TitleWapper>
        <PageTitle>소비계획 세우기</PageTitle>
        <SelectBox />
      </TitleWapper>
      <Wapper>
        {/* 오버레이 상태에 따라 표시 */}
        {isOverlayVisible && (
          <OverlayDiv>
            <OverlayMessage>
              계획 전송이 성공적으로 완료되었습니다!
            </OverlayMessage>
          </OverlayDiv>
        )}
        <PlanForm />
        <SaveForm />
      </Wapper>
      <BtnWapper>
        <UpdateBtn onClick={() => setOverlayVisible(false)}>수정하기</UpdateBtn>
        <SendBtn onClick={handleSend} disabled={isOverlayVisible}>
          부모님한테 보내기
        </SendBtn>
      </BtnWapper>
      {/* 모달이 열렸을 때만 표시 */}
      {isModalOpen && (
        <Modal width="500px" height="400px" padding="20px">
          <h3>보낼 계획 내용</h3>
          <div>
            {/* dataValues 배열을 순회하며 데이터를 표시 */}
            {dataValues.map((item, index) => (
              <p key={index}>
                <strong>{item.label}:</strong> {item.value} 원
              </p>
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

import React, { useRef, useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Modal } from "../../../commons/Modal";
import axios from "axios";
import { AuthContext } from "../../../../App";
import {formatCurrency} from "../../../../services/GlobalFunction";

const WishDetailBox = ({ selectedCard }) => {
  const [isModalOpen, setModalOpen] = useState(false); // 모달 열리고 닫고 상태 보관
  const [savingAmt, setSavingAmt] = useState(""); // 사용자가 입력한 저축 금액
  const [currentSaving, setCurrentSaving] = useState(5000); // 현재까지 모은 돈 (서버 데이터로 대체 가능)
  const { memberNo, name, authorization } = useContext(AuthContext);
  
  const token = authorization;
  //모달 오픈
  const inserModalOpen = () => {
    setModalOpen(true);
  };
  //모달 닫기
  const inserModalClose = () => {
    setModalOpen(false);
  };
  // 선택된 wish 데이터를 가져오기 위한 useEffect
  useEffect(() => {
    const fetchWishData = async () => {
      if (selectedCard?.id) {
        try {
          const response = await axios.get(
            `http://localhost:9999/children/wishes/${selectedCard.id}`,
            {
              headers: {
                Authorization: token, // 필요한 경우 토큰 추가
              },
            }
          );
          // setSelectedWish(response.data); // 서버에서 가져온 데이터를 상태에 저장
        } catch (error) {
          console.error("Wish 데이터 로드 실패:", error);
          alert("Wish 데이터를 가져오는 데 실패했습니다.");
        }
      }
    };

    fetchWishData();
  }, [selectedCard?.id, token]);

  // 돈 모으기 핸들러
  const handleCollectMoney = async () => {
    if (!savingAmt || parseInt(savingAmt, 10) <= 0) {
      alert("저축할 금액을 올바르게 입력하세요.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:9999/children/saving/wishes`,
        null, // POST 요청의 body가 필요 없다면 null
        {
          params: {
            wishNum: selectedCard.id, // 선택된 카드의 id 사용
            savingAmt: parseInt(savingAmt, 10), // 사용자가 입력한 저축 금액
          },
          headers: {
            Authorization: token, // 필요한 경우 토큰 추가
          },
        }
      );

      console.log("저축 성공:", response.data);

      // 성공 후 상태 업데이트 (현재 모은 돈)
      setCurrentSaving((prev) => prev + parseInt(savingAmt, 10));
      setSavingAmt(""); // 입력 필드 초기화
      setModalOpen(false); // 모달 닫기
      alert("성공적으로 저축되었습니다!");
    } catch (error) {
      console.error("저축 실패:", error);
      alert("저축에 실패했습니다. 다시 시도해 주세요.");
    }
  };
  return (
    <>
      <WishDetailBack>
        <Title>나의 위시 상세보기</Title>
        <DetailBox>
          <InsertPreview src={selectedCard.imgSrc} />
          <DetailTextBox>
            <DetailText>나의 물품 이름 : {selectedCard.itemName}</DetailText>
            <DetailText>
              목표가격 : {selectedCard.itemPrice.formatCurrency}원
            </DetailText>
            <DetailText>
              모은 돈 : {selectedCard.itemPrice.formatCurrency}원
            </DetailText>
            <DetailText>진행률: {selectedCard.progressRate}%</DetailText>
            <ProgressBar progressRate={selectedCard.progressRate}></ProgressBar>
          </DetailTextBox>
        </DetailBox>
        <DeleteWish >위시 삭제</DeleteWish>
        <CollectMoney onClick={inserModalOpen}>돈모으기</CollectMoney>
      </WishDetailBack>
      {/* 돈모으기 모달이 열렸을 때만 표시 */}
      {isModalOpen && (
        <Modal width="400px" height="600px">
          <ModalTitle>위시 돈 모으기</ModalTitle>
          <ModalPreview src={selectedCard.imgSrc} />
          <DetailText>{selectedCard.itemName}</DetailText>
          <DetailText>
            목표가격 : {formatCurrency(selectedCard.itemPrice)}원
          </DetailText>
          <DetailText>현재까지 모은 돈 : {formatCurrency(selectedCard.savingAmt)}원</DetailText>
          <DetailText>저축가능한 돈 : 5000원</DetailText>
          <DetailText>넣을 돈</DetailText>
          <FormInput />
          <CollectMoney onClick={inserModalClose}>돈모으기</CollectMoney>
        </Modal>
      )}
    </>
  );
};
const WishDetailBack = styled.div`
  background-color: #ececec;
  margin-top: 100px;
`;
const Title = styled.h3`
  color: black;
  text-align: center;
  padding-top: 50px;
  font-weight: bold;
`;
const ModalTitle = styled.h3`
  color: black;
  text-align: center;
  font-weight: bold;
`;
const DetailBox = styled.div`
  display: flex;
`;

const InsertPreview = styled.img`
  width: 20vw;
  height: 20vh;
  border: 1px solid #ccc;
  border-radius: 10px;
`;
const ModalPreview = styled.img`
  max-width: 20vw;
  max-height: 20vh;
  border: 1px solid #ccc;
  border-radius: 10px;
`;
const DetailTextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  flex-wrap: wrap;
  max-width: 300px;
  align-items: flex-start;
`;
const DetailText = styled.h5`
  color: black;
  text-align: center;
  padding-top: 10px;
  font-weight: bold;
`;
const DeleteWish = styled.button`
  background-color: #4829d7;
  color: white;
  font-style: bold;
  font-size: 1.2rem;
  border: 2px solid #4829d7;
  border-radius: 10px;
  width: 15vw;
  height: 5.8vh;
  margin-top: 1vh;
  font-weight: bold;
`;
const CollectMoney = styled.button`
  background-color: #4829d7;
  color: white;
  font-style: bold;
  font-size: 1.2rem;
  border: 2px solid #4829d7;
  border-radius: 10px;
  width: 15vw;
  height: 5.8vh;
  margin-top: 1vh;
  font-weight: bold;
`;
const FormInput = styled.input`
  padding: 8px;
  border: 5px solid #c8bef3;
  border-radius: 10px;
  outline: none;
  width: 70%;
`;

const ProgressBar = styled.div`
  width: 300px;
  position: relative;
  height: 30px;
  background-color: lightgray;
  border-radius: 10px;
  overflow: hidden;
  margin: 5px 0;

  &::before {
    content: "";
    position: absolute;
    height: 100%;
    width: ${(props) => (props.progressRate ? props.progressRate : 0)}%;
    background-color: #448c27;
    transition: width 0.3s ease-in-out;
  }
`;
export default WishDetailBox;

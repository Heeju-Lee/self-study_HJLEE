import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Modal } from "../../../commons/Modal";

const WishDetailBox = ({ selectedCard }) => {
  const [isModalOpen, setModalOpen] = useState(false); // 모달 열리고 닫고 상태 보관
  //모달 오픈
  const inserModalOpen = () => {
    setModalOpen(true);
  };
  //모달 닫기
  const inserModalClose = () => {
    setModalOpen(false);
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
              목표가격 : {selectedCard.itemPrice.toLocaleString()}원
            </DetailText>
            <DetailText>진행률: {selectedCard.progressRate}%</DetailText>
            <ProgressBar progressRate={selectedCard.progressRate}></ProgressBar>
          </DetailTextBox>
        </DetailBox>
        <DeleteWish>위시 삭제</DeleteWish>
        <CollectMoney onClick={inserModalOpen}>돈모으기</CollectMoney>
      </WishDetailBack>
      {/* 돈모으기 모달이 열렸을 때만 표시 */}
      {isModalOpen && (
        <Modal width="400px" height="600px">
          <Title>위시 돈 모으기</Title>
          <ModalPreview src={selectedCard.imgSrc} />
          <DetailText>{selectedCard.itemName}</DetailText>
          <DetailText>
            목표가격 : {selectedCard.itemPrice.toLocaleString()}원
          </DetailText>
          <DetailText>현재까지 모은 돈 : 5000원</DetailText>
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
`;
const Title = styled.h3`
  color: black;
  text-align: center;
  padding-top: 50px;
  font-weight: bold;
`;
const DetailBox = styled.div`
  display: flex;
`;

const InsertPreview = styled.img`
  max-width: 30vw;
  max-height: 30vh;
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
  width: 100%;
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

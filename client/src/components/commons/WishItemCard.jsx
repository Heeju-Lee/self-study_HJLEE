import React from "react";
import styled from "styled-components";
import height from "../../../node_modules/dom-helpers/esm/height";

// 위시 목록의 아이템
export const WishItemCard = ({
  // props의 기본값은 props 값 없을때 보여짐
  imgSrc = "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-card-40-iphone16prohero-202409?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1725567335931", // 아이템 이미지경로
  itemName = "아이폰 16", // 아이템 이름
  itemPrice = 1550000, // 아이템 가격
  progressRate = 50, // 적금 진행율

  cardWidth, // Card width (필수전달 x)
  cardHeight, // Card height (필수 x)
  cardPadding, // Card padding (필수 x)
  progressBarHeight, // ProgressBar height (필수 x)
  childNum, // childNum (필수 x, 현재 부모 위시리스트 목록용)
}) => {
  // 더미데이터 (test) 사용시 props 주석 후 사용
  // const imgSrc =
  //   "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-card-40-iphone16prohero-202409?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1725567335931"; // 아이템 이미지
  // const itemName = "아이폰 16"; // 아이템 이름
  // const itemPrice = 1550000;
  // const progressRate = 50; // 적금 진행율

  return (
    <Card
      cardWidth={cardWidth}
      cardHeight={cardHeight}
      cardPadding={cardPadding}
    >
      <ItemImg>
        <img src={imgSrc} alt={itemName} />
      </ItemImg>
      <ProgressBar progressRate={progressRate}></ProgressBar>

      <ItemDetail>
        {/* 부모용 위시리스트에 childNum 1, 2로 아이 프로필 더미 이미지 넣을 예정 */}
        {childNum && (
          <UserImg>
            <img
              src={
                childNum === 1
                  ? "/images/donny1Profile.png"
                  : "/images/donnySisterProfile.png"
              }
            />
          </UserImg>
        )}
        <ItemInfo>
          <ItemName>{itemName}</ItemName>
          <ItemPrice>{itemPrice.toLocaleString()}원</ItemPrice>
        </ItemInfo>
      </ItemDetail>
    </Card>
  );
};

const Card = styled.div`
  cursor: pointer;
  width: ${(props) => props.cardWidth || "300px"};
  height: ${(props) => props.cardHeight || "370px"};
  padding: ${(props) => props.cardPadding || "30px"};
  gap: ${(props) => props.gap || "10px"};

  border-radius: 20px;
  background-color: #ececec;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const ItemImg = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 20px;
  overflow: hidden;

  img {
    width: 100%;
  }
`;
const ProgressBar = styled.div`
  position: relative;
  height: 15px;
  background-color: lightgray;
  border-radius: 10px;
  overflow: hidden;
  margin: 10px 0;

  &::before {
    content: "";
    position: absolute;
    height: 100%;
    width: ${(props) => props.progressRate}%;
    background-color: #448c27;
    transition: width 0.3s ease-in-out;
  }
`;
const ItemDetail = styled.div`
  display: flex;
  gap: 15px;
`;
const UserImg = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  background-color: white; // 자리 표시용

  img {
    width: 100%;
    height: 100%;
  }
`;
const ItemInfo = styled.div``;
const ItemName = styled.div``;
const ItemPrice = styled.div``;

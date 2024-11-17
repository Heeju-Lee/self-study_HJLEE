import React from "react";
import styled from "styled-components";
import { WishItemCard } from "../../components/commons/WishItemCard";
import SelectOptionNav from "../../components/pages/parent/SelectOptionNav";
import { wishlistDummyData } from "../../data/wishlistDummyData";

// 위시리스트 보기
const WishListPage = () => {
  return (
    <Outer>
      <SelectOptionNav hasDateSelectOption={false} />
      <ListContainer>
        {wishlistDummyData.map((item) => (
          <WishItemCard
            key={item.itemName}
            childNum={item.childNum}
            imgSrc={item.imgSrc}
            itemName={item.itemName}
            itemPrice={item.itemPrice}
            progressRate={item.progressRate}
            // cardWidth={"200px"}
          />
        ))}
      </ListContainer>
    </Outer>
  );
};

const Outer = styled.div`
  padding: 20px;
  /* border: 1px solid red; */
`;
const ListContainer = styled.div`
  margin: 30px auto 0 auto;
  width: 80%;
  display: flex;
  flex-wrap: wrap; // 줄바꿈 설정
  gap: 15px;
  justify-content: space-between;
  /* border: 1px solid red; */
`;

export default WishListPage;

import React from "react";
import styled from "styled-components";
export const Landing1 = () => {
  return (
    <Outer>
      <LeftContainer>
        <img src="images/final_Donny.png" alt="Donny"/>
      </LeftContainer>

      <RightContainer>
        <SliderWrapper>
          <Slider>
            {/* &#91; &#93;  */}
              <div><div>금융이</div></div>
              <div><div>투자가</div></div>
              <div><div>돈이</div></div>        
          </Slider>
          <Word>뭐니?</Word>
          
        </SliderWrapper>

        <h1>도니머니가 알려줄게!!</h1>
        <h5>아이의 입장에서 경제를 바라봅니다</h5>
        <h5>경제를 알아야 세상을 읽을 수 있습니다</h5>
        <h5>아이에게 세상을 이끌 힘을 길러주세요</h5>
      </RightContainer>
    </Outer>
  );
};

const Outer = styled.div`
  border: 3px solid red;
  width: 100%;
  height: 100%;
  scroll-snap-align: start; /* 섹션 시작 지점에서 스크롤 정지 */
  
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #8529FD;
`;

const LeftContainer = styled.div`
  width: 100%;
  /* border: 3px solid green; */
  flex-direction: column;
  text-align: center;

  img {
    width: 300px;
  }
`;

const RightContainer = styled.div`
  width: 100%;
  /* border: 3px solid blue; */
  align-items: center;
  color : white;
  position: relative;
`;

const SliderWrapper = styled.div`
  color:#999;
  text-transform: uppercase;
  font-size:36px;
  font-weight:bold;
  /* padding-top:200px;   */
  position:absolute;
  width:100%;
  /* bottom:45%; */
  top: -70px;
  display:block;

`;

const Word = styled.div`
  position: absolute;

  left: 130px;
  top: 0%;

`;


const Slider = styled.div`
  height:50px;
  overflow:hidden;

  div > div {
  color:#fff;
  /* padding:4px 12px; */
  height:45px;
  margin-bottom:45px;
  display:inline-block;

  width: 120px;
  text-align: center;
  }

  div:first-child {
    animation: show 10s linear infinite;
  }

  div div {
    background:#42c58a;
  }
  div:first-child div {
    background:#4ec7f3;
  }
  div:last-child div {
    background:#DC143C;
  }

  @keyframes show {
    0% {margin-top:-270px;}
    5% {margin-top:-180px;}
    33% {margin-top:-180px;}
    38% {margin-top:-90px;}
    66% {margin-top:-90px;}
    71% {margin-top:0px;}
    99.99% {margin-top:0px;}
    100% {margin-top:-270px;}
  }

`;


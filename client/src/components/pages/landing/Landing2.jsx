import React from "react";
import styled from "styled-components";

export const Landing2 = () => {
  return (
    <Outer>
      <h1>Landing2</h1>
    </Outer>
  );
};

const Outer = styled.div`
  width: 100%;
  height: 100vh;
  scroll-snap-align: start; /* 섹션 시작 지점에서 스크롤 정지 */
`;

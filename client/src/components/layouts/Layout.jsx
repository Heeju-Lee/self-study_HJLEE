import React from "react";
import styled from "styled-components";

// 레이아웃
export default function Layout({ children, scrollEnabled = true }) {
  return (
    <Section scrollEnabled={scrollEnabled}>
      <Main>{children}</Main>
    </Section>
  );
}

// Section 스타일 (scrollEnabled prop 활용)
const Section = styled.section.withConfig({
  shouldForwardProp: (prop) => prop !== "scrollEnabled", //scrollEnabled를 DOM에 전달하지 않음
})`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  overflow-y: ${(props) => (props.scrollEnabled ? "auto" : "hidden")};
`;

const Main = styled.main`
  width: 100%;
  max-width: 1360px;

  padding: 80px 40px 0 40px;
  margin: 0 auto;
  flex-grow: 1;

  /* border: 1px solid gray; */
`;

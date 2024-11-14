import React from "react";
import styled from "styled-components";

// TODO 레이아웃 작업
export default function Layout({ children, scrollEnabled = true }) {
  console.log("children : ", children);

  return (
    <Section scrollEnabled={scrollEnabled}>
      <Main>{children}</Main>
    </Section>
  );
}

// Section 스타일 (scrollEnabled prop 활용)
const Section = styled.section`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  ${({ scrollEnabled }) =>
    scrollEnabled
      ? `
      overflow-y: auto;
    `
      : `
      overflow-y: hidden;
    `}
`;

const Main = styled.main`
  width: 100%;
  max-width: 1360px;

  padding: 80px 40px 0 40px;
  margin: 0 auto;
  flex-grow: 1;

  /* border: 1px solid gray; */
`;

const GlobalStyles = styled`
  @font-face {
    font-family: 'HakgyoansimDunggeunmisoTTF-B';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimDunggeunmisoTTF-B.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
  }

  body {
    font-family: 'HakgyoansimDunggeunmisoTTF-B', sans-serif;
  }
`;

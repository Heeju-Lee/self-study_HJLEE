import React from "react";
import styled from "styled-components";

// TODO 레이아웃 작업
export default function Layout({ children }) {
  return (
    <Section>
      <Main>{children}</Main>
    </Section>
  );
}

const Section = styled.section`
  width: 100%;
  border: 1px solid blue;
`;

const Main = styled.main`
  width: 100%;
  max-width: 1360px;
  padding: 80px 40px 0 40px;
  margin: 0 auto;
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
import React from "react";
import { createGlobalStyle } from "styled-components";

// 전역 스타일 정의
export const GlobalStyle = createGlobalStyle`

  @font-face {
    font-family: 'HakgyoansimDunggeunmisoTTF-B';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimDunggeunmisoTTF-B.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
  }
  
  body {
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
    background-color: #F3EDFD;
    font-family: 'HakgyoansimDunggeunmisoTTF-B', sans-serif;
    
  }

  a {
    text-decoration: none;
    color: inherit;
  }
  ul {
    list-style: none;
  }

  * {
    box-sizing: border-box;
  }

`;

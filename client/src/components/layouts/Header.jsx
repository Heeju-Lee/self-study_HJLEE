import React, { useContext } from "react";
import styled from "styled-components";
import axios from "axios";
// import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { LogingedContext } from "../../App";
import { Button } from "react-bootstrap";

const Header = () => {
  let logingedCon = useContext(LogingedContext);

  const navigate = useNavigate();

  const logoutCheck = () => {
    localStorage.removeItem("memberNo");
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    localStorage.removeItem("Authorization");

    logingedCon.onLoggedChange(false);

    navigate("/");
  };

  // const checkPlanAndNavigate = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:9999/plans/1");
  //     if (response.data) {
  //       // 데이터가 있을 경우 PlanForm으로 이동
  //       navigate("/planPage");
  //     } else {
  //       // 데이터가 없을 경우 SaveForm으로 이동
  //       navigate("/planPage"); // SaveForm을 보여줄 경로
  //     }
  //   } catch (error) {
  //     console.error("Error fetching plan:", error);
  //     navigate("/saveForm"); // 오류 발생 시에도 PlanForm으로 이동
  //   }
  // };

  // TODO 부모, 아이 분기
  // TODO 로그인 전후 분기
  return (
    <HeaderSection>
      <Container>
        {/* 로고 */}
        <LeftSection>
          <Link to="/">
            <LogoOuter>
              <img
                src="/images/donnymoney-logo.png"
                alt="logo"
                width={"100%"}
                height={"auto"}
              />
            </LogoOuter>
          </Link>
          <p>도니머니</p>
        </LeftSection>

        <MenuSection>
          <Link
          // to="/plan-page"
          // onClick={checkPlanAndNavigate}
          >
            <span>용돈계획서</span>
          </Link>
          <Link to="/">
            <span>경제배우기</span>
          </Link>
          <Link to="/">
            <span>내꿈모으기</span>
          </Link>
        </MenuSection>
        <RightSection>
          {!logingedCon.isLoggedIn && (
            <>
              <Link to="/login">
                <span>로그인</span>
              </Link>
              <Link
                to="/register"
                onClick={(e) => {
                  e.preventDefault(); // 기본 동작 막음
                  window.location.href = "/register"; // 강제로 새로고침하며 이동
                }}
              >
                <span>회원가입</span>
              </Link>
            </>
          )}

          {logingedCon.isLoggedIn && (
            <>
              <Button onClick={logoutCheck}>로그아웃</Button>
              <BellButton type="button" className="bell-button" />
              <span>{localStorage.getItem("name")}님</span>
            </>
          )}
        </RightSection>

        {/* <Link to="/test-child">아이테스트</Link>
        <Link to="/test-parent">부모테스트</Link> */}
      </Container>
    </HeaderSection>
  );
};

const BellButton = styled.input`
  background: url("images/bell_2.png") no-repeat center center;
  background-size: contain;
  width: 40px;
  height: 40px;
  border: none;
`;

const HeaderSection = styled.div`
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
`;
const Container = styled.div`
  width: 100%;
  max-width: 1360px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  margin: 0 auto;
  font-weight: bold;
`;

// 왼쪽 영역 로고
const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 24px;

  p {
    margin: 0;
  }
`;
const LogoOuter = styled.div`
  width: 50px;
  height: 50px;
  position: relative;
`;

// 가운데 메뉴 영역
const MenuSection = styled.div`
  display: flex;
  padding-left: 0;
  margin-bottom: 0;
  gap: 100px;
  font-size: 20px;

  /* border: 1px solid red; */
`;

// 오른쪽 영역
const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 20px;

  /* border: 1px solid red; */
`;

export default Header;

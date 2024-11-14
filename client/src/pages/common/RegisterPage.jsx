import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChildRegisterForm from "../../components/pages/child/register/ChildRegisterForm";
import ParentRegisterForm from "../../components/pages/parent/register/ParentRegisterForm";

/*
  회원가입
*/
export const RegisterPage = () => {
  const [userTypeOption, setUserTypeOption] = useState(false); // 유저타입선택
  const [childRegister, setChildRegister] = useState(false); // 아이회원가입폼
  const [parentRegister, setParentRegister] = useState(false); //부모회원가입폼

  // 회원 선택시 처리
  const handleShowForm = (userType) => {
    setUserTypeOption(false);
    setParentRegister(userType === "parent");
    setChildRegister(userType === "child");
  };

  useEffect(() => {
    setUserTypeOption(true);
    setChildRegister(false);
    setParentRegister(false);
  }, []);

  return (
    <>
      {userTypeOption && (
        <SelectUserType>
          <Title>가입회원의 대상을 선택해주세요</Title>
          <Section>
            <Container>
              <ImageContainer onClick={() => handleShowForm("parent")}>
                <img src="/images/sample-dad.png" />
              </ImageContainer>
              <SubTitle>부모님</SubTitle>
            </Container>

            <Container>
              <ImageContainer onClick={() => handleShowForm("child")}>
                <img src="/images/sample-sister.png" />
              </ImageContainer>
              <SubTitle>자녀</SubTitle>
            </Container>
          </Section>
        </SelectUserType>
      )}
      {parentRegister && (
        <FormSection>
          <ParentRegisterForm />
        </FormSection>
      )}

      {childRegister && (
        <FormSection>
          <ChildRegisterForm />
        </FormSection>
      )}
      {/* <FormSection>
        <ChildRegisterForm />
      </FormSection> */}
    </>
  );
};

const SelectUserType = styled.div``;
const Title = styled.div`
  font-size: 32px;
  text-align: center;
  margin-bottom: 70px;
`;

const Section = styled.div`
  display: flex;
  justify-content: center;
  gap: 120px;
`;
const Container = styled.div``;

const ImageContainer = styled.div`
  cursor: pointer;
  width: 300px;
  height: 300px;
  border-radius: 20px;
  background-color: white;
  margin-bottom: 20px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }

  transition: transform 0.3s ease, background-color 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

const SubTitle = styled.div`
  text-align: center;
  font-size: 30px;
`;

const FormSection = styled.div`
  /* border: 1px solid red; */
`;

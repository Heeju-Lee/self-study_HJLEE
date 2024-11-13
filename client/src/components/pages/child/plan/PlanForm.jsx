import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Form, Button, FormGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const PlanForm = (props) => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { pid } = useParams();

  const [plan, setPlan] = useState({
    shopping: "",
    transport: "",
    cvs: "",
    food: "",
    others: "",
    saving: "",
    date: new Date().toISOString().split("T")[0],
    // childNum : 1
  });

  // useEffect(() => {
  //   axios({
  //     url: "http://localhost:9999/plans/1",
  //     method: "get",
  //   }).then((res) => {
  //     console.log(res.data);
  //     setPlan(res.data);
  //   });
  // }, []);

  const updatePlan = () => {
    alert("이동....");
    navigate("/updateForm/");
  };
  const Container = styled.div`
    background-color: #886eff; /* 원하는 색상 */
    min-height: 80vh;
    width: 50vh;
    border-radius: 30px; 
    margin: -10px 0 50px 40px;
    border: 5px solid #C8BEF3;
  `;
  const Title = styled.h3`
  color: white;
  text-align: center;
  padding-top: 50px;
  font-weight: bold;
`;

  const FormPlan = styled.form`
    width: 33vh;
    margin: 0 auto;
    padding: 5px 0 0 20px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center
  `;
  const FormGroup = styled.div`
   display: grid;
  grid-template-columns: 1fr  auto ; /* 첫 번째 칸은 콘텐츠 크기, 두 번째 칸은 남은 공간 차지 */
  align-items: center;
  padding: 10px;
  `;
  const FormBox = styled.div`
    display: flex;
    flex-direction: column;
    margin:0 3vh 0 -5vh;
  `
  const FormTitle = styled.h4`
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
  color: #ffffff;
  margin: 0 0 0 2vh;
  `;

  const FormImg = styled.img`
  display:flex;
  align-self: baseline;
  width: 50px;
  height: 50px;
  margin: 0 0 0 15px;
  `;
  const FormInput = styled.input`
  padding: 8px;
  border: 5px solid #C8BEF3;
  border-radius: 10px; 
  outline: none;
  width: 100%; 
  `;
  const UpdateBtn= styled.button`
  background-color: #4829D7;
  color: white;
  font-style: bold;
  font-size: 1.2rem;
  border: 2px solid #4829D7;
  border-radius: 10px;
  width: 15vh;
  height: 5.8vh;
  margin-top: 30px;
  font-weight: bold;
  `;
  return (
    <Container>
      <Title>카테고리</Title>
      <FormPlan on>
        <FormGroup>
          <FormBox>
          <FormImg
            src={`${process.env.PUBLIC_URL}/icons/food.png`}
            alt="food"
          />
          <FormTitle>음식</FormTitle>
          </FormBox>
          <FormInput
            type="text"
            name="food"
            readOnly
            value={plan.food}
          />
        </FormGroup>

        <FormGroup>
          <FormBox>
          <FormImg
            src={`${process.env.PUBLIC_URL}/icons/cvs.png`}
            alt="cvs"
          />
          <FormTitle>편의점</FormTitle>
          </FormBox>
          <FormInput
            type="text"
            name="cvs"
            readOnly
            value={plan.cvs}
          />
        </FormGroup>
        <FormGroup>
          <FormBox>
          <FormImg
            src={`${process.env.PUBLIC_URL}/icons/shopping.png`}
            alt="shopping cart"
          />
          <FormTitle>쇼핑</FormTitle>
          </FormBox>
          <FormInput
            type="text"
            name="shopping"
            readOnly
            value={plan.shopping}
          />
        </FormGroup>
        <FormGroup>
          <FormBox>
          <FormImg
            src={`${process.env.PUBLIC_URL}/icons/transport.png`}
            alt="transport"
          />
          <FormTitle>교통</FormTitle>
          </FormBox>
          <FormInput
            type="text"
            name="transport"
            readOnly
            value={plan.transport}
          />
        </FormGroup>
        <FormGroup>
          <FormBox>
          <FormImg
            src={`${process.env.PUBLIC_URL}/icons/saving.png`}
            alt="saving"
          />
          <FormTitle>저축</FormTitle>
          </FormBox>
          <FormInput
            type="text"
            name="saving"
            readOnly
            value={plan.saving}
          />
        </FormGroup>
        <FormGroup>
          <FormBox>
          <FormImg
            src={`${process.env.PUBLIC_URL}/icons/others.png`}
            alt="saving"
          />
          <FormTitle>기타</FormTitle>
          </FormBox>
          <FormInput
            type="text"
            name="other"
            readOnly
            value={plan.other}
          />
        </FormGroup>
        <UpdateBtn onClick={updatePlan}>
          미리보기
        </UpdateBtn>
      </FormPlan>
    </Container>
  );
};

export default PlanForm;

import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import DoughnutChart from "./DoughnutChart";

const SaveForm = () => {
  // ---------------여기는
  const Container = styled.div`
    background-color: #886eff;
    min-height: 80vh;
    width: 50vh;
    border-radius: 30px;
    border: 5px solid #c8bef3;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    align-content: center;
  `;
  const Title = styled.h3`
    color: white;
    text-align: center;
    font-weight: bold;
    margin-top: -80px;
  `;
  const DonnyImg = styled.img`
    width: 10vw;
    margin: 0 0 40px -150px;
  `;
  const Wapper = styled.div`
    display: flex;
    flex-wrap: nowrap;
    align-items: flex-end;
    margin: -10px 70px 50px 0px;
  `;
  return (
    <>
      <Wapper>
        <Container>
          <Title>내 계획 미리보기</Title>
          <DoughnutChart />
        </Container>
        <DonnyImg
          src={`${process.env.PUBLIC_URL}/images/donny2.png`}
          alt="donny"
        />
      </Wapper>
    </>
  );
};

export default SaveForm;

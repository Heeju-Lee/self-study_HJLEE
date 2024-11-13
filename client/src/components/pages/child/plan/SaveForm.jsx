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
    width: 80vh;
    border-radius: 30px;
    margin: -10px 0 50px 40px;
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

  return (
    <Container>
      <Title>내 계획 미리보기</Title>
      <DoughnutChart />
    </Container>
  );
};

export default SaveForm;

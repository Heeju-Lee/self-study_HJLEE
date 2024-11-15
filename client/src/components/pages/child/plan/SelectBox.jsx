import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";

import { PlanContext } from "../../../../pages/context/MoneyPlanContext";
const SelectBoxContainer = styled.div`
  position: relative;
  width: 200px;
`;

const SelectedOption = styled.div`
  padding: 10px;
  border: 1px solid #c8bef3;
  border-radius: 5px;
  cursor: pointer;
  background-color: #fff;
`;

const OptionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  border: 1px solid #c8bef3;
  border-radius: 5px;
  background-color: #fff;
  max-height: 150px;
  overflow-y: auto;
  padding: 0;
  margin: 5px 0 0;
  list-style: none;
  display: ${(props) => (props.open ? "block" : "none")};
`;

const OptionItem = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const SelectBox = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const { plan } = useContext(PlanContext);
  // 더미 데이터
  const options = [
    { id: 1, value: "짜장면" },
    { id: 2, value: "치킨" },
    { id: 3, value: "곱창" },
    { id: 4, value: "피자" },
    { id: 5, value: "족발" },
    { id: 6, value: "한강라면" },
  ];

  const handleOptionClick = (option) => {
    setSelectedOption(option.value);
    setIsOpen(false);
  };

  return (
    <SelectBoxContainer>
      <SelectedOption onClick={() => setIsOpen(!isOpen)}>
        {selectedOption || "옵션을 선택하세요"}
      </SelectedOption>
      <OptionsList open={isOpen}>
        {options.map((option) => (
          <OptionItem key={option.id} onClick={() => handleOptionClick(option)}>
            {option.value}
          </OptionItem>
        ))}
      </OptionsList>
    </SelectBoxContainer>
  );
};

export default SelectBox;

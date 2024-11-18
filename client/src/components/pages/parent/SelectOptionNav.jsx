import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import axios from "axios";

/**
 * SelectOptionNav 컴포넌트
 * - 데이터 처리와 날짜 선택옵션 사용여부 제어
 * - 날짜 선택옵션은 필요한 페이지에서만 사용 (현재 부모용 월간리포트와 용돈계약서에 적용, 위시리스트는 제외)
 *
 * @param {Function} onHandleData - 데이터 처리할 콜백 함수
 * @returns {boolean} hasDateSelectOption - 날짜선택옵션 사용여부 (기본값: true)
 */
const SelectOptionNav = ({ onHandleData, hasDateSelectOption = true }) => {
  const token = localStorage.getItem("Authorization");

  const today = new Date();

  const [children, setChildren] = useState([]);
  const [selectedChildNum, setSelectedChildNum] = useState(1);
  const [selectedChildName, setSelectedChildName] = useState(""); 
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null); // 드롭다운 영역을 참조하기 위한 useRef
  // 아이 이미지 더미 데이터 (2명)
  const childIamge = ["/images/sample-sister.png", "/images/donny1Profile.png"];

  // 자식 선택 처리
  const handleChildSelect = (childNum, childName) => {
    setSelectedChildNum(childNum);
    setSelectedChildName(childName);
  
    onHandleData({ childNum, childName }); // 부모 컴포넌트로 childNum, childName 전달
  };

  // 날짜 선택 처리
  const handleDateSelect = (month) => {
    setSelectedMonth(month);
    onHandleData({ year: selectedYear, month }); // 부모 컴포넌트로 year와 month 전달
    setIsOpen(false); // 드롭다운 닫기
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    onHandleData({ [name]: value }); // 선택된 값만 부모로 전달
  };

  // 모든 자식 가져오기
  const getChildrenList = () => {
    axios({
      method: "GET",
      url: `http://localhost:9999/parents/findChildren`,
      headers: {
        Authorization: `${token}`,
      },
    })
      .then((res) => {
        console.log("res : ", res.data);
        setChildren(res.data);

        const firstChild = res.data[0];
        setSelectedChildNum(firstChild.childNum);
        setSelectedChildName(firstChild.name);

        onHandleData({ 
          childNum: firstChild.childNum, 
          childName: firstChild.name, 
        });

      })
      .catch((err) => {
        console.log("err : ", err);
      });
  };

  // 날짜옵션 외부 클릭 감지
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false); // 외부 클릭 시 날짜옵션 닫기
    }
  };

  useEffect(() => {
    getChildrenList();

    // 클릭 이벤트 리스너 등록
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Outer>
      <SelectChildSection>
        {/* 아이 배열만큼 이미지 보여줌 */}
        {children.map((child, index) => (
          <ChildContainer
            key={child.childNum}
            onClick={() => handleChildSelect(child.childNum, child.name)}
          >
            <ImageDiv isSelected={child.childNum === selectedChildNum}>
              <img src={childIamge[index]} />
            </ImageDiv>
            <NameLabel>{child.name}</NameLabel>
          </ChildContainer>
        ))}
      </SelectChildSection>

      {/* 날짜 선택 */}
      {hasDateSelectOption && (
        <SelectDateSection>
          <SelectWrapper ref={dropdownRef}>
            <SelectBox onClick={() => setIsOpen(!isOpen)}>
              <>{`${selectedYear}년 ${selectedMonth}월`}</>
              <img
                src="/icons/down.png"
                width={"15px"}
                height={"15px"}
                // style={{ marginLeft: "10px" }}
              />
            </SelectBox>
            {isOpen && (
              <Options>
                {Array.from({ length: 12 }, (_, index) => index + 1).map(
                  (month) => (
                    <Option key={month} onClick={() => handleDateSelect(month)}>
                      {`${selectedYear}년 ${month}월`}
                    </Option>
                  )
                )}
              </Options>
            )}
          </SelectWrapper>
        </SelectDateSection>
      )}
    </Outer>
  );
};

const Outer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SelectChildSection = styled.div`
  display: flex;
  gap: 10px;
  background-color: rgb(245, 245, 245);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 25px;
`;

const ChildContainer = styled.div``;

const ImageDiv = styled.div`
  cursor: pointer;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }

  ${(props) =>
    props.isSelected &&
    css`
      box-shadow: 0 0 10px 5px rgba(72, 41, 215, 0.7);
    `}
`;

const NameLabel = styled.div`
  text-align: center;
`;

// 날짜 선택
const SelectDateSection = styled.div`
  display: flex;
  align-items: center;
`;

const SelectWrapper = styled.div`
  position: relative;
  width: 200px;
`;

const SelectBox = styled.div`
  background-color: #ffffff;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
  text-align: center;
  border-radius: 10px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Options = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
`;

const Option = styled.div`
  padding: 10px;
  cursor: pointer;
  text-align: center;
  &:hover {
    background-color: #e0e0e0;
  }
`;
export default SelectOptionNav;

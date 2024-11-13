import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [step, setStep] = useState(1); // 현재 단계 상태
  const steps = [
    { number: 1, label: "회원가입 정보" },
    { number: 2, label: "부모님 연동" },
    { number: 3, label: "회원가입 완료" },
  ];

  const [child, setChild] = useState({
    id: "",
    pwd: "",
    name: "",
    birthdate: "",
    phone: "",
    email: "",
    role: "ROLE_CHILD",
    parentNum: "",
  });

  // 중복체크 결과 값을 저장 할 idCheckResult
  const [idCheckResult, setIdCheckResult] = useState("");

  // 아이디 중복여부에 따른 css 를 적용하기 위해 상태 변수
  const [isCheckResult, setIsCheckResult] = useState(false);

  // 부모님 존재 여부 메시지
  const [parentExistMessage, setParentExistMessage] = useState("");

  // 부모님 존재 여부 상태
  const [isParentExist, setIsParentExist] = useState(false);

  // 부모님 이름 연락처 상태
  const [pname, setPname] = useState("");
  const [pphone, setPphone] = useState("");

  //각 text 박스에 값이 변경되었을 때
  const changeValue = (e) => {
    setChild({ ...child, [e.target.name]: e.target.value });

    //id 입력박스에 값이 입력될때마다 axios를 이용해서 비동기통신 - 중복여부 체크
    if (e.target.name === "id" && e.target.value !== "") {
      axios({
        method: "GET",
        url: "http://localhost:9999/children/signup/" + e.target.value,
      })
        .then((res) => {
          console.log(res);
          setIdCheckResult(res.data);
          res.data === "중복입니다."
            ? setIsCheckResult(true)
            : setIsCheckResult(false);
        })
        .catch((err) => {
          //실패
          let errMessage = err.response.data.type + "\n";
          errMessage += err.response.data.title + "\n";
          errMessage += err.response.data.detail + "\n";

          errMessage += err.response.data.status + "\n";
          errMessage += err.response.data.instance + "\n";
          errMessage += err.response.data.timestamp;
          alert(errMessage);
        });
    }
  };
  // 부모님 찾기 버튼을 눌렀을 떄
  const findParent = (e) => {
    setChild({ ...child, [e.target.name]: e.target.value });

    if (pname !== "" && pphone !== "") {
      axios({
        method: "GET",
        // url: "http://localhost:9999/children",
        url: "http://localhost:9999/find/MyParent",
        params: {
          pname, // 부모 아이디
          pphone, // 부모 연락처
        },
      })
        .then((res) => {
          //console.log(res);
          setIsParentExist(res.data);
          if (res.data.exists) {
            setChild({ ...child, parentNum: res.data.parentNum });
            setParentExistMessage(
              "부모님 찾기 완료! 회원가입 버튼을 눌러주세요"
            );
            setIsParentExist(true);
          } else {
            setParentExistMessage(
              "부모님이 존재하지 않습니다. 부모님께 확인해보세요"
            );
            setIsParentExist(false);
          }
        })
        .catch((err) => {
          //실패
          let errMessage = err.response.data.type + "\n";
          errMessage += err.response.data.title + "\n";
          errMessage += err.response.data.detail + "\n";

          errMessage += err.response.data.status + "\n";
          errMessage += err.response.data.instance + "\n";
          errMessage += err.response.data.timestamp;
          alert(errMessage);
        });
    } else {
      setParentExistMessage("부모님의 아이디와 연락처를 모두 입력해주세요.");
      setIsParentExist(false);
    }
  };

  const navigator = useNavigate();

  //가입하기
  const submitJoin = (e) => {
    if (!child.parentNum) {
      alert("부모님 정보를 확인한 후, 가입을 진행해주세요.");
      return;
    }
    axios({
      method: "POST",
      url: "http://localhost:9999/children/signup",
      data: child,
    })
      .then((res) => {
        console.log(res);
        navigator("/");
      })
      .catch((err) => {
        console.log(err);
        let errMessage = err.response.data.type + "\n";
        errMessage += err.response.data.title + "\n";
        errMessage += err.response.data.detail + "\n";
        errMessage += err.response.data.status + "\n";
        errMessage += err.response.data.instance + "\n";
        errMessage += err.response.data.timestamp;
        alert(errMessage);
      });
  };

  return (
    <Container>
      {/* Progress Bar */}
      <ProgressBar>
        {steps.map((item, index) => (
          <Step key={index} isActive={step === item.number}>
            <Circle isActive={step >= item.number}>{item.number}</Circle>
            <CustomLabel isActive={step >= item.number}>
              {item.label}
            </CustomLabel>
            {index < steps.length - 1 && <Line isActive={step > item.number} />}
          </Step>
        ))}
      </ProgressBar>

      {/* 단계별 내용 */}
      <Content>
        {step === 1 && (
          <>
            <h2>1단계: 회원가입 정보</h2>
            <InputRow>
              <Label>아이디</Label>
              <Input
                type="text"
                placeholder="아이디 입력"
                onChange={changeValue}
              />
              <p style={isCheckResult ? { color: "red" } : { color: "blue" }}>
                {idCheckResult}
              </p>
            </InputRow>
            <InputRow>
              <Label>비밀번호</Label>
              <Input type="password" placeholder="비밀번호 입력" />
            </InputRow>
            <InputRow>
              <Label>이름</Label>
              <Input type="text" placeholder="이름 입력" />
            </InputRow>
            <Button onClick={() => setStep(2)}>다음</Button>
          </>
        )}
        {step === 2 && (
          <>
            <h2>부모님 연동하기</h2>
            <InputRow>
              <Label>부모님 이름</Label>
              <Input type="text" placeholder="부모님 이름 입력" />
            </InputRow>
            <InputRow>
              <Label>부모님 연락처</Label>
              <Input type="text" placeholder="부모님 연락처 입력" />
            </InputRow>
            <Button>부모님 확인</Button>
            <Button
              onClick={() => {
                // 부모님 확인 완료
                submitJoin();
                setStep(3);
              }}
            >
              가입하기
            </Button>
          </>
        )}
        {step === 3 && (
          <>
            <h2>회원가입 완료</h2>
            <p>회원가입이 성공적으로 완료되었습니다!</p>
            <Button onClick={() => alert("홈으로 이동")}>홈으로</Button>
          </>
        )}
      </Content>

      {/* 단계 전환 버튼 */}
      <Navigation>
        <Button
          onClick={() => setStep((prev) => Math.max(prev - 1, 1))}
          disabled={step === 1}
        >
          이전
        </Button>
        <Button
          onClick={() => setStep((prev) => Math.min(prev + 1, steps.length))}
          disabled={step === steps.length}
        >
          다음
        </Button>
      </Navigation>
    </Container>
  );
};

export default RegisterPage;

const Container = styled.div`
  width: 600px;
  margin: 50px auto;
`;

const ProgressBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
  position: relative;
  width: 100%;
`;

const Step = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  flex: 1; /* 각 Step을 동일한 너비로 설정 */
`;

const Circle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => (props.isActive ? "#9774FB" : "#e0e0e0")};
  color: ${(props) => (props.isActive ? "white" : "black")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  position: relative;
  z-index: 1;
`;

const CustomLabel = styled.div`
  margin-top: 5px;
  color: ${(props) => (props.isActive ? "#9774FB" : "#a0a0a0")};
  font-weight: ${(props) => (props.isActive ? "bold" : "normal")};
`;

const Line = styled.div`
  width: 100%; /* Step 사이의 간격에 맞게 조정 */
  height: 2px;
  background-color: ${(props) => (props.isActive ? "#9774FB" : "#e0e0e0")};
  position: absolute;
  top: 15px;
  left: 50%;
  /* transform: translateX(-50%); */
  z-index: -1;
  transition: background-color 0.3s ease; /* 배경색 변경 애니메이션 */
`;

const Content = styled.div`
  text-align: center;
`;

const InputRow = styled.div`
  margin-bottom: 20px;
  text-align: left;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid gray;
  border-radius: 5px;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #9774fb;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:disabled {
    background-color: #e0e0e0;
    color: #a0a0a0;
    cursor: not-allowed;
  }
`;

const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

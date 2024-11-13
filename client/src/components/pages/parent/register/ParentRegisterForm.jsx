import { useState } from "react";
import { Button, InputGroup } from "react-bootstrap";
// import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ParentRegisterForm = () => {
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
        url: "http://localhost:9999/children/signup/find/MyParent",
        params: {
          pname, // 부모 아이디
          pphone, // 부모 연락처
        },
      })
        .then((res) => {
          console.log(res);
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
    <StyledForm>
      <Title>아이 회원가입</Title>
      <Form>
        <InputRow>
          <Label htmlFor="id">*아이디</Label>
          <Input type="text" id="id" name="id" onChange={changeValue} />
          <CheckText
            style={isCheckResult ? { color: "red" } : { color: "blue" }}
          >
            {idCheckResult}
          </CheckText>
        </InputRow>
        <InputRow>
          <Label htmlFor="pwd">*비밀번호</Label>
          <Input type="password" id="pwd" name="pwd" onChange={changeValue} />
        </InputRow>

        <InputRow>
          <Label htmlFor="name">*이름</Label>
          <Input type="text" id="name" name="name" onChange={changeValue} />
        </InputRow>

        <InputRow>
          <Label htmlFor="birthdate">생일</Label>
          <Input
            type="date"
            id="birthdate"
            name="birthdate"
            onChange={changeValue}
          />
        </InputRow>
        <InputRow>
          <Label htmlFor="phone">전화번호</Label>
          <Input type="text" id="phone" name="phone" onChange={changeValue} />
        </InputRow>

        <InputRow>
          <Label htmlFor="email">이메일 주소</Label>
          <Input type="email" id="email" name="email" onChange={changeValue} />
        </InputRow>

        <h2>부모님 등록하기</h2>

        {/* 부모 이름 연락처 입력 폼 추가 */}
        {/* <Label htmlFor="pname">부모님 이름</Label>
        <Input
          type="text"
          id="pname"
          name="pname"
          value={pname}
          onChange={(e) => setPname(e.target.value)}
        />

        <Label htmlFor="pphone">부모님 연락처</Label>
        <Input
          type="text"
          id="pphone"
          name="pphone"
          value={pphone}
          onChange={(e) => setPphone(e.target.value)}
        />

        <div>
          <p style={isParentExist ? { color: "green" } : { color: "red" }}>
            {parentExistMessage}
          </p>
        </div>
        <button variant="primary" onClick={findParent}>
          부모님 찾기
        </button> */}
        <p>
          <button variant="primary" onClick={submitJoin}>
            회원가입
          </button>
        </p>
      </Form>
    </StyledForm>
  );
};

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  border: 1px solid green;
  margin-bottom: 20px;
`;

const StyledForm = styled.div`
  /* padding: 50px; */
  width: 500px;
  border-radius: 30px;
  margin: 0 auto;
  /* background-color: white; */
  border: 1px solid blue;
`;

const Form = styled.form``;
const InputRow = styled.div`
  border: 1px solid orange;
`;
const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
`;
const Input = styled.input`
  all: unset;
  background-color: white;
  height: 40px;
  padding: 0 10px;
  width: 80%;
  border-radius: 5px;
`;
const CheckText = styled.div`
  margin-top: 5px;
  font-weight: bold;
`;

export default ParentRegisterForm;

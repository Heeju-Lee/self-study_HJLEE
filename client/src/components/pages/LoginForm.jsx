import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LogingedContext } from "../../App";
import styled from "styled-components";

const LoginForm = () => {
  let logingedCon = useContext(LogingedContext);
  const [member, setMember] = useState({
    username: "",
    password: "",
  });

  const navigator = useNavigate();

  const changeValue = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value,
    });
  };

  const handleFocus = (e) => {
    e.target.parentNode.parentNode.classList.add("focus");
  };

  const handleBlur = (e) => {
    if (e.target.value === "") {
      e.target.parentNode.parentNode.classList.remove("focus");
    }
  };

  const submitLogin = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: "http://localhost:9999/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(member),
    })
      .then((res) => {
        localStorage.setItem("memberNo", res.data.memberNo);
        localStorage.setItem("id", res.data.id);
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("Authorization", res.headers.authorization);

        logingedCon.onLoggedChange(true);
        navigator("/");
      })
      .catch(() => {
        alert("정보를 다시 확인해주세요.");
        setMember({ username: "", password: "" });
      });
  };

  return (
    <LoginFormContainer>
      <ImgContainer>
        <img src="images/donnyFamily.png" alt="Donny Family" />
      </ImgContainer>

      <LoginContent>
        <form onSubmit={submitLogin}>
          <h2 className="title">Welcome</h2>
          <div className="input-div one">
            <div className="i">
              <i className="fas fa-user"></i>
            </div>
            <div className="div">
              <h5>Username</h5>
              <input
                type="text"
                name="username"
                className="input"
                value={member.username}
                onChange={changeValue}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
          </div>
          <div className="input-div pass">
            <div className="i">
              <i className="fas fa-lock"></i>
            </div>
            <div className="div">
              <h5>Password</h5>
              <input
                type="password"
                name="password"
                className="input"
                value={member.password}
                onChange={changeValue}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
          </div>
          <input type="submit" className="btn" value="Login" />
        </form>
      </LoginContent>
    </LoginFormContainer>
  );
};

const LoginFormContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 50px;

  img {
    width: 500px;
    height: 500px;
  }
`;

const LoginContent = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  form {
    width: 360px;
  }

  h2 {
    margin: 15px 0;
    color: #333;
    text-transform: uppercase;
    font-size: 2.9rem;

    @media screen and (max-width: 1000px) {
      font-size: 2.4rem;
    }
  }

  .input-div {
    display: grid;
    grid-template-columns: 7% 93%;
    margin: 25px 0;
    padding: 5px 0;
    border-bottom: 2px solid #d9d9d9;

    .i {
      color: #d9d9d9;
      display: flex;
      justify-content: center;
      align-items: center;

      i {
        transition: 0.3s;
      }
    }

    .div {
      position: relative;
      height: 45px;

      h5 {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        color: #999;
        font-size: 18px;
        transition: 0.3s;
      }

      input {
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        background: none;
        padding: 0.5rem 0.7rem;
        font-size: 1.2rem;
        color: #555;
      }
    }
  }

  a {
    display: block;
    text-align: right;
    text-decoration: none;
    color: #999;
    font-size: 0.9rem;
    transition: 0.3s;

    &:hover {
      color: #38d39f;
    }
  }

  .btn {
    display: block;
    width: 100%;
    height: 50px;
    border-radius: 25px;
    border: none;
    background-image: linear-gradient(to right, #32be8f, #38d39f, #32be8f);
    background-size: 200%;
    font-size: 1.2rem;
    color: #fff;
    text-transform: uppercase;
    cursor: pointer;
    transition: 0.5s;

    &:hover {
      background-position: right;
    }
  }
`;

export default LoginForm;

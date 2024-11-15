import React, { useState } from 'react';
import axios from "axios";
import { Form, FormControl } from 'react-bootstrap';
import { Button } from "../../../commons/Button";
import styled from 'styled-components';

const SendMessage = () => {

    const [notificationData,setNotificationData] = useState({
        parentNum: 1, // 부모 ID : localStorage.getItem("parentNum")
        childNum: 1, // props로 받아와야 함.
        message: "",
        category: "feedback",
        senderType: "parent",
    });

    // message 변경 함수
    const changeMessage = (e) => {
        setNotificationData((prevData) => ({
            ...prevData,
            message: e.target.value
        }));
    };

    const sendMessage = (e) => {
        e.preventDefault(); // 버튼 클릭 시 페이지 새로고침 방지

        if (notificationData.message !== "") {
            axios({
                method: "POST",
                url: "http://localhost:9999/sendToChild",
                data: notificationData,
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IuuPhOuLiOunmCIsImlkIjoia29zdGEiLCJyb2xlIjoiUk9MRV9QQVJFTlQiLCJtZW1iZXJObyI6MSwiaWF0IjoxNzMxNTUwNTI2LCJleHAiOjE3MzE2MzY5MjZ9.eitJCVsHSV6afm7R-JpxKafiIc8aIk6cESXcLjxRXng`
                },
            })
            .then((res) => {
                console.log(res);
                alert("아이에게 메세지 전송완료!")
            })
            .catch((err) => {
                alert("메세지 전송 실패");
                console.log(notificationData);
            });
        } else {
            alert("메세지를 입력해주세요.");
        }
    };
    return (
        <>        
            <ContainAll>
                <ContainContent>
                {/* 부모 메세지 전달 */}
                <Title>✉️아이에게 한마디</Title>
                <Form onSubmit={sendMessage}>
                    <FormControl 
                        as="textarea" 
                        rows={3} 
                        id="message" 
                        name="message" 
                        value={notificationData.message} 
                        onChange={changeMessage} 
                        placeholder="이번달에 아이에게 하고싶은 말을 담아주세요" 
                    />
                    <ButtonLocation onClick={sendMessage}>
                        <Button type="submit" text="아이에게 메세지 전송" width="200px" />
                    </ButtonLocation>
                </Form> 
                </ContainContent>
            </ContainAll>  
        </>
    );
};

const ContainAll = styled.div`
    margin: 0 auto;
    width:100%;
`
const ContainContent = styled.div`
    background-color: rgb(245, 245, 245);
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin: 0px 20px;
`

const Title = styled.div`
    font-size: 30px;
    margin: 0 auto;
    margin: 20px 0px;
`
const ButtonLocation = styled.div`
    margin: 0 auto;
    width: fit-content;
    height: fit-content;
`


export default SendMessage;
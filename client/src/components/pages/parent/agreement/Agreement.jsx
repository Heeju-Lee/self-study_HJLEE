import React, { useState } from 'react';
import styled from 'styled-components';

const Agreement = () => {

    const [childName, setChildName] = useState('');
    const [amount, setAmount] = useState('');
    const [terms, setTerms] = useState('');
    const [contractDate, setContractDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`계약서가 작성되었습니다!\n아이: ${childName}\n금액: ${amount}원\n약속: ${terms}\n계약일: ${contractDate}`);
    };

    const [contractData, setContractData] = useState({
        childName: '도니', 
        categories: [
            { name: '식비', amount: 50000 },
            { name: '교통', amount: 20000 },
            { name: '쇼핑', amount: 30000 },
            { name: '편의점', amount: 10000 },
            { name: '저축', amount: 15000 },
            { name: '기타', amount: 25000 },
        ],
        totalAmount: 155000,  // 총 금액
        contractDate: '2024-11-01',  // 계약 날짜
    });

    const handlePayment = () => {
        alert('결제가 완료되었습니다!');
    };

    return (
      <Outer>
        <Container>
            <ContractTitle>용돈 계약서</ContractTitle>
            <ContractSubTitle>{contractData.childName}의 용돈 계획을 확인하세요!</ContractSubTitle>
            
            <ContractDetails>
                <DetailRow>
                    <Label>아이 이름:</Label>
                    <Value>{contractData.childName}</Value>
                </DetailRow>
                <DetailRow>
                    <Label>계약 날짜:</Label>
                    <Value>{contractData.contractDate}</Value>
                </DetailRow>

                <CategoryList>
                    {contractData.categories.map((category, index) => (
                        <CategoryRow key={index}>
                            <Category>{category.name}</Category>
                            <Amount>{category.amount.toLocaleString()} 원</Amount>
                        </CategoryRow>
                    ))}
                </CategoryList>

                <TotalAmount>
                    <TotalText>총 용돈 금액 : </TotalText>
                    <TotalPrice>{contractData.totalAmount.toLocaleString()} 원</TotalPrice>
                </TotalAmount>
                <Sign>
                    <Label>부모 서명: </Label>
                    <Stamp>{localStorage.getItem("name")}</Stamp>
                    <br></br>
                    <Label>아이 서명: </Label>
                    <Stamp>{contractData.childName}</Stamp>
                </Sign>
            </ContractDetails>

            <ButtonWrapper>
                <Button onClick={handlePayment}>결제하기</Button>
            </ButtonWrapper>
        </Container>
      </Outer> 
    );
};

export default Agreement;

const Outer = styled.div`
  border : solid 2px;
  border-radius: 15px;
  background-color: lightgray;

`;

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 50px auto;
  background-color: #f6f2fd;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ContractTitle = styled.h1`
  color: #8529fd;
  font-size: 40px;
  margin-bottom: 10px;
`;

const ContractSubTitle = styled.h3`
  font-family: 'HakgyoansimDunggeunmisoTTF-R';
  color: #7f56e7;
  font-size: 20px;
  margin-bottom: 20px;
`;

const ContractDetails = styled.div`
  text-align: left;
  margin-bottom: 30px;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  font-size: 20px;
`;

const Label = styled.span`
  font-weight: 600;
  color: #5b2b7d;
`;

const Value = styled.span`
  color: #9b59b6;
`;

const Stamp = styled.div`
  text-align: right;
  color: black;
  background-image: url('images/stamp.png');
  background-size: contain; 
  background-repeat: no-repeat; 
  background-position: center; 
  padding: 10px; 
  display: inline-block;
`;

const CategoryList = styled.div`
  margin-top: 20px;
`;

const CategoryRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #ddd;
`;

const Category = styled.span`
  font-weight: 600;
  color: #8529fd;
`;

const Amount = styled.span`
  color: #5b2b7d;
`;

const TotalAmount = styled.div`
  margin-top: 20px;
  font-size: 20px;
  font-weight: 600;
  text-align: right;
  color: #8529fd;
`;

const TotalText = styled.span`
  color: #5b2b7d;
  font-size: 1.1rem;
`;

const TotalPrice = styled.span`
  color: #7f56e7;
  font-size: 20px;
`;

const ButtonWrapper = styled.div`
  margin-top: 20px;
`;

const Sign = styled.div`
  margin-top: 20px;
  text-align: right;

  
`;

const Button = styled.button`
  background-color: #8529fd;
  color: white;
  padding: 12px 25px;
  font-size: 20px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    background-color: #7f56e7;
  }
`;

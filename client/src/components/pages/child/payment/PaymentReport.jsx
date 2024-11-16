import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const PaymentReport = () => {
    const token = localStorage.getItem("Authorization");
    const [point, setPoint] = useState(null);
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [monthList, setMonthList] = useState([]);
    const [paymentChart, setPaymentChart] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    // 내 포인트 가져오기
    const showPoint = () => {
        axios.get('children/get/point', {
            headers: {
                Authorization: localStorage.getItem("Authorization")
            }
        })
        .then((res) => {
            console.log(res);
            setPoint(res.data);
        })
        .catch((err) => {
            console.log("point 조회 중 에러 발생", err);
        });
    };

    // 이번 달 내가 쓴 돈 가져오기
    const showMonthList = () => {
        axios.get('children/payments', {
            params: {
                year: year,
                month: month,
            },
            headers: {
                Authorization: localStorage.getItem("Authorization")
            }
        })
        .then((res) => {
            console.log(res.data);
            setMonthList(res.data);  // 데이터를 상태에 저장
        })
        .catch((err) => {
            console.log("소비 내역 조회 중 에러 발생", err);
        });
    };

    // 이번 달 내가 쓴 돈 가져오기
    const showPaymentChart = () => {
        axios.get('children/payments/chart', {
            params: {
                year: year,
                month: month,
            },
            headers: {
                Authorization: localStorage.getItem("Authorization")
            }
        })
        .then((res) => {
            console.log(res.data);
            setPaymentChart(res.data);  // 데이터를 상태에 저장
        })
        .catch((err) => {
            console.log("소비 차트 조회 중 에러 발생", err);
        });
    };

    // 날짜 배열을 YYYY-MM-DD 형태로 변환하는 함수
    const formatDate = (dateArray) => {
        if (dateArray && dateArray.length === 3) {
            const [year, month, day] = dateArray;
            return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        }
        return '';
    };

    // 금액을 천 단위로 포맷하는 함수
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('ko-KR').format(amount);
    };

    // 총합 계산 함수
    const calculateTotalAmount = (list) => {
        const total = list.reduce((sum, item) => sum + item.paymentAmt, 0);
        setTotalAmount(total);  // 총합 상태 업데이트
    };

    // monthList 변경 시 총합 계산
    useEffect(() => {
        if (monthList.length > 0) {
            calculateTotalAmount(monthList);  // 총합 계산
        }
    }, [monthList]);  // monthList가 변경될 때마다 실행

    useEffect(() => {
        showPoint();
        showMonthList();
    }, []);

    return (
        <Outer>
            <MainSection>
                <h2>내 포인트: {point !== null ? formatCurrency(point) : '로딩 중...'}</h2>  {/* 포인트 데이터 표시 */}
                <Button onClick={showMonthList}>내가 쓴 돈 보기</Button>
                <Button onClick={showPaymentChart}>리포트 보기</Button>
            </MainSection>

            {/* 내가 쓴 돈 목록을 표로 출력 */}
            <Payment>
                {monthList.length === 0 ? (
                    <p>소비 내역을 불러오는 중...</p>
                ) : (
                    <MonthPayment>
                        <Title><span style={{color: "#8529fd"}}>{month}월</span> 내가 쓴 돈 </Title>
                        <TotalPrice>총합 : <Price>{formatCurrency(totalAmount)}</Price>원</TotalPrice>
                        <Table >
                            <thead>
                                <TableRow>
                                    <TableHeader>카테고리</TableHeader>
                                    <TableHeader>날짜</TableHeader>
                                    <TableHeader>상호명</TableHeader>
                                    <TableHeader>금액</TableHeader>
                                </TableRow>
                            </thead>
                            <tbody>
                                {monthList.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableData><img src = {`icons/${item.category}.png`} alt="category icon" /></TableData>
                                        <TableData>{formatDate(item.createdAt)}</TableData>
                                        <TableData>{item.storeName}</TableData>
                                        <TableData><Price>{formatCurrency(item.paymentAmt)}</Price>원</TableData>
                                    </TableRow>
                                ))}
                            </tbody>
                        </Table>
                    </MonthPayment>
                )}
            </Payment>

             {/* 내가 쓴 돈 목록을 표로 출력 */}
             <Report>
                {/* <h3>소비내역 리포트</h3> */}
             </Report>

        </Outer>
    );
};

export default PaymentReport;


const Outer = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  /* padding: 20px; */
`;

const MainSection =styled.div`
    width: 100%;
    text-align: left; 
    margin-bottom: 20px;
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

const Payment = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
`;

const MonthPayment = styled.div`
  width: 70%;
  text-align: center;
  margin : 30px 0px;
`;

const Title = styled.div`
    font-size: 40px;
`;


const TotalPrice = styled.div`
  font-size: 20px;
  text-align: right;
  margin: 10px;
`;

const Price = styled.span`
  font-weight: bold;
  color: #2a9d8f;
`;

const Table = styled.table`
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
  text-align: center;
  border: 1px solid #ddd;
`;


const TableHeader = styled.th`
    background-color: #8529fd;
    color: white;
    padding: 12px;
    font-size: 25px;
    text-transform: uppercase;
`;


const TableRow = styled.tr`
    &:nth-child(even) {
    background-color: #f3f3f3;
    }
`;

const TableData = styled.td`
    padding: 10px;
    border-bottom: 1px solid #ddd;
    font-family: 'HakgyoansimDunggeunmisoTTF-R';
    font-size: 20px;
    img{
        width : 100px;
    }
`;    

const Report = styled.div`
  margin-top: 30px;
  text-align: center;
`;


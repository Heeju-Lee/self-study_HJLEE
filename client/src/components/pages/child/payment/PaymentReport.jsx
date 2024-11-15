import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
                Authorization: `${token}`
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
                Authorization: `${token}`
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
                Authorization:`${token}`
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
        <div>
            <h2>내 포인트: {point !== null ? formatCurrency(point) : '로딩 중...'}</h2>  {/* 포인트 데이터 표시 */}

            <button onClick={showMonthList}>내가 쓴 돈 보기</button>
            <button onClick={showPaymentChart}>리포트 보기</button>

            {/* 내가 쓴 돈 목록을 표로 출력 */}
            <h3>내 소비 내역</h3>
            {monthList.length === 0 ? (
                <p>소비 내역을 불러오는 중...</p>
            ) : (
                <>
                <h3>이번 달 내가 쓴 돈 총합: {formatCurrency(totalAmount)}원</h3>
                <table border="1" cellPadding="10">
                    <thead>
                        <tr>
                            <th>날짜</th>
                            <th>카드 번호</th>
                            <th>상호명</th>
                            <th>금액</th>
                            <th>카테고리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {monthList.map((item, index) => (
                            <tr key={index}>
                                <td>{formatDate(item.createdAt)}</td>
                                <td>{item.cardNum}</td>
                                <td>{item.storeName}</td>
                                <td>{formatCurrency(item.paymentAmt)}원</td>
                                <td>{item.category}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </>
            )}

             {/* 내가 쓴 돈 목록을 표로 출력 */}
             <h3>소비내역 리포트</h3>

        </div>
    );
};

export default PaymentReport;

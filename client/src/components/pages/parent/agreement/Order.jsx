import React from 'react';
import styled from 'styled-components';

const Order = () => {

    const payments = [
        { id: 1, date: '2024-11-01', payType: '카드', amount: 50000, status: '완료' },
        { id: 2, date: '2024-11-05', payType: '계좌 이체', amount: 30000, status: '취소' },
        { id: 3, date: '2024-11-07', payType: '카드', amount: 10000, status: '완료' },
    ];

    return (
        <Outer>
            <Title>결제 내역</Title>
            <Container>
                <Table>
                    <thead>
                        <TableRow>
                            <TableHeader>번호</TableHeader>
                            <TableHeader>날짜</TableHeader>
                            <TableHeader>카테고리</TableHeader>
                            <TableHeader>금액</TableHeader>
                            <TableHeader>상태</TableHeader>
                        </TableRow>
                    </thead>
                    <tbody>
                        {payments.map((payment) => (
                            <TableRow key={payment.id}>
                                <TableData>{payment.id}</TableData>
                                <TableData>{payment.date}</TableData>
                                <TableData>{payment.payType}</TableData>
                                <TableData>{payment.amount.toLocaleString()} 원</TableData>
                                <TableData status={payment.status}>
                                    {payment.status}
                                </TableData>
                            </TableRow>
                        ))}
                    </tbody>
                </Table>            
            </Container>
        </Outer>
    );
};

export default Order;

const Outer = styled.div`
    width: 100%;
    margin: 100px 0px;

`;
const Title = styled.h1`
    text-align: left;
    color: #5b2b7d;
    font-size: 40px;
`;

const Container = styled.div`
    max-width: 100%;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    font-size: 20px;

    text-align: center;
`;

const TableRow = styled.tr`

    &:nth-child(even) {
    background-color: #f3f3f3;
    }
 `;

const TableHeader = styled.th`
    background-color: #7f56e7;
    color: white;
    padding: 12px;
    font-size: 20px;
    text-transform: uppercase;
 `;

const TableData = styled.td`
    padding: 10px;
    border-bottom: 1px solid #ddd;
    font-family: 'HakgyoansimDunggeunmisoTTF-R';
    color: ${(props) => (props.status === '완료' ? 'blue' : props.status === '취소' ? 'red' : 'black')};
 `;
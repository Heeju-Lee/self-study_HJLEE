import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {

    const navigate = useNavigate();

    const checkPlanAndNavigate = async () => {
        try {
            const response = await axios.get('http://localhost:9999/plans/1');
            if (response.data) {
                // 데이터가 있을 경우 PlanForm으로 이동
                navigate('/planPage');
            } else {
                // 데이터가 없을 경우 SaveForm으로 이동
                navigate('/planPage'); // SaveForm을 보여줄 경로
            }
        } catch (error) {
            console.error("Error fetching plan:", error);
            navigate('/saveForm'); // 오류 발생 시에도 PlanForm으로 이동
        }
    };

    return (
        <div>     
        <Navbar bg="primary" data-bs-theme="dark">
            <Container>
                <Link to="/" className="navbar-brand">Home</Link>
                <Nav className="me-auto">
                <Link className="nav-link" to="#" onClick={checkPlanAndNavigate}>소비계획세우기</Link>
                    <Link className="nav-link" to="/joinForm">교육</Link>
                    <Link className="nav-link" to="/loginForm">위시리스트</Link>
                </Nav>
            </Container>
        </Navbar>
        </div>
    );
};

export default Header;

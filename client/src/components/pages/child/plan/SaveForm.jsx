import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';

const SaveForm = () => {
    const [plan, setPlan] = useState({
        shopping: '',
        transport: '',
        cvs: '',
        food: '',
        others: '',
        saving: '',
        date: new Date().toISOString().split('T')[0],
    });

    const changeForm = (e) => {
        setPlan({
            ...plan,
            [e.target.name]: e.target.value,
        });
    };

    const navigate = useNavigate();

    const submitPlan = (e) => {
        e.preventDefault();

        axios({
            url: 'http://localhost:9999/plans/1',
            method: 'post',
            data: plan,
        })
            .then((res) => {
                console.log(res.data);
                if (res.status === 200) {
                    alert('부모님께 소비내역 전달 완료~!!');
                    navigate('/planPage');
                }
            })
            .catch((err) => {
                console.log(err);
                alert('오류가 발생했습니다. 다시 시도해 주세요.');
            });
    };
// ---------------여기는   
    const Container = styled.div`
        background-color: #886eff;
        min-height: 80vh;
        width: 80vh;
        border-radius: 30px;
        margin: -10px 0 50px 40px;
        border: 5px solid #c8bef3;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column
        align-items: center;
        justify-content: center;
    `;
    const Title = styled.h3`
        color: white;
        text-align: center;
        padding-top: 50px;
        font-weight: bold;
    `;

    const data = [
        parseFloat(plan.shopping) || 80,
        parseFloat(plan.transport) || 10,
        parseFloat(plan.cvs) || 10,
        parseFloat(plan.food) || 10,
        parseFloat(plan.others) || 10,
        parseFloat(plan.saving) || 10,
    ];

    const total = data.reduce((sum, value) => sum + value, 0);
    let startAngle = 0;

    const colors = ['#4CAF50', '#FF9800', '#2196F3', '#FF5722', '#FFC107', '#9C27B0'];

    function DonutSegment({ startAngle, endAngle, color }) {
        const angle = endAngle - startAngle;
        const geometry = new THREE.TorusGeometry(1, 0.4, 16, 100, angle);

        return (
            <mesh geometry={geometry} rotation={[0, 0, startAngle]}>
                <meshStandardMaterial color={color} />
            </mesh>
        );
    }

    return (
        <Container>
            <Title>내 계획 미리보기</Title>
            <Canvas camera={{ position: [0, 0, 5] }} style={{ width: '100%', height: '100%' }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} />

                {data.map((value, index) => {
                    const angle = (value / total) * Math.PI * 2;
                    const segment = (
                        <DonutSegment
                            key={index}
                            startAngle={startAngle}
                            endAngle={startAngle + angle}
                            color={colors[index % colors.length]}
                        />
                    );
                    startAngle += angle;
                    return segment;
                })}
            </Canvas>

        </Container>
    );
};

export default SaveForm;

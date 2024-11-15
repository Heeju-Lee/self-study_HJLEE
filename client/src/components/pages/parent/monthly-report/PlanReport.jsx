import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Bar, Radar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    // scales,
    // ChartOptions,
    RadialLinearScale,
    PointElement,
    LineElement,
    // elements,
    // Scale,
    Filler,
    Ticks
} from 'chart.js';
import styled from 'styled-components';
import {formatCurrency} from '../../../../services/GlobalFunction';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    RadialLinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Filler// Radar 선들의 안쪽을 채우기 위한 register
);

const PlanReport = () => {
    // 정보를 불러오기 위함
    const [childNum, setChildNum] = useState(1);// props로 받아야함.
    const [year, setYear] = useState(new Date().getFullYear()); // props로 받아야함.
    const [month, setMonth] = useState(new Date().getMonth()+1); // 1월이 0이라 add 1
    const [reportData, setReportData] = useState({
        chartPayment: {},   // 초기값을 빈 객체로 설정해야 함.
        monthPlan: {},
        showQuizResult: {},
        showQuizResultTop3: {}
    });

    // plan vs Aatual Chart 1 & Analysis Data Extraction
    // Plan 해당 Map 추출
    const monthPlan = reportData.monthPlan;
    console.log(monthPlan);
    // Plan 해당 Map에서 카테고리 추출
    const monthPlanCategories = Object.keys(monthPlan);
    console.log(monthPlanCategories);          

    // Actual 해당 Map 추출
    const chartPayment = reportData.chartPayment;
    console.log(chartPayment);

    //Chart 2) 퀴즈 결과 Map 추출
    const showQuizResult = reportData.showQuizResult;
    //Chart 2) 퀴즈 결과 해당 Map에서 카테고리 및 값 추출
    const showQuizResultCategories = Object.keys(showQuizResult);
    const categoryTranslation  = {
        "qGoverment": "정부",
        "qExchangeRate": "환율",
        "qInvestment": "투자",
        "qWord": "경제용어",
        "qHistory": "경제역사",
    }
    const convertQuizCategory = showQuizResultCategories.map(category => categoryTranslation[category] || category);

    const showQuizResultValues = Object.values(showQuizResult);
    console.log(showQuizResultCategories);
    console.log(showQuizResultValues);

    const showQuizResultTop3 = reportData.showQuizResultTop3;
    console.log(showQuizResultTop3);

    // childNum, year, month가 변경될 때마다 호출
    useEffect(() => {
        const fetchChildReport = async () => {
            try {
                const response = await axios.get("http://localhost:9999/parents/reports", 
                    {
                    params: {
                        childNum: childNum,
                        year: year,
                        month: month
                    },
                    headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IuuPhOuLiOunmCIsImlkIjoia29zdGEiLCJyb2xlIjoiUk9MRV9QQVJFTlQiLCJtZW1iZXJObyI6MSwiaWF0IjoxNzMxNTUwNTI2LCJleHAiOjE3MzE2MzY5MjZ9.eitJCVsHSV6afm7R-JpxKafiIc8aIk6cESXcLjxRXng`
                    }
                });
                setReportData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching child report:", error);
            }
        };
         fetchChildReport();
    }, [childNum, year, month]
);

    // Chart1 ) 각 카테고리별로 바 차트 데이터 생성
    const planVerseActual = (category) => {
        return {
            labels: [category], // 해당 카테고리만 사용
            datasets: [
                {
                    label: '계획',
                    data: [monthPlan[category] || 0], // 해당 카테고리의 계획값
                    backgroundColor: 'rgb(217, 194, 255)'
                },
                {
                    label: '지출',
                    data: [chartPayment[category] || 0], // 해당 카테고리의 실제값[true||false]
                    backgroundColor: 'rgb(89, 0, 241)'
                }
            ]
        };
    };

    // Chart1 ) bar 차트 옵션
    const options1 = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    // 툴팁 내용만 표시 (축 레이블 안보이게 하기)
                    title: function() {
                        return ''; // 제목(카테고리 이름) 없애기
                    },
                    label: function(tooltipItem) {
                        return tooltipItem.dataset.label + ': ' + formatCurrency(tooltipItem.raw) + ' 원'; // 데이터 값만 표시
                    },
                },
            },
        },
        scales: {
            y: {
                display: false, // Y축 표시를 안함
                grid: {
                    display: false, // Y축 그리드 라인 제거
                },
                ticks: {
                    display: false, // Y축 틱 제거
                },
            },
            x: {
                display: false, // X축 표시를 안함
                grid: {
                    display: true, // X축 그리드 라인 제거
                    borderWidth: 1,
                },
                ticks: {
                    display: false, // X축 틱 제거
                },
            },
        },
        elements: {
            bar: {
                borderWidth: 0,
            },
        },
    }

    // Chart2 ) 방사형 데이터 생성
    const showQuizResultChart = (categories, values) => {
        return {
            labels: categories,  // 카테고리명 배열
            datasets: [
                {
                    label: '퀴즈 성취도', // 레이블
                    data: values, // 각 카테고리의 값

                    //선
                    borderColor: 'rgb(89, 0, 241)',  // 경계선 색
                    borderWidth: 3,

                    //선 안쪽
                    fill: true,  // 안쪽을 채움
                    backgroundColor: '#b488ff49',  // 배경색 (투명도 추가)
                    
                    //point 
                    pointBorderWidth: 3,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: 'rgb(93, 0, 255)',
                    hoverBorderWidth: 5,

                }
            ]
        };
    };

    // Chart2 ) 방사형 데이터 옵션
    const options2 = {
        responsive: true,
        scales: {
            r: {
                pointLabels:{ // 각각의 라벨 폰트 & 색상
                    font: {
                        size: 30,
                    },
                    color: "rgb(127, 0, 253)",
                },
                scale:{
                    beginAtZero: true,
                    stepSize: 2,
                },
                angleLines: {
                    display: false  // 각도 선을 표시하지 않음
                },
                suggestedMax: Math.max(...showQuizResultValues) +2 // 최대값 동적 설정
            }
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <>
        <ContainAll>
            {/* Chart1 :: 카테고리별 계획 vs 소비 차트 생성 */}
            <Container>
                <h1>계획대비 소비현황</h1>
                <ChartGrid>
                    {monthPlanCategories.map((category, index) => (
                        <div> 
                            <ChartItem key={index}>
                                <Chart1Icon>
                                    {category === "shopping" && <><img src='/icons/shopping.png' alt='icon' /> <p>쇼핑</p></>}
                                    {category === "food" && <><img src='/icons/food.png' alt='icon'/> <p>식비</p></>}
                                    {category === "transport" && <><img src='/icons/transport.png' alt='icon'/> <p>교통</p></>}
                                    {category === "cvs" && <><img src='/icons/cvs.png' alt='icon'/> <p>편의점</p></>}
                                    {category === "saving" && <><img src='/icons/saving.png' alt='icon'/>  <p>저축</p></>}
                                    {category === "others" && <><img src='/icons/others.png' alt='icon'/> <p>기타</p></>}
                                </Chart1Icon>
                                <Chart1Bar>
                                    <Bar data={planVerseActual(category)} options={options1} />
                                </Chart1Bar>
                            </ChartItem>    
                        </div>
                        ))}
                </ChartGrid>
            </Container>
            {/* Chart1 :: 소비 총액 분석 */}
            <Container>
                <h1>카테고리별 소비금액 분석</h1>
                <ChartItem>
                    {Object.keys(chartPayment).map((category, idx) => (
                    <div key={idx}>
                        <ul>
                            <li>
                                {category === "shopping" && <><span>쇼핑</span></>}
                                {category === "food" && <><span>식비</span></>}
                                {category === "transport" && <><span>교통</span></>}
                                {category === "cvs" && <><span>편의점</span></>}
                                {category === "saving" && <><span>저축</span></>}
                                {category === "others" && <><span>기타</span></>}
                                <span>{formatCurrency(chartPayment[category])}원</span> {/* 카테고리 이름에 대응하는 값을 출력 */}
                            </li>   
                        </ul>
                    </div>
                ))}
                </ChartItem>
            </Container>
            {/* Chart2 :: 퀴즈 성취도 Top3 분석 */}
            <Container>
                <h1>우리아이 퀴즈 Top3</h1>
                <ChartItem>
                    <h4>카테고리별 정답개수</h4>
                    {Object.keys(showQuizResultTop3).map((category, idx) => (
                <   div key={idx}>
                        {category === "qGoverment" && <><span>정부</span></>}
                        {category === "qExchangeRate" && <><span>환율</span></>}
                        {category === "qInvestment" && <><span>투자</span></>}
                        {category === "qWord" && <><span>경제용어</span></>}
                        {category === "qHistory" && <><span>경제역사</span></>}
                        {""}
                        <span>{showQuizResultTop3[category]}개</span> {/* 카테고리 이름에 대응하는 값을 출력 */}
                    </div>
                ))}
               </ChartItem>
            </Container>
            <Container>
                {/* 교육 성취도 방사형 차트 생성 */}
                <h1>퀴즈 성취도 방사형 차트</h1>
                <ChartItem>
                    {showQuizResultCategories.length > 0 && showQuizResultValues.length > 0 ? (
                        <Radar
                            data={showQuizResultChart(convertQuizCategory, showQuizResultValues)} // 카테고리와 값 전달
                            options={options2}  // 옵션 전달
                        />
                    ) : (
                        <p>아이가 아직 퀴즈를 풀지 않았습니다.</p>  // 데이터가 없을 경우 메시지 출력
                    )}
                </ChartItem>
            </Container>    
        </ContainAll> 
        </>
    );
};

// 전체 flex 하기위한 div
const ContainAll = styled.div`
    display: flex;
    flex-wrap: wrap;
`

// 모든 styledComponents width :50% 설정
const Container = styled.div`
    width: 50%;
    margin-top: 50px;
    padding: 10px;
`

// 2x3 배열을 위한 Grid 스타일
const ChartGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 3개의 컬럼으로 나누기 */
    gap: 20px;
`;

// 각 아이템에 대한 스타일
const ChartItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    background-color: #f8f8f8;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Chart1Icon = styled.div`
    width: 30%;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    
    img {
        max-width: 100%;  /* 부모 div 너비를 초과하지 않도록 제한 */
        height: auto;     /* 비율에 맞게 높이 자동 조정 */
    }
    p {
        font-size: 14px;
        text-align: center;
        margin-bottom: 0px;
    }
    `


const Chart1Bar = styled.div`
    box-sizing: border-box;
    width: 70%;
`

export default PlanReport;
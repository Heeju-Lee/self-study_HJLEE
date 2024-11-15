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
import SelectOptionNav from '../SelectOptionNav' // SelectOptionNav 컴포넌트 임포트

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

const PlanReport = ({childNum, year,month}) => {

    const token = localStorage.getItem("Authorization");
    // 정보를 불러오기 위함
    // const [childNum, setChildNum] = useState(1);// props로 받아야함.
    // const [year, setYear] = useState(new Date().getFullYear()); // props로 받아야함.
    // const [month, setMonth] = useState(new Date().getMonth()+1); // 1월이 0이라 add 1
    const [reportData, setReportData] = useState({
        chartPayment: {},   // 초기값을 빈 객체로 설정해야 함.
        monthPlan: {},
        showQuizResult: {},
        showQuizResultTop3: {}
    });

    const [loading, setLoading] = useState(false); // 로딩 상태 추가
    const [dataFetched, setDataFetched] = useState(false); // 데이터가 이미 로드되었는지 확인


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
        "qWord": "단어",
        "qHistory": "역사",
    }
    const convertQuizCategory = showQuizResultCategories.map(category => categoryTranslation[category] || category);

    const showQuizResultValues = Object.values(showQuizResult);
    console.log(showQuizResultCategories);
    console.log(showQuizResultValues);

    const showQuizResultTop3 = reportData.showQuizResultTop3;
    console.log(showQuizResultTop3);

    // childNum, year, month가 변경될 때마다 호출
    useEffect(() => {
        console.log(">>>>>>>>>>>>>>>>>>>>>>",{year,month});
        const fetchChildReport = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:9999/parents/reports", 
                    {
                    params: {
                        childNum: childNum,
                        year: year,
                        month: month,
                    },
                    headers: {
                        Authorization: `${token}`  // 토큰 앞에 "Bearer "를 추가
                    }
                });

                setReportData(response.data);
                console.log(response.data);
            } catch (error) {
                if (error.response) {
                    // 서버 응답에서 오류 메시지 확인
                    console.log("Error response:", error.response.data);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchChildReport();
    }, [childNum, year, month, dataFetched, token]);

    // Chart1 ) 각 카테고리별로 바 차트 데이터 생성
    const planVerseActual = (category) => {
        return {
            labels: [category], // 해당 카테고리만 사용
            datasets: [
                {
                    label: '계획',
                    data: [monthPlan[category] || 0], // 해당 카테고리의 계획값
                    backgroundColor: 'rgb(0, 122, 255)'
                },
                {
                    label: '지출',
                    data: [chartPayment[category] || 0], // 해당 카테고리의 실제값[true||false]
                    backgroundColor: 'rgb(255, 99, 132)'
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
                    borderColor: '#7FB5B5',  // 경계선 색
                    borderWidth: 3,

                    //선 안쪽
                    fill: true,  // 안쪽을 채움
                    backgroundColor: 'rgba(127, 181, 181, 0.264)',  // 배경색 (투명도 추가)
                    
                    //point 
                    pointBorderWidth: 3,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#7FB5B5',
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
                        size: 15,
                        family: 'HakgyoansimDunggeunmisoTTF',  // 글씨체 설정
                        weight: 'bold',  // 글씨체 두께
                        style: 'normal'  // 글씨 스타일
                    },
                    color: "#2F4F4F",
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
        <h2>아이 {childNum}의 {year}년 {month}월 리포트</h2>
        <ContainAll>
            {/* SelectOptionNav 컴포넌트에 값 전달 */}
            {/* Chart1 :: 카테고리별 계획 vs 소비 차트 생성 📊📈📉✏️🎓*/}
            <ContainContent>
                <Title>
                    <PlanColor>📊계획</PlanColor>대비 <PayedColor>소비</PayedColor>현황
                </Title>
                <ContainChart>
                    <ChartGrid>
                        {monthPlanCategories.map((category, index) => (
                            <div> 
                                <ChartItem key={index}>
                                    <Chart1Icon>
                                        {category === "shopping" && <><img src='/icons/shopping.png' alt='icon'/> <p>쇼핑</p></>}
                                        {category === "food" && <><img src='/icons/food.png' alt='icon'/> <p>식비</p></>}
                                        {category === "transport" && <><img src='/icons/transport.png' alt='icon'/> <p>교통</p></>}
                                        {category === "cvs" && <><img src='/icons/cvs.png' alt='icon'/> <p>편의점</p></>}
                                        {category === "saving" && <><img src='/icons/saving.png' alt='icon'/>  <p>저축</p></>}
                                        {category === "others" && <><img src='/icons/others.png' alt='icon'/> <p>기타</p></>}
                                    </Chart1Icon>
                                    <Chart1BarAll>
                                        <Bar data={planVerseActual(category)} options={options1} />
                                    </Chart1BarAll>
                                </ChartItem>    
                            </div>
                            ))}
                    </ChartGrid>
                </ContainChart>
            </ContainContent>
            <ContainContent>
                {/* 교육 성취도 방사형 차트 생성 */}
                <Title>
                    <p>🎓우리아이 <AchivementColor>교육 성취도</AchivementColor></p>
                </Title>
                    <ContainChart>
                        <Chart2Radar>
                            {showQuizResultCategories.length > 0 && showQuizResultValues.length > 0 ? (
                                <Radar
                                    data={showQuizResultChart(convertQuizCategory, showQuizResultValues)} // 카테고리와 값 전달
                                    options={options2}  // 옵션 전달
                                />
                            ) : (
                                <p>아이가 아직 퀴즈를 풀지 않았습니다.</p>  // 데이터가 없을 경우 메시지 출력
                            )}
                        </Chart2Radar>
                    </ContainChart>
            </ContainContent>  
        </ContainAll> 
        </>
    );
};

// 전체 flex 하기위한 div
const ContainAll = styled.div`
    display: flex;
    justify-content: space-around;
    border-radius: 10px;
    margin: 30px 0px;
    height: 500px;
    @font-face {
    font-family: 'HakgyoansimDunggeunmisoTTF-B';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimDunggeunmisoTTF-B.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
  }
`
const ContainContent = styled.div`
    width: 50%;
    background-color: rgb(245, 245, 245);
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin: 0px 20px;
    align-items: center;
    box-sizing: border-box;
    height: 600px;
`
const ContainChart = styled.div`
    border-radius: 10px;
   // box-shadow: 0 0 10px rgb(239, 0, 0);
    margin: 0px 20px;
    box-sizing: border-box;
`

const Title = styled.div`
    font-size: 30px;
    margin: 0 auto;
`
const PlanColor = styled.span`
    color: rgb(0, 122, 255);
`

const PayedColor = styled.span`
    color: rgb(255, 99, 132);
`

const AchivementColor = styled.span`
    color: hsl(180, 72.18543046357615%, 29.607843137254903%);
`

// 2x3 배열을 위한 Grid 스타일
const ChartGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 3개의 컬럼으로 나누기 */
    gap: 20px;
    height: fit-content;
    box-sizing: border-box;
    margin: 10px 0px;
`;

// 각 아이템에 대한 스타일
const ChartItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding: 20px 20px;
    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    height: 100%;
`;

const Chart1Icon = styled.div`
    width: 60%;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    
    img {
        max-width: 100%;  /* 부모 div 너비를 초과하지 않도록 제한 */
        height: 100%;     /* 비율에 맞게 높이 자동 조정 */
    }
    p {
        font-size: 14px;
        text-align: center;
        margin-bottom: 0px;

    }
    `
const Chart1BarAll = styled.div`
    box-sizing: border-box;
    width: 70%;
`
const Chart2Radar = styled.div`
    box-sizing: border-box;
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: rgb(255, 255, 255);
    margin: 0px 20px;
    margin: 0 auto;

    canvas {
        box-sizing: border-box;
        margin: 0 auto;
    }
    `
export default PlanReport;


            {/* Chart1 :: 소비 총액 분석 */}
            {/* <Container2>
                <h1>카테고리별 소비금액 분석</h1>
                
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
                                <span>{formatCurrency(chartPayment[category])}원</span> 
                            </li>   
                        </ul>
                    </div>
                ))}
            </Container2> */}
            {/* Chart2 :: 퀴즈 성취도 Top3 분석 */}
            {/* <Container2>
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
                        <span>{showQuizResultTop3[category]}개</span> 
                    </div>
                ))}
               </ChartItem>
            </Container2> 
            const Container2 = styled.div`
            width: 50%;
            margin-top: 50px;
            padding: 10px;
            height: 450px;
            `
            // 모든 styledComponents width :50% 설정
            const Container1 = styled.div`
                width: 50%;
                margin-top: 50px;
                padding: 10px;
                height: 450px;
            `

            */}
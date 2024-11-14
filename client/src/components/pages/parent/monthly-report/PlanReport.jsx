import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    scales
} from 'chart.js';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
);

const PlanReport = () => {
    // 정보를 불러오기 위함
    const [childNum, setChildNum] = useState(1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth()+1); // 1월이 0이라 add 1
    const [reportData, setReportData] = useState({
        chartPayment: {},   // 초기값을 빈 객체로 설정해야 함.
        monthPlan: {},
        showQuizResult: {},
        showQuizResultTop3: {}
    });

    //  plan vs Aatual Chart 1 & Analysis Data Extraction
    // Plan 해당 Map 추출
    const monthPlan = reportData.monthPlan;
    console.log(monthPlan);
    // Plan 해당 Map에서 카테고리 추출
    const monthPlanCategories = Object.keys(monthPlan);
    console.log(monthPlanCategories);    
    // Plan 해당 Map에서 값 추출
    const monthPlanValues = Object.values(monthPlan);
    console.log(monthPlanValues);        

    // Actual 해당 Map 추출
    const chartPayment = reportData.chartPayment;
    console.log(chartPayment);
    // Actual 해당 Map에서 카테고리 추출
    const paymentCategories = Object.keys(chartPayment);
    console.log(paymentCategories);
    // Actual 해당 Map에서 값 추출
    const paymentValues = Object.values(chartPayment);
    console.log(paymentValues);

    //Chart 2) 계획Bar 해당 Map 추출
    const showQuizResult = reportData.showQuizResult;
    console.log(showQuizResult);

    const showQuizResultTop3 = reportData.showQuizResultTop3;
    console.log(showQuizResultTop3);

    // childNum, year, month가 변경될 때마다 호출
    useEffect(() => {
        const fetchChildReport = async () => {
            try {
                const response = await axios.get("http://localhost:9999/parents/reports", {
                    params: {
                        childNum: childNum,
                        year: year,
                        month: month
                    },
                    headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IuuPhOuLiOunmCIsImlkIjoia29zdGEiLCJyb2xlIjoiUk9MRV9QQVJFTlQiLCJtZW1iZXJObyI6MSwiaWF0IjoxNzMxNDIwNDU4LCJleHAiOjE3MzE1MDY4NTh9.-ETuBxda0PMn2gDaHHSLsWt_VGIugGL3RcUb5kohZU8`
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


    const data = {
        labels: ['shopping'],
        datasets:[
            {
                label:'plan',
                data: [0],
                backgroundColor: '#61DBFB'                
            },            
            {
                label:'actual',
                data: [9],
                backgroundColor: 'rgb(89, 0, 241)'                
            }
        ]
    }
    const options = {        
    }
    return (
        <>
            <div>
                {/* map으로 키 value 값 넣어줘야 함. */}
                <img src="/icons/shopping.png" />
                <div>key값</div>
                    <Bar data = {data} options={options} />
            </div>
            <div>
                {/* 소비 분석 넣어야함 */}
                <h1>카테고리별 소비현황</h1>
                <div>
                    {/* map 사용하기 */}
                    map사용할 것
                </div>
            </div>
        </>
    );
};

export default PlanReport;
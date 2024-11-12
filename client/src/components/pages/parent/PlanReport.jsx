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
    const [month, setMonth] = useState(new Date().getMonth());
    const [reportData, setReportData] = useState(null);

    // 이미지 주소
    const iconLocation = '/donny.png';


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
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IuuPhOuLiOunmCIsImlkIjoia29zdGEiLCJyb2xlIjoiUk9MRV9QQVJFTlQiLCJtZW1iZXJObyI6MSwiaWF0IjoxNzMxNDIwNDU4LCJleHAiOjE3MzE1MDY4NTh9.-ETuBxda0PMn2gDaHHSLsWt_VGIugGL3RcUb5kohZU8`                    }
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
                data: [3],
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
                <img src={iconLocation} />
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
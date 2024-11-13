import React from 'react';
import PlanForm from '../../components/pages/child/plan/PlanForm';
import styled from "styled-components";
import SaveForm from '../../components/pages/child/plan/SaveForm';

const MoneyPlanPage = () => {
    // const submitPlan = (e) => {
    //     e.preventDefault();

    //     axios({
    //         url: 'http://localhost:9999/plans/1',
    //         method: 'post',
    //         data: plan,
    //     })
    //         .then((res) => {
    //             console.log(res.data);
    //             if (res.status === 200) {
    //                 alert('부모님께 소비내역 전달 완료~!!');
    //                 navigate('/planPage');
    //             }
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //             alert('오류가 발생했습니다. 다시 시도해 주세요.');
    //         });
    // };
    // const [plan, setPlan] = useState({
    //     shopping: '',
    //     transport: '',
    //     cvs: '',
    //     food: '',
    //     others: '',
    //     saving: '',
    //     date: new Date().toISOString().split('T')[0],
    // });

    // const changeForm = (e) => {
    //     setPlan({
    //         ...plan,
    //         [e.target.name]: e.target.value,
    //     });
    // };

    // const navigate = useNavigate();

    const Wapper = styled.div`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;`;

        const PageTitle = styled.h3`
        margin-top:-40px;
        margin-bottom: 40px;
        font-weight: bold;
        color: #3D3D3D;
        text-align: center;
      `;
     return (
        <>
            <PageTitle>소비계획 세우기</PageTitle>
            <Wapper>
            <PlanForm/>
            <SaveForm/>
            </Wapper>
            </>
    );
};

export default MoneyPlanPage;
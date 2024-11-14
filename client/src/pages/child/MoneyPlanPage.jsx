import React, { createContext, useContext, useState } from "react";
import PlanForm from "../../components/pages/child/plan/PlanForm";
import styled from "styled-components";
import SaveForm from "../../components/pages/child/plan/SaveForm";
import SelectBox from "../../components/pages/child/plan/SelectBox";

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
const TitleWapper = styled.div`
  display: flex;
  margin-bottom: 30px;
  justify-content: flex-end;
`;
const Wapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const PageTitle = styled.h3`
  margin-top: -40px;
  margin-bottom: 40px;
  font-weight: bold;
  color: #3d3d3d;
  text-align: center;
`;
const UpdateBtn = styled.button`
  background-color: #4829d7;
  color: white;
  font-style: bold;
  font-size: 1.2rem;
  border: 2px solid #4829d7;
  border-radius: 10px;
  width: 15vw;
  height: 5.8vh;
  font-weight: bold;
`;
const SendBtn = styled.button`
  background-color: #4829d7;
  color: white;
  font-style: bold;
  font-size: 1.2rem;
  border: 2px solid #4829d7;
  border-radius: 10px;
  width: 25vw;
  height: 5.8vh;
  font-weight: bold;
  margin-left: 30px;
`;
const BtnWapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: -20px;
  margin-bottom: 20px;
`;

const MoneyPlanPage = () => {
  return (
    <>
      <TitleWapper>
        <PageTitle>소비계획 세우기</PageTitle>
        <SelectBox />
      </TitleWapper>
      <Wapper>
        <PlanForm />
        <SaveForm />
      </Wapper>
      <BtnWapper>
        <UpdateBtn>수정하기</UpdateBtn>
        <SendBtn>부모님한테 보내기</SendBtn>
      </BtnWapper>
    </>
  );
};
export default MoneyPlanPage;

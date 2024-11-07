import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SaveForm from './components/pages/MGMT/plan/SaveForm';
import UpdateForm from './components/pages/MGMT/plan/UpdateForm';
import PlanPage from './pages/PlanPage';

const Navirouter = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<HomePage />}/>
                <Route path='/SaveForm' element={<SaveForm />}/>
                <Route path='/UpdateForm' element={<UpdateForm />}/>
                <Route path='/PlanPage' element={<PlanPage />}/>
            </Routes>
        </div>
    );
};

export default Navirouter;
import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Profile from "../../../components/Profile/Profile";
import Login from "../../../n2-features/f1-auth/a1-login/Login/Login";
import Register from "../../../n2-features/f1-auth/a2-register/Register/Register";
import PassRecovery from "../../../components/PassRecovery/PassRecovery";
import NewPass from "../../../components/NewPass/NewPass";
import Error404 from "../../../components/Error404/Error404";


export const PATH = {
    LOGIN: '/login',
    REGISTER: '/register',
    PROFILE: '/profile',
    ERROR: '/error404',
    PASS_RECOVERY: '/pass_recovery',
    NEW_PASS: '/new_pass'
}

function Pages() {
    return (
        <div>
            <Routes>

                {/*<Route path='/' element={<Navigate to={PATH.PROFILE}/>}/>*/}

                <Route path={PATH.PROFILE} element={<Profile/>}/>
                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.REGISTER} element={<Register/>}/>
                <Route path={PATH.PASS_RECOVERY} element={<PassRecovery/>}/>
                <Route path={PATH.NEW_PASS} element={<NewPass/>}/>
                <Route path={'*'} element={<Navigate to={PATH.ERROR}/>}/>

                <Route path={PATH.ERROR} element={<Error404/>}/>
            </Routes>
        </div>
    )
}

export default Pages

//로그인한 사용자만 protected route를 볼 수 있고
//아닐 경우 create-account 페이지로 이동된다

import React from "react";
import { auth } from "../firebase";
import { Navigate } from "react-router-dom";

//children = <Home/>, <Profile />
export default function ProtectedRoute({children} : {children:React.ReactNode}){


    //로그인 확인
    const user = auth.currentUser;  //user || null
    console.log(`user :: `,user);
    if(user === null){
        return <Navigate to="/login" />
    }
    return children;
}
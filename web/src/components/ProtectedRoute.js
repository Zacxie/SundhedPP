import React, {useState} from "react";
import { Redirect, Route } from "react-router-dom";
import {userStore} from "../stores/UserStore";

function ProtectedRoute({ component: Component, ...restOfProps }) {
    const hasToken = localStorage.getItem("Bearer");
    let pathToken;
    if(hasToken != null){
        console.log("not empty"+ localStorage.getItem("Bearer"))
        userStore.isAuthenticated = true;
    } else {

    }

    if(userStore.isAuthenticated != true){
        console.log("You are not authorized")
    }

    return (
        <Route
            {...restOfProps}
            render={(props) =>
                userStore.isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    );
}

export default ProtectedRoute;
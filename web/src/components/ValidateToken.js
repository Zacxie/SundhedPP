import {userStore} from "../stores/UserStore";
import {Redirect, Route} from "react-router-dom";
import React from "react";


const ValidateToken = () => {

    let href = window.location.href;
    let sliceHref = href.indexOf("?token=");
    let token = href.slice(7+sliceHref);

    console.log(token)
    localStorage.setItem("jwttoken", "Bearer "+token)
    userStore.token = token
    userStore.isAuthenticated = true

    return (
        <div>
            <Route
            render={() =>
            userStore.isAuthenticated ? <Redirect to="/"/> : <Redirect to="/error" /> }
            />
        }
        </div>
    )
}

export default ValidateToken
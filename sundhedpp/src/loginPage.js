import ReactDOM from 'react-dom';
import {TextField} from "@material-ui/core";
import React from "react";
import App from "./App";


function LoginPage() {
    return (
        <div className="LoginPage">
            <header className="LoginPage-header">
                <title>Login Page </title>
                <div>
                    <TextField id="username" label="Username"/>
                </div>
                <div>
                    <TextField id="password" label="Password" type="password"/>
                </div>

            </header>
        </div>
    );

}




export default LoginPage;

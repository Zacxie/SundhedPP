import {TextField} from "@material-ui/core";
import React from "react";


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
                <br/>
                <div>
                    <button variant="outlined">Login</button>
                </div>
            </header>
        </div>
    );
}


export default LoginPage;

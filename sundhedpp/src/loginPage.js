import {Button, TextField} from "@material-ui/core";
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
                    <Button id="loginButton" label="loginButton" variant="outlined"> Login </Button>
                </div>

            </header>
        </div>
    );

}


export default LoginPage;

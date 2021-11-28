import {TextField, Button} from "@material-ui/core";
import React from "react";
import "../styling/Login.css"
import logo from "../styling/Danmarks_Tekniske_Universitet_(logo).svg"
import GitHubIcon from '@mui/icons-material/GitHub';
import {Redirect, useHistory} from 'react-router-dom';
import {userStore} from "../stores/UserStore";
import authService from "../services/auth.service";
import RenewPrescription from "./prescriptions/RenewPrescription";


const LoginPage = () => {
    const history = useHistory();

    const handleClick = (props) => {

            if (props === "dtu") {
                // request dtu

                authService.login("s172133","password");
                userStore.state = userOauth(props);

            } else if (props === "github") {
                // request github
                //userStore.state = userOauth("github");

            } else {
                // request local
                console.log("local")

            }
        if(userStore.state === true) {
            history.push("/");
        } else{
            history.push("/login");
        }
    }

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
                    <Button variant="outlined" onClick={() => handleClick("local")}>Login</Button>
                </div>
                <div className="Oauth-Container">
                    {/* <GitHubIcon onClick={() => handleClick("github")} fontSize="large"  /> */}

                    <img onClick={() => handleClick("dtu")} className="DTU-logo" src={logo} />
                </div>

            </header>
        </div>
    );
}


export default LoginPage;



function userOauth(type){
    const baseURL = "http://localhost:3000/rest/oauth"
    let auth = true;
    // fetch/redirect to Oauth dtu
    if(type === "dtu"){
        //dtu

        // fetch api oauth
        // give token



        // expiration set to 1 minutes
        let now = new Date() - (2 * 60000);
        let authLogin = true;


        let cookielogin = "login=" + authLogin;
        let cookieexpiration = "expires="+now;
        let cookiestring = cookielogin + cookieexpiration;
        document.cookie = cookiestring;



    } else {
        // github

        // not implemented
    }


    return auth;
}

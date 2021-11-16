import {TextField, Button} from "@material-ui/core";
import React from "react";
import "../src/styling/Login.css"
import logo from "./styling/Danmarks_Tekniske_Universitet_(logo).svg"
import GitHubIcon from '@mui/icons-material/GitHub';
import { useHistory } from 'react-router-dom';
import {userStore} from "./stores/UserStore";


const LoginPage = () => {
    const history = useHistory();

    const handleClick = (props) => {

            if (props === "dtu") {
                // request dtu
                console.log("dtu")
                userStore.state = true;
            } else if (props === "github") {
                // request github

                console.log("github")
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
                    <GitHubIcon onClick={() => handleClick("github")} fontSize="large"  />

                    <img onClick={() => handleClick("dtu")} className="DTU-logo" src={logo} />
                </div>
            </header>
        </div>
    );
}


export default LoginPage;




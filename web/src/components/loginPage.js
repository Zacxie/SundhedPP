import React from "react";
import "../styling/Login.css";
import logo from "../styling/Danmarks_Tekniske_Universitet_logo.svg";
import { useHistory } from 'react-router-dom';
import {userStore} from "../stores/UserStore";
import axios from "axios";


const LoginPage = () => {

    const history = useHistory();


    const handleClick = (props) => {
            const baseURL = "http://localhost:8080/rest/oauth"

            if (props === "dtu") {
                // request dtu
                console.log("dtu")
                window.location.href = baseURL + "/login";

            } else if (props === "github") {
                // request github

                console.log("github")

            } else {
                // request local
                console.log("local")
                let token;
                axios.get(baseURL+"/validate")
                    .then((response) =>
                        userStore.token = response.headers.authorization

                    )

                localStorage.setItem("Bearer", userStore.token)
            }

        if(userStore != true){
            history.push("/")
        }
    }

    return (
        <div className="LoginPage">
            <header className="LoginPage-header">
                <h3>Login with CampusNet</h3>
                <div className="Oauth-Container">
                    {/*<GitHubIcon onClick={() => handleClick("github")} fontSize="large"  /> */}

                    <img onClick={() => handleClick("dtu")} className="DTU-logo" src={logo} alt="DTU Logo" />
                </div>

            </header>
        </div>
    );
}


export default LoginPage;

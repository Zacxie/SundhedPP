import '../styling/Nav2.css';
import React, {useState} from 'react';
import Search from './Search';
import DehazeSharpIcon from '@mui/icons-material/DehazeSharp';
import {userStore} from "../stores/UserStore";

function Nav2 () {

    const [showLinks, setShowLinks] = useState(false);

    const removeToken = () => {
        userStore.isAuthenticated = false;
        userStore.token = ""
        localStorage.removeItem("jwttoken")
    }

    return(
        <div className="Navbar">
            <div className="LeftSide">
                <a className="fas fa-file-medical" href="/#/home"></a>
                <h1 className="navbar-logo"><a href="/#/home">Sundhed++</a></h1>
                <div className="Searchbar">
                    <Search></Search>
                </div>
            </div>
            <div className="RightSide">
                <div className="Links" id={showLinks ? "hidden" : ""}>
                    <a href="/#/home">Home</a>
                    <a href="/#/profile">Profile</a>
                    <a href="/#/patients">Create Patient</a>
                    <a onClick={removeToken} href="/#/login">Log out</a>
                </div>
                <button onClick={ () => setShowLinks(!showLinks)}><DehazeSharpIcon/></button>
        </div>
        </div>
    )
}

export default Nav2
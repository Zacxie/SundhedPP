import '../styling/Nav2.css';
import React, {useState} from 'react';
import Search from './Search';
import DehazeSharpIcon from '@mui/icons-material/DehazeSharp';
import {userStore} from "../stores/UserStore";

function Nav2 () {

    const [showLinks, setShowLinks] = useState(false);

    const removecookie = () => {
        userStore.state = false
        document.cookie = "login=; expires=The, 01 Jan 1970 00:00:00 UTC; path=/";
    }

    return(
        <div className="Navbar">
            <div className="LeftSide">
                <a href="/#/">
                    <div>
                        <span className="fas fa-file-medical" />
                        <h1 className="navbar-logo" style={{"display": "inline-block", "marginLeft": "10px"}}>Sundhed++</h1>
                    </div>
                </a>
                <div className="Searchbar">
                    <Search></Search>
                </div>
            </div>
            <div className="RightSide">
                <div className="Links" id={showLinks ? "hidden" : ""}>
                    <a href="/#/patients">Create Patient</a>
                    <a href="/#/prescriptions">Create Prescription</a>
                    <a onClick={removecookie} href="/#/login">Log out</a>

                </div>
                <button onClick={ () => setShowLinks(!showLinks)}><DehazeSharpIcon/></button>
        </div>
        </div>
    )
}

export default Nav2
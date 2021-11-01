import React, {Component} from 'react';
import { MenuItems} from "./MenuItems";
import '../../styling/Navbar.css';
import {Button} from "../Button"
import Search from '../../pages/Search';

class Navbar extends Component {
    state = {clicked: false}

    render() {
        return (
            <nav className="NavbarItems">
                <i className="fas fa-file-medical"></i>
                <h1 className="navbar-logo">Sundhed++</h1>
                <i className= "searchbar"><Search/></i>

                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item,index) => {
                        return (
                            <li key={index}>
                                <a className={item.className} href={item.url}>
                                    {item.label}
                                </a>
                            </li>
                        )
                    })}
                </ul>
                <Button>Sign Up </Button>
            </nav>
        )
    }
}

export default Navbar
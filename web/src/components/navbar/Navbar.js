import React, {Component} from 'react';
import {MenuItems} from "./MenuItems";
import '../../styling/Navbar.css';
import Search from '../../pages/Search';

class Navbar extends Component {
    state = {clicked: false}

    render() {
        return (
            <nav className="NavbarItems">
                <i className="fas fa-file-medical"></i>
                <h1 className="navbar-logo">Sundhed++</h1>
<<<<<<< HEAD
                <i className= "searchbar"><Search/></i>
=======
                <i className="searchbar"><Search/></i>

>>>>>>> e8b3bbd555be49a8c26a36d9de94e0cee48924d7
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <a className={item.className} href={item.url}>
                                    {item.label}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        )
    }
}

export default Navbar
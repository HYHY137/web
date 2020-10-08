import React from 'react';
import './Menu_Header.scss';
import logo from "../../../images/logo.png";
import {Link} from "react-router-dom";
import { useHistory } from 'react-router-dom';

export default function Header() {

    const history = useHistory();
    const login = () => history.push("/login");

    return (
        <header className="menu_header" id="header">  
                <Link to="/home" className="logo_link">
                    <img src={logo} className="logo" alt="logo"/>
                </Link>
                <button type="button" className="loginButton" onClick={login}>
                   <p>Login</p>    
                </button>
        </header>
        
    )
}


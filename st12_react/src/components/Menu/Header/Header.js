import React, { useContext } from 'react';
import './Menu_Header.scss';
import logo from "../../../images/logo.png";
import {Link} from "react-router-dom";
import { useHistory } from 'react-router-dom';
import {DropDownMenu} from "./DropDownMenu"
import UserContext from "../../../context/UserContext";

export default function Header() {
    const { userData } = useContext(UserContext);

    const history = useHistory();
    const login = () => history.push("/login");

    return (
        <header className="menu_header" id="header">  
                <Link to="/home" className="menu_logo_link">
                    <img src={logo} className="menu_logo" alt="logo"/>
                </Link>
                {
                    userData.user ? <DropDownMenu /> :
                    (
                    <button type="button" className="loginButton" onClick={login}>
                        <p>Login</p>    
                    </button>
                    )
                }
                
        </header>
        
    )
}


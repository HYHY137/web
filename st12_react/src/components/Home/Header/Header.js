import React from 'react'
import './Header.scss';
import logo from "../../../images/logo.png";
import {Links} from "./Links";
import {Link, useHistory} from "react-router-dom";
export default function Header() {
    const links = [
        {ref:"container", label:"Главная"},
        {ref:"aboutUs", label:"О нас"},
        {ref:"services", label:"Услуги"},
        {ref:"addresses", label:"Адреса"},
    ];
    const history = useHistory();
    const menu = () => history.push("/menu");
    return(
        <header className="header" id="header">  
            <Link to="/home" className="logo_link">
                <img src={logo} className="logo" alt="logo"/>
            </Link>
            <Links links={links}/>
            <button type="button" className="orderButton" onClick={menu}>
                <p>PLACE ORDER</p>
            </button>
        </header>
    

    )
}

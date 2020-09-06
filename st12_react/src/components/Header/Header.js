import React from 'react'
import './Header.scss';
import logo from "../../images/logo.png";
import {Links} from "./Links";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.links = [
            {ref:"aboutUs", label:"Главная"},
            {ref:"aboutUs", label:"О нас"},
            {ref:"aboutUs", label:"Услуги"},
            {ref:"aboutUs", label:"Адреса"},
        ];
    }
   
    render(){
        return(
            <header className="header">  
                <img src={logo} className="logo" alt="logo"/>
                <Links links={this.links}/>
                <button type="button" className="orderButton">
                    <p>PLACE ORDER</p>
                </button>
            </header>
        

        )
    }

}



export default Header;
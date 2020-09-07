import React from 'react'
import './Header.scss';
import logo from "../../images/logo.png";
import {Links} from "./Links";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state={}
        this.links = [
            {ref:"container", label:"Главная"},
            {ref:"aboutUs", label:"О нас"},
            {ref:"services", label:"Услуги"},
            {ref:"addresses", label:"Адреса"},
        ];
    }
   
    render(){
        return(
            <header className="header" id="header">  
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
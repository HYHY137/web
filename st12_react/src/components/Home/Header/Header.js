import React from 'react'
import './Header.scss';
import logo from "../../../images/logo.png";
import {Links} from "./Links";
import {Link} from "react-router-dom";
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
                    <Link to="/menu">
                        <p>PLACE ORDER</p>
                    </Link>
                    
                </button>
            </header>
        

        )
    }

}



export default Header;
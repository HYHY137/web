import React from 'react';
import {Links} from "../../Home/Header/Links";
import "./MenuBody.scss"

export default function Body() {
    const links = [
        {ref:"container", label:"Салаты"},
        {ref:"services", label:"Закуски"},
        {ref:"aboutUs", label:"Супы"},
        {ref:"services", label:"Второе"},
        {ref:"services", label:"Напитки"},
        {ref:"addresses", label:"Десерты"},
    ];
    return (
        <div>
             <Links links={links} className="menu_navigation_links"/>
        </div>
    )
}

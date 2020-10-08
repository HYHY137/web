import React from 'react';
import "./Body.scss";

export const Card = function(props){
    return(
        <div className="card">
            <img src={props.img} className="card_img" alt={props.alt}></img>
            <h1 className="h1_card">{props.title}</h1>
            <a className="card_link" href={props.link}>Узнать больше ›</a>
        </div>
    )
}
import React from 'react';
import "./Body.scss";



export const BlockImg = function(props){
    return(
        <div id={props.id} className ="block_2_3">
            <img src={props.img} className="block_img" alt="our team"></img>
        </div>
    )
}
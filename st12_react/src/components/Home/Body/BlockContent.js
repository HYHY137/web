import React from 'react';
import "./Body.scss";
import { useHistory } from "react-router-dom";

export const BlockContent = function(props){
    const history = useHistory();
    const menu = () => history.push("/menu");
    const button = (<button type="button" className="button_block1_content" onClick={menu}>
                    <p className="text_button_block1_content">PLACE ORDER</p>
                    </button>)
    return(
        <div className="block_1_4">
            <div className="block1_content">
                <h1 className={props.titleClass}>{props.title}</h1>
                <p className={props.textClass}>{props.text}</p>
                {
                    props.button ? button : null
                }
                
            </div>
        </div>
    )
}
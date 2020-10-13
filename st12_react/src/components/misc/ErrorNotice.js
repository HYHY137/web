import React from 'react';
import "./ErrorNotice.scss"

export default function ErrorNotice(props) {
    return (
        <div className="error_notice">
            <span>{props.message}</span>
            <button onClick={props.clearError}>x</button>   
        </div>
    )
}

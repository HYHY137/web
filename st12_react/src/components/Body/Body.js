import React from 'react';
import "./Body.scss";
import { Blocks } from './Blocks';

class Body extends React.Component{
    constructor(props){
        super(props);    
    }
    render(){
        return(
            <div>
                <Blocks />
            </div>

        )
    }
}

export default Body;












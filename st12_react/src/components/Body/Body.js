import React from 'react';
import "./Body.scss";
import { Blocks } from './Blocks';
import { Services } from './Services';

class Body extends React.Component{
    constructor(props){
        super(props);    
    }
    render(){
        return(
            <div>
                <Blocks />
                <Services />
            </div>

        )
    }
}

export default Body;












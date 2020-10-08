import React from 'react';
import "./Body.scss";
import { Blocks } from './Blocks';
import { Services } from './Services';
import { Addresses } from './Addresses';

class Body extends React.Component{
    constructor(props){
        super(props);    
    }
    render(){
        return(
            <div className="container" id="container">
                <Blocks />
                <Services />
                <Addresses />
            </div>
            

        )
    }
}

export default Body;












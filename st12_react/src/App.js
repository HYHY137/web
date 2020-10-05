import React from 'react';
import './App.scss';
import {Home} from "./components/Home/Home";
import {Menu} from "./components/Menu/Menu";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>    
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/menu' component={Menu}/>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;

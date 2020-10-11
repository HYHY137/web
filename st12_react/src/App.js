import React, { useState, useEffect } from 'react';
import './App.scss';
import Axios from 'axios';
import {Home} from "./components/Home/Home";
import {Menu} from "./components/Menu/Menu";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import UserContext from "./context/UserContext";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

function App() {

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

useEffect(() => {
  const checkLoggedIn = async () =>{
    
    let token = localStorage.getItem("auth-token");
    if ( token == null){
      localStorage.setItem("auth-token", "");
      token = "";
    }
    
    const tokenRes = await Axios.post("http://localhost:5000/user/tokenIsValid", null, { headers: { "x-auth-token": token }});
    if (tokenRes.data) {
      const userRes = await Axios.get("http://localhost:5000/user/", {
        headers: { "x-auth-token": token },
      });
      setUserData({
        token,
        user: userRes.data,
      });
    }
  };
  checkLoggedIn();
}, [])

  return (
    <div className="App">
      <Router> 
        <UserContext.Provider value={ {userData, setUserData} }>
          <Switch>
            <Route exact path='/'>
              <Redirect to="/home" />
            </Route>
            <Route exact path='/home' component={Home}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/register' component={Register}/>
            <Route exact path='/menu' component={Menu}/>
          </Switch>
        </UserContext.Provider>  
      </Router>
      
    </div>
  );
}

export default App;

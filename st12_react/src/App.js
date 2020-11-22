import React, { useState, useEffect } from 'react';
import './App.scss';
import Axios from 'axios';
import { Home } from "./components/Home/Home";
import { Menu } from "./components/Menu/Menu";
import EditMenu from "./components/Admin/EditMenu";
import EditUsers from "./components/Admin/EditUsers";
import EditDishPage from "./components/Admin/EditDishPage";
import AddDishPage from "./components/Admin/AddDishPage"
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import ProfilePage from "./components/User/ProfilePage"
import ShoppingCart from "./components/User/ShoppingCart"
import UserContext from "./context/UserContext";
import DataContext from "./context/DataContext";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

function App() {

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });
  const [data, setData] = useState({
    dishes: undefined,
  });
  const [loading, setLoading] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);


  useEffect(() => {
    const checkLoggedIn = async () => {
      setLoadingUser(true);
      let token = localStorage.getItem("auth-token");
      if (token == null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }

      const tokenRes = await Axios.post("http://localhost:5000/user/tokenIsValid", null, { headers: { "x-auth-token": token } });
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:5000/user/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
      setLoadingUser(false);
    };

    const getData = async () => {
      setLoading(true)
      const res = await Axios.get('http://localhost:5000/dish/')

      setData({
        dishes: res.data,
      });
      setLoading(false)
    }

    getData();
    checkLoggedIn();
  }, []);



  return (

    <div className="App">
      { (loadingUser || loading) ? (<><p>Loading....</p></>) :
        (
          <Router>
            <UserContext.Provider value={{ userData, setUserData }}>
              <DataContext.Provider value={{ data, setData }}>
                <Switch>
                  <Route exact path='/'>
                    <Redirect to="/home" />
                  </Route>
                  <Route exact path='/home' component={Home} />
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/menu' component={Menu} />
                  <Route exact path='/menu/edit' component={EditMenu} />
                  <Route exact path='/menu/editDish/:id' component={EditDishPage} />
                  <Route exact path='/menu/addDish' component={AddDishPage} />
                  <Route exact path='/users' component={EditUsers} />
                  <Route exact path='/user/profile' component={ProfilePage} />
                  <Route exact path='/user/shoppingCart' component={ShoppingCart} />
                </Switch>
              </DataContext.Provider>
            </UserContext.Provider>
          </Router>
        )}
    </div>
  );
}

export default App;

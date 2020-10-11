import React, { useContext } from 'react';
import UserContext from "../../../context/UserContext";
import { Dropdown } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import "./Menu_Header.scss";
import 'semantic-ui-css/semantic.min.css'


export const DropDownMenu = () => {

  const { userData, setUserData } = useContext(UserContext);
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  }
  return(
  
    <Dropdown
        text={userData.user.name}
        fluid
        className='selection'
      >
      <Dropdown.Menu>   
        <Dropdown.Item text='Profile' icon='user' as={Link} to='/profile'/> 
        <Dropdown.Item text='Shopping Cart' icon='shopping cart' as={Link} to='/home'/>
        <Dropdown.Item text='Sign Out' icon='sign out' onClick={logout}/>
      </Dropdown.Menu>
    </Dropdown>
  )
}
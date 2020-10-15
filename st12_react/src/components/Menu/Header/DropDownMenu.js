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
        <Dropdown.Item text='Profile' icon='user' as={Link} to='user/profile'/> 
        {
          userData.user.role === "admin" && 
            (
            <>
            <Dropdown.Item text='Edit users' icon='users' as={Link} to='/users'/> 
            <Dropdown.Item text='Edit menu' icon='edit outline' as={Link} to='/menu/edit'/>
            </>
            )
        }
        <Dropdown.Item text='Shopping Cart' icon='shopping cart' as={Link} to='/user/shoppingCart'/>
        <Dropdown.Item text='Sign Out' icon='sign out' onClick={logout}/>
      </Dropdown.Menu>
    </Dropdown>
  )
}
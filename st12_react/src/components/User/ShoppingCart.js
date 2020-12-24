import React, { useContext, useState, useEffect } from 'react';
import Header from "../Menu/Header/Header";
import UserContext from "../../context/UserContext";
import ShoppingCartList from "./ShoppingCartList";
import Axios from 'axios';
import {NotificationContainer } from 'react-notifications';


export default function ShoppingCart() {
    const [data, setData] = useState({
        currentUserDishes: [],
    });
    const { userData } = useContext(UserContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {        
        const getData = async () => {
            setLoading(true);
            const config = {
                headers:{ "x-auth-token": userData.token, 
                } 
            };
            const res = await Axios.get('http://localhost:5000/shoppingCart/' + userData.user.id, config);
            setData({
                currentUserDishes: res.data,
            });
            setLoading(false)
        }

        getData();
    }, []);

    return (
        <>
            {
                userData.user ?
                    (

                        loading ? (<> <p>Loading....</p></>) :
                            (
                                <div className="App">
                                    <Header />
                                    <ShoppingCartList data={data}/>
                                    <NotificationContainer/> 
                                </div>
                            )


                    ) :
                    (
                        <div className="App">
                            <Header />
                            <p className="you_must_be_logged_in_msg">You must be logged in!</p>
                        </div>
                    )
            }
        </>
    )
}    
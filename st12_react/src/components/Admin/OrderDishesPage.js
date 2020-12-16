import React, { useContext, useState, useEffect } from 'react';
import Header from "../Menu/Header/Header";
import UserContext from "../../context/UserContext";
import OrderDishesList from "./OrderDishesList";
import { useParams } from "react-router-dom";
import Axios from 'axios';

export default function OrderDetilsPage() {
    const { userData } = useContext(UserContext);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            const config = {
                headers:{ "x-auth-token": userData.token, 
                } 
            };
            const res = await Axios.get('http://localhost:5000/orders/' + id, config);
            res.data ?
                setData({
                dishes: res.data.dishes,
                total: res.data.totalPrice,
                description: res.data.description,
                phoneNumber: res.data.userID.phoneNumber,
                id: res.data._id
            }) :
                setData({
                    dishes:[],
                    total: 0,
                    description: '',
                    phoneNumber: '',
                    id: ''
                })
            
            setLoading(false);
        }

        getData();
    }, []);
    return (
        <>
            {
                userData.user && userData.user.role === "admin" ?
                    (
                        <div className="App">
                            { loading ? (<><p>Loading....</p></>) :
                                (
                                    <>
                                        <Header />
                                        <OrderDishesList data={data}/>
                                    </>
                                )}
                        </div>
                    ) :
                    (
                        <div className="App">
                            <Header />
                            <p className="you_must_be_logged_in_msg">You must be logged in as admin!</p>
                        </div>
                    )
            }
        </>
    )
};
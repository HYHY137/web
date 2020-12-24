import React, { useContext, useState, useEffect } from 'react';
import Header from "../Menu/Header/Header";
import UserContext from "../../context/UserContext";
import OrdersList from "./OrdersList";
import Axios from 'axios';

export default function EditOrders() {
    const { userData } = useContext(UserContext);
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            const config = {
                headers:{ "x-auth-token": userData.token, 
                } 
            };
            const res = await Axios.get('http://localhost:5000/orders/', config);
            let newRows = [];
            res.data.map((row, index) => {
                let newRow = {
                    id: index + 1,
                    description: row.description,
                    time: row.created_at,
                    total: row.totalPrice,
                    email: row.userID.email,
                    techID: row._id
                };
                newRows.push(newRow);
            });
            setRows(newRows);
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
                                        <OrdersList rows={rows} />
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
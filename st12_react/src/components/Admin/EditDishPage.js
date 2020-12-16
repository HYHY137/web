import React, { useContext } from 'react';
import Header from "../Menu/Header/Header";
import UserContext from "../../context/UserContext";
import EditDish from "./EditDish";

export default function EditDishPage() {
    const { userData } = useContext(UserContext);
    return (
        <>
            {
                 userData.user && userData.user.role === "admin" ?
                    (
                        <div className="App">
                            <Header />
                            <EditDish />

                        </div>
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

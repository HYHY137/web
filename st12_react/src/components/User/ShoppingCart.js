import React, { useContext } from 'react';
import Header from "../Menu/Header/Header";
import UserContext from "../../context/UserContext";



export default function ProfilePage() {
    const { userData } = useContext(UserContext);

    return (
        <>
        {
            userData.user ?
            (
                <div className="App">
                    <Header />

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
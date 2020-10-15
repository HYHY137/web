import React, { useContext } from 'react';
import Header from "../Menu/Header/Header";
import UserContext from "../../context/UserContext";
import { useHistory } from 'react-router-dom';
import Profile from "./Profile";



export default function ProfilePage() {
    const { userData, setUserContext } = useContext(UserContext);

    const history = useHistory();
    const login = () => history.push("/login");
    const style = {
        fontFamily: "Gilroy",
        fontStyle: "normal",
        fontSize: "4vw",
        color: "#000000",
        textAlign: "center",
        marginTop: "30vh"
    }

    return (
        <>
        {
            userData.user ?
            (
                <div className="App">
                    <Header />
                    <Profile />
                </div>
            ) :
            (
                <div className="App">
                    <Header />
                    <p style={style}>You must be logged in!</p>
                </div>
            )
        }
        </>
    )
}    
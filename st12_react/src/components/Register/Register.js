import React,{ useState, useContext } from 'react';
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom";
import "./Register.scss";
import Axios from 'axios';

export default function Register() {
    const [email, setEmail] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();

    const history = useHistory();

    const { setUserData } = useContext(UserContext);

    const submit = async (e) =>{
        e.preventDefault();
        const newUser = { email, phoneNumber, name, password, passwordCheck};
        console.log(newUser)
        await Axios.post("http://localhost:5000/user/register", newUser);
        const loginRes = await Axios.post("http://localhost:5000/user/login", {
            email: email,
            password: password,
        });
        setUserData({
            token: loginRes.data.token,
            user: loginRes.data.user,
        });
        localStorage.setItem("auth-token", loginRes.data.token);
        history.push("/menu");
    }

    return (
        <div className="register">
            <div className="register_form">
                <h2>Register</h2>
                <form onSubmit={submit}>
                    <label htmlFor="register-email">Email</label>
                    <input id="register-email" type="email" onChange={(e) => setEmail(e.target.value)}></input>

                    <label htmlFor="register-phone">Phone</label>
                    <input id="register-phone" type="phone" onChange={(e) => setPhoneNumber(e.target.value)}></input>

                    <label htmlFor="register-name">Name</label>
                    <input id="register-name" type="text" onChange={(e) => setName(e.target.value)}></input>

                    <label htmlFor="register-password">Password</label>
                    <input id="register-password" type="password" onChange={(e) => setPassword(e.target.value)}></input>
                    <label htmlFor="register-password-verify">Verify password</label>
                    <input id="register-password-verify" type="password" onChange={(e) => setPasswordCheck(e.target.value)}></input>

                    <input type="submit" value="Register"></input>
                </form>
            </div>
            
        </div>
    )
}

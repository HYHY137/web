import React,{ useState, useContext } from 'react';
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom";
import Axios from 'axios';
import './Login.scss';

export default function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const history = useHistory();
    const { setUserData } = useContext(UserContext);

    const register = () => history.push("/register");

    const submit = async (e) =>{
        e.preventDefault();
        const newUser = { email, password };
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
            <div className="login">
                <div className="login_form">
                    <h2>Login</h2>
                    <form onSubmit={submit}>
                        <label htmlFor="login-email">Email</label>
                        <input id="login-email" type="email" onChange={(e) => setEmail(e.target.value)}></input>

                        <label htmlFor="login-password">Password</label>
                        <input id="login-password" type="password" onChange={(e) => setPassword(e.target.value)}></input>

                        <input type="submit" value="Login"></input>
                    </form>
                </div>
            </div>
        )
    }





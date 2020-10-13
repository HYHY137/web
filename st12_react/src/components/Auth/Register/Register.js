import React,{ useState, useContext } from 'react';
import UserContext from "../../../context/UserContext";
import { useHistory } from "react-router-dom";
import '../Auth.scss';
import Axios from 'axios';
import ErrorNotice from '../../misc/ErrorNotice';

export default function Register() {
    const [email, setEmail] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [error, setError] = useState();

    const history = useHistory();

    const { setUserData } = useContext(UserContext);

    const submit = async (e) =>{
        e.preventDefault();
        try{
            const newUser = { email, phoneNumber, name, password, passwordCheck};
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
        } catch(err){
            err.response.data.msg && setError(err.response.data.msg);
        }
        
    }

    return (
        <div className="register">
            <div className="register_form">
                <h2>Register</h2>
                {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
                <form onSubmit={submit} className="register_input_fields">
                    <label htmlFor="register-email" className="login_label">Email</label>
                    <input id="register-email" className="register_input"  type="email" onChange={(e) => setEmail(e.target.value)}></input>

                    <label htmlFor="register-phone" className="login_label">Phone</label>
                    <input id="register-phone"  className="register_input"  type="phone" onChange={(e) => setPhoneNumber(e.target.value)}></input>

                    <label htmlFor="register-name" className="login_label">Name</label>
                    <input id="register-name"  className="register_input"  type="text" onChange={(e) => setName(e.target.value)}></input>

                    <label htmlFor="register-password" className="login_label">Password</label>
                    <input id="register-password" className="register_input"  type="password" onChange={(e) => setPassword(e.target.value)}></input>
                    <label htmlFor="register-password-verify" className="login_label">Verify password</label>
                    <input id="register-password-verify"  className="register_input"  type="password" onChange={(e) => setPasswordCheck(e.target.value)}></input>

                    <input type="submit" value="Register"></input>
                </form>
            </div>
            
        </div>
    )
}

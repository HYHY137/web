import React, { useState, useContext } from 'react';
import UserContext from "../../../context/UserContext";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import ErrorNotice from '../../misc/ErrorNotice';
import Axios from 'axios';
import '../Auth.scss';
import Form from '../../misc/Form';

export default function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const history = useHistory();
    const { setUserData } = useContext(UserContext);


    const submit = async (e) => {
        e.preventDefault();
        try {
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
    const form = {
        formClass: "login_input_fields",
        fields: [
            {   label: { htmlFor: "login-email", className: "login_label", text: "Email"},
                input: { id: "login-email", required: true, placeholder:"Enter your email", className: "login_input", type: "email", onChange: (e) => setEmail(e.target.value)}
            },
            {   
                label: { htmlFor: "login-password", className: "login_label", text: "Password"},
                input: { id: "login-password", required: true, placeholder:"Enter your password", className: "login_input", type: "password", onChange: (e) => setPassword(e.target.value)}
            }
        ],
        button: {className:"login_button", value:"Login"}
        }

    return (
        <div className="login">
            <div className="login_form">
                <h2 className="login_form_header">Welcome!</h2>
                {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
                <Form onSubmit={submit}  formClass={form.formClass} fields={form.fields} button={form.button}/>
                <div className="link_to_register">
                    <p>Don't have an account?     </p>
                    <Link to="/register">Sign up.</Link>
                </div>

            </div>
        </div>
    )
}





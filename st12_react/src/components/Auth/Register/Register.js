import React,{ useState, useContext } from 'react';
import UserContext from "../../../context/UserContext";
import { useHistory } from "react-router-dom";
import '../Auth.scss';
import Axios from 'axios';
import ErrorNotice from '../../misc/ErrorNotice';
import Form from '../../misc/Form';

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
    const form = {
        formClass: "login_input_fields",
        fields: [
            {   label: { htmlFor: "register-email", className: "login_label", text: "Email"},
                input: { id: "register-email", required: "true", placeholder:"example@gmail.com", className: "register_input", type: "email", onChange: (e) => setEmail(e.target.value)}
            },
            {   
                label: { htmlFor: "register-phone", className: "login_label", text: "Phone"},
                input: { id: "register-phone", required: "true", placeholder:"exapmle: +375291284567", className: "register_input", type: "phone", onChange: (e) => setPhoneNumber(e.target.value)}
            },
            {   
                label: { htmlFor: "register-name", className: "login_label", text: "Name"},
                input: { id: "register-name", required: "false", placeholder:"exapmle: Alex", className: "register_input", type: "text", onChange: (e) => setName(e.target.value)}
            },
            {   
                label: { htmlFor: "register-password", className: "login_label", text: "Password"},
                input: { id: "register-password", required: "true", placeholder:"no less 6 char.", className: "register_input", type: "password", onChange: (e) => setPassword(e.target.value)}
            },
            {   
                label: { htmlFor: "register-password-verify", className: "login_label", text: "Verify Password"},
                input: { id: "register-password-verify", required: "true", placeholder:"Repeat your password", className: "register_input", type: "password", onChange: (e) => setPasswordCheck(e.target.value)}
            }
        ],
        button: {className:"register_button", value:"Register"}
        }

    return (
        <div className="register">
            <div className="register_form">
                <h2 className="login_form_header">Welcome!</h2>
                {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
                <Form onSubmit={submit}  formClass={form.formClass} fields={form.fields} button={form.button}/>
            </div>
            
        </div>
    )
}

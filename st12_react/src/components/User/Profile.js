import React,{ useState, useContext, useEffect } from 'react';
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom";
import '../Auth/Auth.scss';
import Axios from 'axios';
import ErrorNotice from '../misc/ErrorNotice';
import Form from '../misc/Form';

export default function Profile() {
    const { userData, setUserData } = useContext(UserContext);
    const [email, setEmail] = useState(userData.user.email);
    const [phoneNumber, setPhoneNumber] = useState(userData.user.phoneNumber);
    const [name, setName] = useState(userData.user.name);
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [error, setError] = useState();

    const history = useHistory();
    const form = {
        formClass: "login_input_fields",
        fields: [
            {   label: { htmlFor: "register-email", className: "login_label", text: "Email"},
                input: { id: "register-email", placeholder:"example@gmail.com", value: userData.user.email, className: "register_input", type: "email", onChange: (e) => setEmail(e.target.value)}
            },
            {   
                label: { htmlFor: "register-phone", className: "login_label", text: "Phone"},
                input: { id: "register-phone", placeholder:"exapmle: +375291284567", value: userData.user.phoneNumber, className: "register_input", type: "phone", onChange: (e) => setPhoneNumber(e.target.value)}
            },
            {   
                label: { htmlFor: "register-name", className: "login_label", text: "Name"},
                input: { id: "register-name", placeholder:"exapmle: Alex", value: userData.user.name, className: "register_input", type: "text", onChange: (e) => setName(e.target.value)}
            },
            {   
                label: { htmlFor: "register-password", className: "login_label", text: "Password"},
                input: { id: "register-password", placeholder:"Input new password", className: "register_input", type: "password", onChange: (e) => setPassword(e.target.value)}
            },
            {   
                label: { htmlFor: "register-password-verify", className: "login_label", text: "Verify Password"},
                input: { id: "register-password-verify", placeholder:"Input new password once again", className: "register_input", type: "password", onChange: (e) => setPasswordCheck(e.target.value)}
            }
        ],
        button: {className:"register_button", value:"Save"}
    }

 


    var config = {
        headers: { "x-auth-token": userData.token }
      };

    const submit = async (e) =>{
        e.preventDefault();
        
        try{
            const newUser = { email, phoneNumber, name, password, passwordCheck, id: userData.user.id};
            await Axios.put("http://localhost:5000/user/"+userData.user.id, newUser, config);
            if (newUser.name || !newUser.name===""){
            setUserData({
                token: userData.token,
                user: newUser,
            });
            }else{
                newUser.name = newUser.email;
                setUserData({
                    token: userData.token,
                    user: newUser,
                });
            }
            history.push("/user/profile");
        } catch(err){
            err.response.data.msg && setError(err.response.data.msg);
        }
    }  

    return (
        <div className="register_form" style={{height: "75vh"}}>
            <h2 className="login_form_header">Your profile:</h2>
            {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
            <Form onSubmit={submit}  formClass={form.formClass} fields={form.fields} button={form.button}/>
        </div>
    )
}

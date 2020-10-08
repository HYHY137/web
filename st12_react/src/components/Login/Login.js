import React from 'react';
import { useHistory } from 'react-router-dom';
import './Login.scss';

export default function Login() {
    const history = useHistory();
    const register = () => history.push("/register");

        return (
            <div className="login">
                <div className="login_form">
                    <form>
                        
                    </form>
                    <button onClick={register}>Register</button>
                </div>
            </div>
        )
    }





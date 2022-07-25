import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { CartState } from '../context/Context';
import api from '../helper/api';

import '../stylesheets/FormLogin.css';


const FormLogin = ( ) => {
    
    const {dispatch} = CartState();
    const history = useHistory();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (event) => {
        event.preventDefault();

        api.auth.login({"user": { 
                        "email": login, 
                        "password": password}})
                .then(res => {
                    localStorage.setItem("token", res.headers.authorization);
                    dispatch({type: 'login'})
                    history.push('/items')})
                .catch( error => {
                    alert(error.message)
                })
    }

    const onChange = (event) => {
        const {name, value} = event.target;
        name === 'login' ? setLogin(value) : setPassword(value);
    }

    return (
        <div className="login-box">
            <h2>Login</h2>
            <form onSubmit={onSubmit}>
                <div className="user-box">
                    <label>Username</label>
                    <input onChange={onChange} type="text" name="login" required=""/> 
                </div>
                <div className="user-box">
                    <label>Password</label>
                    <input onChange={onChange} type="password" name="password" required=""/>
                </div>
                <div className='login_buttons'>
                    <button className="mybutton">Submit</button>
                    <Link to="/signup"><button className="mybutton">Sign Up</button></Link>
                </div>
            </form>
        </div>
    )
}

export default FormLogin;   
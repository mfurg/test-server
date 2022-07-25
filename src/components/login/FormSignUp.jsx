import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CartState } from '../context/Context';
import api from '../helper/api';

import '../stylesheets/FormLogin.css';


const FormSignUp = ( ) => {
    
    const {dispatch} = CartState();
    const history = useHistory();
    const [currentUser, setCurrentUser] = useState({});

    const onSubmit = (event) => {
        event.preventDefault();
        api.auth.register({"user": { 
            "email": currentUser.login, 
            "password": currentUser.password,
            "first_name": currentUser.first_name,
            "last_name": currentUser.last_name,
            "role": "user"}})
            .then(res => {
                localStorage.setItem("token", res.headers.authorization);
                dispatch({type: 'login'})
                history.push('/items')})
            .catch( error => alert(error.message))
    }

    const onChange = (event) => {
        const {name, value} = event.target;
        setCurrentUser({...currentUser, [name]: value});
    }

    return (
        <div className="login-box">
            <h2>Sign In</h2>
            <form onSubmit={onSubmit}>
                <div className="user-box">
                    <label>Username</label>
                    <input onChange={onChange} type="email" name="login" required/> 
                </div>
                <div className="user-box">
                    <label>Password</label>
                    <input onChange={onChange} type="password" minlength={6} name="password" required/>
                </div>
                <div className="user-box">
                    <label>First Name</label>
                    <input onChange={onChange} type="text" name="first_name" required/>
                </div>
                <div className="user-box">
                    <label>Last Name</label>
                    <input onChange={onChange} type="text" name="last_name" required/>
                </div>
                <button className="mybutton">Submit</button>
            </form>
        </div>
    )
}

export default FormSignUp;   
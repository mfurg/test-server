import React, {useState} from 'react';
import { CartState } from '../context/Context';
import api from '../helper/api';

import '../stylesheets/FormLogin.css';


const FormUserAdd = ( {setVisible} ) => {

    const [currentUser, setCurrentUser] = useState({role: 'user'});
    const {dispatch} = CartState();

    const onSubmit = (event) => {
        event.preventDefault();
        api.users.add(currentUser)
            .then(() => {
                setVisible(false)
                alert('new user added')
                api.users.all()
                    .then(response => {
                        dispatch({type: 'items', payload: {users: response.data}})
                    }).catch( error => console.log(error))
            })
    }

    const onChange = (event) => {
        const {name, value} = event.target;
        setCurrentUser({...currentUser, [name]: value});
    }

    return (
        <div className="login-box">
            <h2>Add user</h2>
            <form onSubmit={onSubmit}>
                <div className="user-box">
                    <label>Login</label>
                    <input onChange={onChange} type="text" name="email" required/> 
                </div>
                <div className="user-box">
                    <label>Password</label>
                    <input onChange={onChange} type="text" name="password" required/> 
                </div>
                <div className="user-box">
                    <label>First Name</label>
                    <input onChange={onChange} type="text" name="first_name" required/> 
                </div>
                <div className="user-box">
                    <label>Last Name</label>
                    <input onChange={onChange} type="text" name="last_name" required/>
                </div>
                <div className='login_buttons'>
                    <button className="mybutton">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default FormUserAdd;   
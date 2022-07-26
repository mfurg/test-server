import { useState, useEffect } from "react";
import api from "../helper/api";

import MyModal from "../helper/MyModal";
import FormUserEdit from "./FormUserEdit";

const User = ({currentUser}) => {

    const [modal, setModal] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        setUser(currentUser);
    } ,[currentUser])

    const refreshUser = () => {
        api.auth.me().then( response => setUser(response.data)).catch( error => console.log(error.message));
    }
    
    return (
        <div>
            <h1>User info</h1>
            <MyModal visible={modal} setVisible={setModal}> 
                <FormUserEdit setUsers={refreshUser} setVisible={setModal} user={user}/>
            </MyModal>
            <div className='user'>
                <div>
                    <strong>Login: { user.email }</strong>
                    <div>First Name: {user.first_name}</div>
                    <div>Last Name: {user.last_name}</div>
                    <div>User role: {user.role}</div>
            </div>
                <div><button className='user_btns' onClick={() => setModal(true)}>Edit</button></div>
            </div>
        </div>)
}

export default User;
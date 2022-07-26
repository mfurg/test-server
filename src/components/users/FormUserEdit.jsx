import { useState } from "react";
import api from "../helper/api";

const FormUserEdit = ({user, setVisible, setUsers}) => {

    const [currentUser, setCurrentUser] = useState({});

    const onSubmit = (event) => {
        event.preventDefault();
        api.users.edit(currentUser, user.id)
            .then(() => {
                setVisible(false)
                alert('new item edited')
                api.users.all()
                    .then(response => setUsers(response.data))
                    .catch( error => alert(error))
            })
    }

    const onChange = (event) => {
        const {name, value} = event.target;
        setCurrentUser({...currentUser, [name]: value});
    }

    return (
        <div className="login-box">
            <h2>Edit User</h2>
            <form onSubmit={onSubmit}>
                <div className="user-box">
                    <label>First name</label>
                    <input onChange={onChange} defaultValue={user.first_name} type="text" name="first_name" required/> 
                </div>
                <div className="user-box">
                    <label>Last name</label>
                    <input onChange={onChange} defaultValue={user.last_name} type="text" name="last_name" required/>
                </div>
                <div className='login_buttons'>
                    <button className="mybutton">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default FormUserEdit;
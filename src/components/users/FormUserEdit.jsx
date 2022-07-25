import { useState } from "react";
import { CartState } from "../context/Context";
import api from "../helper/api";

const FormUserEdit = ({editId, setVisible}) => {

    const [currentUser, setCurrentUser] = useState({});
    const {dispatch} = CartState();

    const onSubmit = (event) => {
        event.preventDefault();
        api.users.edit(currentUser, editId)
            .then(() => {
                setVisible(false)
                alert('new item edited')
                api.users.all()
                    .then(response => {
                        dispatch({type: 'users', payload: {users: response.data}})
                    })
                    .catch( error => alert(error))
            })
    }

    const onChange = (event) => {
        const {name, value} = event.target;
        setCurrentUser({...currentUser, [name]: value});
    }

    return (
        <div className="login-box">
            <h2>Edit {editId} User</h2>
            <form onSubmit={onSubmit}>
                <div className="user-box">
                    <label>Name</label>
                    <input onChange={onChange} type="text" name="first_name" required/> 
                </div>
                <div className="user-box">
                    <label>Description</label>
                    <input onChange={onChange} type="text" name="last_name" required/>
                </div>
                <div className='login_buttons'>
                    <button className="mybutton">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default FormUserEdit;
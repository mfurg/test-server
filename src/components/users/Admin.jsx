import { useEffect, useState } from "react";
import { CartState } from "../context/Context";
import api from "../helper/api";

import MyModal from "../helper/MyModal";
import FormUserEdit from "./FormUserEdit";
import FormUserAdd from "./FormUsersAdd";

const Admin = () => {
    
    const {state: {users}, dispatch} = CartState();
    const [filteredResults, setFilteredResults] = useState([]);
    const [modal, setModal] = useState(false);
    const [editId, setEditId] = useState('');
    const [action, setAction] = useState('');
    // Get users from server, 
    // modal true or false for visible of edit or add Forms
    // action for conditional rendering Forms, can be 'add' or 'edit'
    // get id for Edit Form
    // using filteredResults (copy of items from state) only in this component for search

    useEffect(() => {
        setFilteredResults(users);
    },[users])

    const deleteUser = (id) => {
        api.users.delete(id)
        .then(() => {
            api.users.all()
                .then(response => {
                    dispatch({type: 'users', payload: {users: response.data}})
                    alert('user id ' + id + ' deleted')})
                .catch( error => console.log(error))})
        .catch((error) => console.log(error.message))
    }

    const searchItems = (e) => {
        const {value} = e.target;
        // is search query non empty?
        if(value) {
            const filteredData = users.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(value.toLowerCase())
            })
            setFilteredResults(filteredData)
        } else {
            setFilteredResults(users)
        } 
      }
console.log(filteredResults)
    return (
        <div>
        <MyModal visible={modal} setVisible={setModal}>
            {action === 'add' 
                ? <FormUserAdd setVisible={setModal}/>
                : <FormUserEdit setVisible={setModal} editId={editId}/>}
        </MyModal>
        <button onClick={() => {
          setModal(true)
          setAction('add')
        }}>Add user</button>
        <input icon='search' placeholder='Search...' onChange={searchItems}/>

        {filteredResults?.map((item) => (
            <div key={item.id}>
                <div className='user'>
                    <div>
                        <strong>Login: { item.email }</strong>
                        <div>First Name: {item.first_name}</div>
                        <div>Last Name: {item.last_name}</div>
                        <div>User role: {item.role}</div>
                        <div>id: {item.id}</div>
                    </div>
                    <div>
                        <button className='user_btns'onClick={() => {
                                setEditId(item.id)
                                setModal(true)
                            }}>Edit</button>
                        <button className='user_btns' onClick={() => deleteUser(item.id)}>Delete</button>
                    </div>
                </div>
            </div>
        ))}
    </div>)
}

export default Admin;
import { useEffect, useState } from "react";
import api from "../helper/api";

import MyModal from "../helper/MyModal";
import FormUserEdit from "./FormUserEdit";
import FormUserAdd from "./FormUsersAdd";

const Admin = () => {

    const [users, setUsers] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [modal, setModal] = useState(false);
    const [editId, setEditId] = useState('');
    const [action, setAction] = useState('');

    useEffect(() => {
        api.users.all()
            .then((response) => {
                setUsers(response.data)
                setFilteredResults(response.data)})
            .catch(error => console.log(error.message))
    },[])

    const deleteUser = (id) => {
        api.users.delete(id)
        .then(() => {
            alert('user id ' + id + ' deleted')
            api.users.all()
                .then(response => setFilteredResults(response.data))
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
      
    return (
        <div>
        <MyModal visible={modal} setVisible={setModal}>
            {action === 'add' 
                ? <FormUserAdd setVisible={setModal} setUsers={setFilteredResults}/>
                : <FormUserEdit setVisible={setModal} editId={editId} setUsers={setFilteredResults}/>}
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
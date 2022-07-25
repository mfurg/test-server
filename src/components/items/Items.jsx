import {useEffect, useState} from 'react';
import {CartState} from '../context/Context';
import api from '../helper/api';

import Item from './Item'; 
import MyModal from '../helper/MyModal';
import FormAddItem from './FormAddItem';
import FormEditItem from './FormEditItem';  

const Items = ( ) => { 
  
  const {state: {user, items}} = CartState();
  const [modal, setModal] = useState(false);
  const [action, setAction] = useState('edit');
  const [editId, setEditId] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
  // Get items from context state for the first time, 
  // modal true or false for visible of edit or add Forms
  // action for conditional rendering Forms, can be 'add' or 'edit'
  // get id from component Item for Edit Form
  // using filteredResults (copy of items from state) only in this component for search

  useEffect(() => {
    setFilteredResults(items);
  },[items])
  
  const deleteItem = (id) => {
    api.items.delete(id)
      .then(() => {
        api.items.all().then(response => {
          // refreshing our items after delete
          setFilteredResults(response.data)
          alert('item ' + id + ' deleted')
        }).catch( error => console.log(error))})
      .catch((error) => console.log(error.message))
  }

  const searchItems = (e) => {
    const {value} = e.target;
    // is search query non empty?
    if(value) {
        const filteredData = items.filter((item) => {
            return Object.values(item).join('').toLowerCase().includes(value.toLowerCase())
        })
        setFilteredResults(filteredData)
    } else {
        setFilteredResults(items)
    } 
  }

  const edit = (id) => {
    setModal(true)
    setAction('edit')
    setEditId(id)
  }
  
  return (
    <div>
      <h1>Items</h1>
      {user.role === 'admin' && <button onClick={() => {
          setModal(true)
          setAction('add')
        }}>Add item</button>}
        <input icon='search' placeholder='Search...' onChange={searchItems}/>

        <MyModal visible={modal} setVisible={setModal}>
          {action === 'edit' 
              ? <FormEditItem setVisible={setModal} editId={editId}/> 
              : <FormAddItem setVisible={setModal}/> }
        </MyModal>

      {filteredResults.map(item => (
        <Item item={item} role={user.role} edit={edit} deleteItem={deleteItem} key={item.id}/>
      ))}
    </div>)
}

export default Items;             
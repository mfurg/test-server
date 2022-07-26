import {useCallback, useEffect, useState} from 'react';
import {CartState} from '../context/Context';
import api from '../helper/api';

import Item from './Item'; 
import MyModal from '../helper/MyModal';
import FormAddItem from './FormAddItem';
import FormEditItem from './FormEditItem';  

const Items = ( ) => { 
  
  const {state: {user}} = CartState();
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [modal, setModal] = useState(false);
  const [action, setAction] = useState('edit');
  const [editId, setEditId] = useState(0);

  useEffect(() => {
    getItems();
  },[searchQuery])
  
  const getItems = useCallback(() => {
    api.items.all(searchQuery)
      .then(response => setItems(response.data))
      .catch(error => console.log(error))
  },[searchQuery])

  const deleteItem = (id) => {
    api.items.delete(id)
      .then(() => {
        api.items.all().then(response => {
          // refreshing our items after delete
          setItems(response.data)
          alert('item ' + id + ' deleted')
        }).catch( error => console.log(error))})
      .catch((error) => console.log(error.message))
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
        <input icon='search' placeholder='Search...' onChange={(e) => setSearchQuery(e.target.value)}/>

        <MyModal visible={modal} setVisible={setModal}>
          {action === 'edit' 
              ? <FormEditItem setVisible={setModal} editId={editId} setItems={setItems}/> 
              : <FormAddItem setVisible={setModal} setItems={setItems}/> }
        </MyModal>

      {items.map(item => (
        <Item item={item} role={user.role} edit={edit} deleteItem={deleteItem} key={item.id}/>
      ))}
    </div>)
}

export default Items;             
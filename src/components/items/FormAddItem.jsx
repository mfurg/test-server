import React, {useState} from 'react';
import api from '../helper/api';
import { CartState } from '../context/Context';

import '../stylesheets/FormLogin.css';


const FormAddItem = ( {setVisible} ) => {

    const {dispatch} = CartState();
    const [currentItem, setCurrentItem] = useState({});

    const onSubmit = (event) => {
        event.preventDefault();
        api.items.add(currentItem)
            .then(() => {
                setVisible(false)
                alert('new item added')
                api.items.all().then(response => {
                    dispatch({type: 'items', payload: {items: response.data}})
                  }).catch( error => console.log(error))
            })
        

    }

    const onChange = (event) => {
        const {name, value} = event.target;
        setCurrentItem({...currentItem, [name]: value});
    }

    return (
        <div className="login-box">
            <h2>Add item</h2>
            <form onSubmit={onSubmit}>
                <div className="user-box">
                    <label>Name</label>
                    <input onChange={onChange} type="text" name="name" required/> 
                </div>
                <div className="user-box">
                    <label>Description</label>
                    <input onChange={onChange} type="text" name="description" required/>
                </div>
                <div className="user-box">
                    <label>Price</label>
                    <input onChange={onChange} type="number" min="1" name="price" required/>
                </div>
                <div className='login_buttons'>
                    <button className="mybutton">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default FormAddItem;   
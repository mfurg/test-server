import React from 'react';
import api from '../helper/api';

import '../stylesheets/FormLogin.css';

const FormOrder = ( {setVisible, cart, total} ) => {

    const order = {
        "amount": total,
        "items": cart
    }

    const onSubmit = (event) => {
        event.preventDefault();
        api.orders.add(order)
            .then(() => {
                setVisible(false);
                alert('order added')})
            .catch(error => alert(error.message))
    }

    return (
        <div>
            <h2>Submit order total: {total}</h2>
            <form onSubmit={onSubmit}>
                {cart.map(item => (
                <div className="order" key={item.name}>
                    <div className='order_content'>
                        <strong>{ item.name }</strong>
                    </div>
                    <div className='order_content'>
                        <div>Description: {item.description}</div>
                    </div>
                    <div className='order_content'>
                        <div>Price: {item.price}</div>
                    </div>
                    <div className='order_content'>
                        <div>Q-ty: {item.quantity}</div>
                    </div>
                </div>
                ))}
                <div className='login_buttons'>
                    <button className="mybutton">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default FormOrder;   
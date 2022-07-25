import {useState, useEffect} from 'react';

import '../stylesheets/Orders.css';

import { CartState } from '../context/Context';
import MyModal from '../helper/MyModal'
import FormOrder from './FormOrder';

const Cart = () => {

    const {state: {cart}, dispatch} = CartState();
    const [total, setTotal] = useState([]);
    const [modal, setModal] = useState(false)

    useEffect(() => {
        setTotal(cart.reduce((acc, current) => acc + Number(current.price) * current.quantity, 0 ));
    }, [cart])

    return (
        <div>
            <h3>Total: {total}</h3>
            <MyModal visible={modal} setVisible={setModal} >
                <FormOrder setVisible={setModal} cart={cart} total={total}/>
            </MyModal>
            {cart.map(item => (
            <div className="order" key={item.name}>
                <div className='order_content'>
                    <strong>{ item.name }</strong>
                    <div>{item.description}</div>
                    <div>Price: {item.price}</div>
                </div>
                <div>
                    <input type="number" min="1" value={item.quantity} style={{maxWidth: "50px"}} onChange={(e) => 
                        dispatch({
                            type: 'qty',
                            payload: {
                                id: item.id,
                                quantity: e.target.value
                            }})}/>
                    <button onClick={() => dispatch({
                        type: 'remove',
                        payload: item.id
                    })}>Remove from order</button>
                </div>
            </div>))}
            {cart.length !== 0 && <button onClick={() => setModal(true)}>Buy</button>}
        </div>)
}

export default Cart;
import { CartState } from '../context/Context';
import '../stylesheets/Items.css';

const Item = ( {item, deleteItem, edit, role} ) => {

  const {state: {cart}, dispatch} = CartState();

  return (
    <div className="item" key={item.id}>
      <div className='item_content'>
        <strong>{item.id}. {item.name}</strong>
        <div>{item.description}</div>
        <div>price: {item.price}</div>
      </div>
        {role === 'admin' 
        ? <div>
            <button className='item_btns' onClick={() => edit(item.id)}>Edit</button>
            <button onClick={() => deleteItem(item.id)}  className='item_btns'>Delete</button> 
          </div>
        // checking in cart if there is an item, render button Buy or Remove  
        : cart.some( p => p.id === item.id) 
          ? <div>
              <button className='item_btns' onClick={() => dispatch({
                type: 'remove',
                payload: item.id
              })}>Remove from cart</button>
            </div>
          : <div>
              <button className='item_btns' onClick={() => dispatch({
                type: 'add',
                payload: item
              })}>Buy</button>
            </div>}
      </div>
  )
}

export default Item;
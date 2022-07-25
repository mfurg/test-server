import { useEffect, useState } from "react";
import api from "../helper/api";

import '../stylesheets/Orders.css';

const Order = () => {

    const [orders,setOrders] = useState([]);

    useEffect(() => {
        api.orders.all()
            .then(response => {
                setOrders(response.data)
            })
    },[])
    console.log(orders)
    return(
        orders.map((item) => (
            <div className="order" key={item.id}>
                <div className='order_content'>
                    <strong>Order {item.id} created at {item.created_at}</strong>
                    <div>
                    {item.orders_descriptions.map(d => (
                            <div className='order_content' key={d.created_at}>
                                <hr />
                                <div>Item name: {d.item?.name || '-'}</div>
                                <div>Item description: {d.item?.description || '-'}</div>
                                <div>Price: {d.item?.price || '-'}</div>
                                <div>Q-ty: {d.quantity}</div>
                            </div>
                        ))}
                    </div>
                    <hr />
                    <div>Amount: {item.amount}</div>
                </div>
            </div>
        ))
    )

}

export default Order;
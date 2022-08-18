import {NavLink} from "react-router-dom";
import { CartState } from "./context/Context";

import './stylesheets/App.css';

const Navbar = () => {

    const {state: {cart, isAuth, user}, dispatch} = CartState();

    return (
			isAuth &&
				<div className="navbar">
					<div className="navbar_item"><NavLink activeStyle={{color: "black", fontWeight: "bold"}} to="/items">Items</NavLink></div>
					<div className="navbar_item"><NavLink activeStyle={{color: "black", fontWeight: "bold"}} to="/user">User</NavLink></div>
					{user.roles[0] === 'user' && <> <div className="navbar_item"><NavLink activeStyle={{color: "black", fontWeight: "bold"}} to="/cart">Cart {cart.length}</NavLink></div>
					<div className="navbar_item"><NavLink activeStyle={{color: "black", fontWeight: "bold"}} to="/orders">Orders</NavLink></div></>}
					<div className="navbar_item"><button onClick={() => {
							dispatch({type: 'logout'})
							localStorage.setItem("token", '');
					}}> Log out </button></div>
				</div>)
}

export default Navbar;
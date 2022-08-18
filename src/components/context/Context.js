import { createContext, useContext, useEffect, useReducer} from "react";
import api from "../helper/api";
import {cartReducer} from './Reducer'

const Cart = createContext();

const Context = ({children}) => {
    // initialize items and user for conditional rendering
    // user.role: admin or user
    const initState = {cart: [], isAuth: false, user: {}};
    const [state, dispatch] = useReducer(cartReducer, initState)

    
    return  <Cart.Provider value={{state, dispatch}}>
                {children}
            </Cart.Provider>
}

export default Context;

export const CartState = () => {
    return useContext(Cart)
}
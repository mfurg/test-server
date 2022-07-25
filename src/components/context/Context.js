import { createContext, useContext, useEffect, useReducer} from "react";
import api from "../helper/api";
import {cartReducer} from './Reducer'

const Cart = createContext();

const Context = ({children}) => {
    // initialize items and user for conditional rendering
    // user.role: admin or user
    const initState = {items: [], cart: [], isAuth: false, user: {}, users: []};
    const [state, dispatch] = useReducer(cartReducer, initState)

    //axios request to the server is async, so we cant initialize items and user through initState
    const getItems = async () => {
        const response = await api.items.all();
        dispatch({type: 'items', payload: {items: response.data}})
    }

    const getUser = async () => {
        const response = await api.auth.me();
        dispatch({type: 'user', payload: {user: response.data}})
    }

    const getUsers = async () => {
        const response = await api.users.all();
        dispatch({type: 'users', payload: {users: response.data}})
    }

    useEffect(() => {
        //only if user is log in now
        if(state.isAuth){
            getItems();
            getUser();
            getUsers();
        }
    }, [state.isAuth])

    
    return  <Cart.Provider value={{state, dispatch}}>
                {children}
            </Cart.Provider>
}

export default Context;

export const CartState = () => {
    return useContext(Cart)
}
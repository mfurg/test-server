import {Switch, Route, Redirect} from "react-router-dom";

import { CartState } from "./context/Context";

import Items from "./items/Items";
import FormLogin from "./login/FormLogin";
import FormSignUp from "./login/FormSignUp";
import Users from "./users/Users"
import Cart from "./orders/Cart";
import Order from './orders/Order'



const AppRouter = () => {

    const {state: {isAuth, user}} = CartState();
    return (
         isAuth ? <Switch> 
                    <Route component={Items} path='/items'/>
                    <Route component={Users} path='/user'/>
                    {user.roles[0] === 'user' && <> <Route component={Cart} path='/cart'/>
                    <Route component={Order} path='/orders'/></>}
                    <Route component={Items} path='/'/>
                    <Redirect to='/'/>
                </Switch>
                : <Switch>
                    <Route component={FormLogin} path='/login'/>
                    <Route component={FormSignUp} path='/signup'/>
                    <Redirect to='/login'/>
                </Switch>
    )
}

export default AppRouter;
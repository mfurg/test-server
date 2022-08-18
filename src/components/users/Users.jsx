import { CartState } from "../context/Context";

import User from "./User";
import Admin from "./Admin";

import '../stylesheets/User.css';

const Users = () => {

    const {state: {user}} = CartState();

    return user.roles[0] === 'user' 
        ? <User currentUser={user}/> 
        : <Admin />
}

export default Users;

export const cartReducer = (state, action) => {
    switch(action.type) {
        case 'user': //get current user from axios response
            const { user } = action.payload;
            return {...state, user}

        case 'add': //add item
            return {...state, cart: [...state.cart, {...action.payload, quantity: 1}]}

        case 'remove': //remove item
            return {...state, cart: state.cart.filter(c => c.id !== action.payload)};

        case 'qty': //add item quantity
            return {...state, cart: state.cart.filter(c => c.id === action.payload.id ? (c.quantity = action.payload.quantity) : c.quantity)}

        case 'login': //user login
            return {...state, isAuth: true}

        case 'logout': //user log out
            return {...state, isAuth: false}
            
        default: 
            return state

    }
}
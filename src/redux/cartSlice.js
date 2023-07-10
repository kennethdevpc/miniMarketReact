import {createSlice, current} from '@reduxjs/toolkit';

// Se Define el estado inicial del carrito
const initialState = {
    products: [],
    cart: [],
    showCart: false,
};

export const cartSlice = createSlice({
    name: 'cart',   //el nombre
    initialState,   //el estado
    reducers: {     //el reducer recibe inmediatamente la accion
        addToCart: (state, action) => {
            const productIncart = state.cart.findIndex(item => current(item).id === action.payload.id)
            if (productIncart >= 0) {
                let priceProduct = action.payload.price
                state.cart[productIncart].quantity += 1;
                state.cart[productIncart].totalPrice += priceProduct;

            } else {
                let priceProduct = action.payload.price
                let newCart = action.payload;
                newCart = Object.assign({}, action.payload);
                newCart.quantity = 1;
                newCart.totalPrice =priceProduct ;
                state.cart.push(newCart)
            }
        },
        restToCart: (state, action) => {
            const productIncart = state.cart.findIndex(item => current(item).id === action.payload.id)
            if (productIncart >= 0 && state.cart[productIncart].quantity>0) {
                let priceProduct = action.payload.price
                state.cart[productIncart].quantity -= 1;
                state.cart[productIncart].totalPrice -= priceProduct;

            }

        },
        removeFromCart: (state, action) => {
            const cartIdToRemove = action.payload;
            state.cart = state.cart.filter(
                (cart) => cart.id !== cartIdToRemove.id
            );
        },
        clearCart: (state, action) => {
            const cartIdToRemove = [];
            state.cart = [];
        },
        addProduct: (state, action) => {
            const newProduct = action.payload;
            state.products.push(newProduct);
        },
        ShowCart: (state, action) => {
            state.showCart=action.payload;
        },
    },
});

export const {
    addToCart,
    restToCart,
    removeFromCart,
    addProduct,
    clearCart,
    ShowCart
} = cartSlice.actions;

export default cartSlice.reducer;
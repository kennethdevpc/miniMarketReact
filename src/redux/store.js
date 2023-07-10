import { configureStore } from '@reduxjs/toolkit';
// Importa tus slices aquí
import cartReducer from './cartSlice'; //este es el reducer

// Crea el store utilizando configureStore()
const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
});

export { store};
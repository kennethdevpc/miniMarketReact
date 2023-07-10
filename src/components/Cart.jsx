import './Cart.css'

import {useId} from 'react'
import {CartIcon, ClearCartIcon} from './Icons.js'
import {addToCart, clearCart, removeFromCart,restToCart} from "../redux/cartSlice";

import {useDispatch, useSelector} from "react-redux";

//import { useCart } from '../hooks/useCart.js'
import {Wompi} from "./Wompi.js";

function CartItem({thumbnail, price, title, quantity,totalPrice, addToCart,restToCart}) {

    return (
        <li>
            <small className="circle-background">
                {quantity}
            </small>
            <img
                src={thumbnail}
                alt={title}
            />


            <footer >
                <label>
                    <small>{title}:</small>  ${totalPrice}
                </label>

                <label>
                <button onClick={(product)=>restToCart()}>-
                </button>
                <button onClick={(product)=>addToCart()}>+
                </button>
                </label>

            </footer>
        </li>
    )
}

export function Cart() {
    const cartCheckboxId = useId()
    const dispatch = useDispatch();
    const carts = useSelector((state) => state.cart.cart);
    const showCart = useSelector((state) => state.cart.showCart);

    //const { cart, clearCart, addToCart } = useCart()
    const handlerClearCart = () => {
        dispatch(clearCart());
    };

    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    };
    const handleRestToCart = (product) => {
        dispatch(restToCart(product));
    };


    return (
        <>
            {showCart ? <aside className='cart'>
                <ul>
                    <h4>
                       Shopping Cart
                    </h4>

                </ul>

                {<ul>
                    {carts.map(product => (
                        <div>
                            <CartItem
                            key={product.id}

                            addToCart={() => {handleAddToCart(product)
                            }}
                            restToCart={() => {handleRestToCart(product)
                            }}
                            {...product}


                        /></div>


                    ))}
                </ul>

                }

                <button onClick={() => handlerClearCart()}>
                    <ClearCartIcon/>
                </button>

            </aside> : "Agrega Productos a tu carrito!"}
            <button onClick={() => handlerClearCart()}>
                    Pagar con wompi
                <Wompi/>
            </button>
            <Wompi/>
        </>
    )
}

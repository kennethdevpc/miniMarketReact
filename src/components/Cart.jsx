import './Cart.css'

import {useEffect, useId} from 'react'
import {ClearCartIcon} from './Icons.js'
import {addToCart, clearCart, restToCart} from "../redux/cartSlice";
import {useDispatch, useSelector} from "react-redux";
import {Wompi} from "./Wompi.js";

function CartItem({thumbnail, price, title, quantity, totalPrice, addToCart, restToCart}) {

    return (
        <li>
            <small className="circle-background" data-testid="quantityVAlue">
                {quantity}
            </small>
            <img
                src={thumbnail}
                alt={title}
            />
            <footer>
                <label>
                    <small>{title}:</small> ${totalPrice}
                </label>

                <label>
                    <button onClick={(product) => restToCart()}>-
                    </button>
                    <button onClick={(product) => addToCart()}>+
                    </button>
                </label>
            </footer>
        </li>
    )
}

export function Cart() {
    const cartCheckboxId = useId()
    const dispatch = useDispatch();
    let carts = useSelector((state) => state.cart.cart);
    const showCart = useSelector((state) => state.cart.showCart);

    useEffect(() => {
        const savedCarts = localStorage.getItem('cart', JSON.stringify(carts));
        if (savedCarts && savedCarts.length > 0) {
            const parsedCarts = JSON.parse(savedCarts)
            parsedCarts.map((e) => {
                dispatch(addToCart(e))
            })
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(carts));
    }, [carts]);

    const handlerClearCart = () => {
        dispatch(clearCart());
    };

    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
        localStorage.setItem('cart', JSON.stringify(carts));

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

                                addToCart={() => {
                                    handleAddToCart(product)
                                }}
                                restToCart={() => {
                                    handleRestToCart(product)
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
            {/*pendiente wompi porque no pude obtener la key*/}
            <button onClick={() => handlerClearCart()}>
                Pagar con wompi
                <Wompi/>
            </button>
            <Wompi/>
        </>
    )
}

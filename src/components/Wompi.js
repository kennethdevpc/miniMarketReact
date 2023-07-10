import './Cart.css'

import {useId} from 'react'
import {CartIcon, ClearCartIcon} from './Icons.js'
import {addToCart, clearCart, removeFromCart,restToCart} from "../redux/cartSlice";

import {useDispatch, useSelector} from "react-redux";

//import { useCart } from '../hooks/useCart.js'

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

export function Wompi() {


    return (

                <form>
                    <script
                        src="https://checkout.wompi.co/widget.js"
                        data-render="button"
                        data-public-key="pub_prod_LGYhtsTtUvNyRRP03wC4OijwUBCmj2yP"
                        data-currency="COP"
                        data-amount-in-cents="4950000"
                        data-reference="4XMPGKWWPKWQ"
                        data-signature-integrity="37c8407747e595535433ef8f6a811d853cd943046624a0ec04662b17bbf33bf5"
                    >
                    </script>
                </form>

    )
}

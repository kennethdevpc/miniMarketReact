import './Products.css'
import { AddToCartIcon, RemoveFromCartIcon } from './Icons.js'
import {useSelector,useDispatch} from "react-redux";
//import { useCart } from '../hooks/useCart.js'
import products from '../mocks/products.json'
import {useEffect} from "react";
import {addToCart, addProduct, removeFromCart} from "../redux/cartSlice";


export function Products () {
    //const { addToCart, removeFromCart, cart } = useCart()
   // const checkProductInCart = product => {        return cart.some(item => item.id === product.id)    }
    const dispatch = useDispatch();

    let cartProducts= useSelector((state) => state.cart.products);
    const carts= useSelector((state) => state.cart.cart);

    useEffect(() => {
        const savedProducts = JSON.parse(localStorage.getItem('cart'));
        if (savedProducts && savedProducts.length >0){
            cartProducts=(savedProducts);
        }else{
            products.products.map((e)=>{
                dispatch(addProduct(e))
            })
        }
    }, []);

    // Guarda productos en localStorage cada vez que cambie cartProduct
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartProducts));
    }, [cartProducts]);
    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    };
    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product));
    };

    const checkProductInCart = product => {
        console.log("en funcion",product);
        return carts.some(item => item.id === product.id)
    }


    return (
        <main className='products'>
            <ul>
                {products.products.slice(0, 10).map((product,i) => {
                   const isProductInCart = checkProductInCart(product)
                    return (
                        <li key={product.id}>
                            <img
                                src={product.thumbnail}
                                alt={product.title}
                            />
                            <div className='productsDescription'>
                                <strong >{product.title}</strong>
                                <strong > ${product.price}</strong>

                            </div>
                            <div>
                                <button onClick={()=>{isProductInCart?handleRemoveFromCart(product):handleAddToCart(product)} }
                                        style={{ backgroundColor: isProductInCart ? 'red' : '#09f' }}
                                >
                                    {
                                       isProductInCart
                                            ? <RemoveFromCartIcon />
                                            : <AddToCartIcon />
                                    }
                                </button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </main>
    )
}

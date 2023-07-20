import './Cart.css';

import { useEffect, useId, useState } from 'react';
import { ClearCartIcon } from './Icons.js';
import { addToCart, clearCart, restToCart, updateCart } from '../redux/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Wompi } from './Wompi.js';

function CartItem({ thumbnail, price, title, quantity, totalPrice, addToCart, restToCart }) {
  return (
    <li>
      <small className="circle-background" data-testid="quantityVAlue">
        {quantity}
      </small>
      <img src={thumbnail} alt={title} />
      <footer>
        <label>
          <small>{title}:</small> ${totalPrice}
        </label>

        <label>
          <button onClick={(product) => restToCart()}>-</button>
          <button onClick={(product) => addToCart()}>+</button>
        </label>
      </footer>
    </li>
  );
}

export function Cart() {
  const cartCheckboxId = useId();
  const dispatch = useDispatch();
  let carts = useSelector((state) => state.cart.cart);
  const showCart = useSelector((state) => state.cart.showCart);
  const [first, setFirsts] = useState(0);
  const [parsedCarts, setparsedCartss] = useState([]);

  useEffect(() => {
    console.log('parsedCarts', parsedCarts);
    const savedCarts = localStorage.getItem('cart', JSON.stringify(carts));
    if (savedCarts && savedCarts.length > 0) {
      const parsedCarts = JSON.parse(savedCarts);
      setparsedCartss(parsedCarts);
      console.log('parsedCartsenelif', parsedCarts);

      dispatch(updateCart(parsedCarts));

      // parsedCarts.map((e) => {
      //   dispatch(addToCart(e));
      // });
    }
    setFirsts(1);
  }, []);

  useEffect(() => {
    console.log('parsedCartsCrtscambia', parsedCarts);
    console.log('cartsenuseffectcarts', carts);
    if (first != 0) {
      console.log('firstttttttttt', carts);
      setparsedCartss(carts);
      localStorage.setItem('cart', JSON.stringify(carts));
    }
  }, [carts]);

  const handlerClearCart = () => {
    dispatch(clearCart());
  };

  const handleAddToCart = (product) => {
    console.log('aaaaaaaaaaaa', product);
    dispatch(addToCart(product));

    localStorage.setItem('cart', JSON.stringify(carts));
  };
  const handleRestToCart = (product) => {
    dispatch(restToCart(product));
    localStorage.setItem('cart', JSON.stringify(carts));
  };

  return (
    <>
      {showCart ? (
        <aside className="cart">
          <ul>
            <h4>
              Shopping Cart
              {/* {JSON.stringify(parsedCarts,null,2)} */}
            </h4>
          </ul>
          {
            <ul>
              {parsedCarts.map((product) => (
                <div>
                  <CartItem
                    key={product.id}
                    addToCart={() => {
                      handleAddToCart(product);
                    }}
                    restToCart={() => {
                      handleRestToCart(product);
                    }}
                    {...product}
                  />
                </div>
              ))}
            </ul>
          }
          <button onClick={() => handlerClearCart()}>
            <ClearCartIcon />
          </button>
        </aside>
      ) : (
        'Agrega Productos a tu carrito!'
      )}
      {/*pendiente wompi porque no pude obtener la key*/}
      <button onClick={() => handlerClearCart()}>
        Pagar con wompi
        <Wompi />
      </button>
      <Wompi />
    </>
  );
}

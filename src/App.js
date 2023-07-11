import ProductComponent from './components/ProductComponent';
import './App.css';
import {Products} from "./components/Products";
import {Cart} from "./components/Cart";
import {CartIcon, WallIcon} from "./components/Icons";
import {useId} from "react";
import {ShowCart} from "./redux/cartSlice";
import {useDispatch, useSelector} from "react-redux";

function App() {
    const cartCheckboxId = useId()
    const dispatch = useDispatch();
    const showCart = useSelector((state) => state.cart.showCart);

    const showCartFunction = (productId) => {
        if (showCart) {
            dispatch(ShowCart(false));
        } else {
            dispatch(ShowCart(true));
        }
    };

    return (
        <div className="App">
            <div className="container">
                <div className="col-12">
                    <div className="cardIcon">
                        <div className="cart-icon-container ">
                            <label onClick={() => showCartFunction()} className='cart-button-personal'
                                   htmlFor={cartCheckboxId}>
                                <WallIcon/>
                            </label>
                            <span>Store</span>
                        </div>
                        <label>
                            MINI MARKET
                        </label>
                        <label onClick={() => showCartFunction()} className='cart-button-personal'
                               htmlFor={cartCheckboxId}>
                            <CartIcon/>
                        </label>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="col-8">
                    <div className="card">
                        Choose the desired products
                        <Products/>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card">
                        <Cart/>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default App;

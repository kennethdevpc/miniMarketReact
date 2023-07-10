import React, { useEffect,useState }from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/cartSlice';

const CartComponent = ({ product }) => {
    const dispatch = useDispatch();
    // Estado local para los productos disponibles
    const [products] = useState([
        { id: 1, name: 'Producto a' },
        { id: 2, name: 'Producto b' },
        { id: 3, name: 'Producto c' }
    ]);

    // Obtén los productos del carrito desde el estado global usando useSelector()
    //const estados= useSelector((state) => state.cart);//recive todos los estados
    const cartProducts= useSelector((state) => state.cart.products);

    // Cargar productos desde localStorage al cargar el componente
    useEffect(() => {
        const savedProducts = JSON.parse(localStorage.getItem('cart'));
        if (savedProducts && savedProducts.length >0){
            dispatch(addToCart(savedProducts));
        }
    }, []);

    // Guarda productos en localStorage cada vez que cambie cartProduct
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartProducts));
    }, [cartProducts]);


    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart(productId));
    };

    return (
        <div>
            {products.map((product) => (
                <div key={product.id}>
                    <span>{product.name}</span>
                    {/* Botón para agregar un producto al carrito */}
                    <button onClick={() => handleAddToCart(product)}>
                        Agregar al carrito
                    </button>
                </div>
            ))}
            {cartProducts.length > 0 && (
                <div>
                    <h2>Productos en el carrito:</h2>
                    {cartProducts.map((product) => (
                        <div key={product.id}>
                            <span>{product.name}</span>
                            {/* Botón para eliminar un producto del carrito */}
                            <button onClick={() => handleRemoveFromCart(product.id)}>
                                Eliminar
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>);
};

export default CartComponent;
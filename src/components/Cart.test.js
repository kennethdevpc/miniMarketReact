import React from 'react';
import {render, screen, fireEvent} from "@testing-library/react";
import { Provider } from 'react-redux';
//import { configureStore } from '@reduxjs/toolkit';
import configureStore from 'redux-mock-store';
import {Cart} from './Cart.jsx';
import { addToCart, clearCart, restToCart } from '../redux/cartSlice'

 describe("<Cart/>",()=>{
     const mockStore = configureStore([]);
     test('renders "Agrega Productos a tu carrito!" when showCart is false', () => {
         const store = mockStore({
             cart: {
                 cart: [],
                 showCart: false,
             },
         });

         render(
             <Provider store={store}>
                 <Cart />
             </Provider>
         );

         const messageElement = screen.getByText(/Agrega Productos a tu carrito!/i);
         expect(messageElement).toBeInTheDocument();
     });
     test('renders "Shopping Cart!" when showCart is true', () => {
         const store = mockStore({
             cart: {
                 cart: [],
                 showCart: true,
             },
         });

         render(
             <Provider store={store}>
                 <Cart />
             </Provider>
         );

         const messageElement = screen.getByText(/Shopping Cart/i);
         expect(messageElement).toBeInTheDocument();
     });
     test('renders CartItem Function from Component Cart', () => {
         const store = mockStore({
             cart: {
                 cart: [{
                     brand:"colombia",
                     category:  "snacks",
                     description:"BBQ",
                     discountPercentage:11.83,
                     id:9,
                     images:['https://i.dummyjson.com/data/products/9/1.jpg','https://i.dummyjson.com/data/products/9/2.png', 'https://i.dummyjson.com/data/products/9/3.png', 'https://i.dummyjson.com/data/products/9/4.jpg', 'https://i.dummyjson.com/data/products/9/thumbnail.jpg'],
                     price :1099,
                     rating :4.54,
                     stock :96 ,
                     thumbnail :"https://d1cft8rz0k7w99.cloudfront.net/n/7/0/8/c/708c668895062311f322061cab04642fbc0a7dcd_Chips_6076_01.jpg" ,
                     title:"DETODITO"}],
                 showCart: true,
             },
         });

         render(
             <Provider store={store}>
                 <Cart />
             </Provider>
         );
         const quantityElement0 = screen.getByTestId('quantityVAlue');
         expect(quantityElement0.textContent).toBe('');
         //fireEvent.click(screen.getByTestId('button-adde'))

     });
     test('renders CartItem Function from Component Cart and make sure if quantity change', () => {
         const store = mockStore({
             cart: {
                 cart: [{
                     brand:"colombia",
                     category:  "snacks",
                     description:"BBQ",
                     discountPercentage:11.83,
                     id:9,
                     images:['https://i.dummyjson.com/data/products/9/1.jpg','https://i.dummyjson.com/data/products/9/2.png', 'https://i.dummyjson.com/data/products/9/3.png', 'https://i.dummyjson.com/data/products/9/4.jpg', 'https://i.dummyjson.com/data/products/9/thumbnail.jpg'],
                     price :1099,
                     rating :4.54,
                     stock :96 ,
                     quantity:1,
                     thumbnail :"https://d1cft8rz0k7w99.cloudfront.net/n/7/0/8/c/708c668895062311f322061cab04642fbc0a7dcd_Chips_6076_01.jpg" ,
                     title:"DETODITO"}],
                 showCart: true,
             },
         });
         render(
             <Provider store={store}>
                 <Cart />
             </Provider>
         );
         const quantityElement0 = screen.getByTestId('quantityVAlue');
         expect(quantityElement0.textContent).toBe('1');
         //fireEvent.click(screen.getByTestId('button-adde'))

     });

 })
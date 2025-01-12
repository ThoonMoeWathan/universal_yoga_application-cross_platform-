import React, { createContext, useState } from 'react'

export const CartContext = createContext()
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    const addToCart = (item) => {
        const itemExits = cart.some(cartItem => cartItem.id === item.id);
        if (!itemExits) {
            setCart((prevCart) => ([...prevCart, item]));
        }
    }
    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== id))
    }
    const clearCart = () => {
        setCart([])
    }
    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}
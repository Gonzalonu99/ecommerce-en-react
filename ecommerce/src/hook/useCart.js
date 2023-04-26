import React, { useState, useContext } from "react";

const CartContext = React.createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(item) {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(prevItem => prevItem.id === item.id);
      if (existingItemIndex !== -1) {
        const updatedItem = {
          ...prevItems[existingItemIndex],
          quantity: prevItems[existingItemIndex].quantity + 1,
          price: prevItems[existingItemIndex].price + item.price,
        };
        return [
          ...prevItems.slice(0, existingItemIndex),
          updatedItem,
          ...prevItems.slice(existingItemIndex + 1),
        ];
      } else {
        const newItem = { ...item, quantity: 1, price: item.price };
        return [...prevItems, newItem];
      }
    });
  }

  function removeFromCartAllProducts(id) {
    setCartItems((prevItems) => {
      const index = prevItems.findIndex(item=> item.id === id);
      if(index === -1) return prevItems;
      const newItems = [...prevItems];
      newItems.splice(index, 1);
      return newItems;
    });
  }
  function removeFromCartAtOnce(id) {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(prevItem => prevItem.id === id);
      if (existingItemIndex !== -1) {
        const itemToRemove = prevItems[existingItemIndex];
        if (itemToRemove.quantity === 1) {
          // If the item's quantity is 1, remove the entire item
          return [
            ...prevItems.slice(0, existingItemIndex),
            ...prevItems.slice(existingItemIndex + 1),
          ];
        } else {
          // If the item's quantity is greater than 1, decrease the quantity by 1
          const updatedItem = {
            ...itemToRemove,
            quantity: itemToRemove.quantity - 1,
            price: itemToRemove.price - itemToRemove.price/itemToRemove.quantity,
          };
          return [
            ...prevItems.slice(0, existingItemIndex),
            updatedItem,
            ...prevItems.slice(existingItemIndex + 1),
          ];
        }
      }
      return prevItems;
    });
  }
  

  function emptyCart() {
    setCartItems([]);
  }

  function getTotalPrice() {
    return cartItems.reduce(
      (total, item) => total + item.price,
      0
    );
  }

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCartAllProducts, removeFromCartAtOnce,emptyCart, getTotalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

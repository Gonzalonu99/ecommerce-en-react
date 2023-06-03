import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartContext = React.createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);

  function addToCart(item) {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (prevItem) => prevItem.id === item.id
      );
      if (existingItemIndex !== -1) {
        const updatedItem = {
          ...prevItems[existingItemIndex],
          quantity: prevItems[existingItemIndex].quantity + 1,
          price:
            prevItems[existingItemIndex].precio *
            (prevItems[existingItemIndex].quantity + 1),
        };
        return [
          ...prevItems.slice(0, existingItemIndex),
          updatedItem,
          ...prevItems.slice(existingItemIndex + 1),
        ];
      } else {
        const newItem = { ...item, quantity: 1, price: item.precio };
        return [...prevItems, newItem];
      }
    });
    // const productName = item.nombre;
    toast.success(`Producto agregado al carrito`, {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      className: 'mobile-toast',
      theme: "light",
      progressStyle:{
        background:"#C0FF00"
      },
    });
  }

  function removeFromCartAllProducts(id) {
    setCartItems((prevItems) => {
      const index = prevItems.findIndex((item) => item.id === id);
      if (index === -1) return prevItems;
      const newItems = [...prevItems];
      newItems.splice(index, 1);
      
      return newItems;
      
    });
  }
  function removeFromCartAtOnce(id) {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (prevItem) => prevItem.id === id
      );
      if (existingItemIndex !== -1) {
        const itemToRemove = prevItems[existingItemIndex];
        if (itemToRemove.quantity === 1) {
          const sameProductItems = prevItems.filter((item) => item.id === id);
          if (sameProductItems.length === 1) {
            setShowModal(true);
            return prevItems;
          } else {
            // If the item's quantity is 1, remove the entire item
            return [
              ...prevItems.slice(0, existingItemIndex),
              ...prevItems.slice(existingItemIndex + 1),
            ];
          }
        } else {
          // If the item's quantity is greater than 1, decrease the quantity by 1
          const updatedItem = {
            ...itemToRemove,
            quantity: itemToRemove.quantity - 1,
            price: itemToRemove.precio * (itemToRemove.quantity - 1),
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
    return cartItems.reduce((total, item) => total + item.price, 0);
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCartAllProducts,
        removeFromCartAtOnce,
        emptyCart,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

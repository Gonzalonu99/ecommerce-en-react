import React, { useState, useContext, useEffect, createContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartContext = createContext();

const CartProvider = ({ isLoggedIn, children }) => {
  const [cartData, setCartData] = useState([]);
  const [cartItemIds, setCartItemsIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (shouldUpdate) {
      getCartItem();
      setShouldUpdate(false);
    }
  }, [shouldUpdate, cartItemIds]);
  const updateCart = () => {
    setShouldUpdate(true);
  };

  const getUserId = () => {
    const usuarioId = localStorage.getItem("usuarioId");
    if (usuarioId) {
      return usuarioId;
    } else {
      return "";
    }
  };

  const addToCart = async (item) => {
    try {
      const userId = getUserId();
      console.log("Prop item.id: ", item.Id);
      if (userId) {
        const data = {
          UsuarioId: userId,
          ProductoId: item.Id,
          PrecioId: item.PrecioId,
          Cantidad: 1,
        };
        const response = await fetch(
          `https://a365.com.ar/ecommerce/newPendiente`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(data),
          }
        );
        if (response) {
          console.log("Producto agregado al carrito", data);
          const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
          carrito.push(item.id);
          setCartItemsIds([...cartItemIds, item.Id]);
          localStorage.setItem("carrito", JSON.stringify(carrito));
          setCartData([...cartData, data]);
          setShouldUpdate(true);
        }
      }
    } catch (error) {
      console.log("Error al agregar producto a carrito: ", error);
    }
  };

  const removeFromCartAllProducts = async (id) => {
    if (!cartItemIds.includes(id)) {
      return;
    }
    try {
      const userId = getUserId();
      if (userId) {
        const data = {
          UsuarioId: userId,
          ProductoId: id,
        };
        const response = await fetch(
          `https://a365.com.ar/ecommerce/deleteProd/${userId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(data),
          }
        );
        if (response.ok) {
          console.log("Producto eliminado del carrito");
          const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
          const updatedCarrito = carrito.filter((carId) => carId !== id);
          localStorage.setItem("carrito", JSON.stringify(updatedCarrito));
          setCartItemsIds(updatedCarrito);

          const filteredCartData = cartData.filter(
            (car) => car.ProductoId !== id
          );
          setCartData(filteredCartData);
          setShouldUpdate(true);
          console.log(filteredCartData);
        } else {
          console.error(
            "Error al eliminar producto del carrito:",
            response.status
          );
        }
      } else {
        console.log(
          "El usuario no está autenticado. No se puede eliminar del carrito."
        );
      }
    } catch (error) {
      console.error("Error al eliminar producto del carrito:", error);
    }
  };

  const removeFromCartAtOnce = async (id) => {
    try {
      const userId = getUserId();
      if (userId) {
        const data = {
          UsuarioId: userId,
          ProductoId: id,
        };
        const response = await fetch(
          `https://a365.com.ar/ecommerce/deleteProd/${userId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(data),
          }
        );
        if (response.ok) {
          console.log("Producto eliminado del carrito");
          const existingItemIndex = cartData.findIndex(
            (item) => item.ProductoId === id
          );
          if (existingItemIndex !== -1) {
            const itemToRemove = cartData[existingItemIndex];
            if (itemToRemove.Cantidad === 1) {
              const sameProductItems = cartData.filter(
                (item) => item.ProductoId === id
              );
              if (sameProductItems.length === 1) {
                setShowModal(true);
                return;
              } else {
                const updatedCartItems = cartData.filter(
                  (item) => item.ProductoId !== id
                );
                setCartData(updatedCartItems);
              }
            } else {
              const updatedItem = {
                ...itemToRemove,
                Cantidad: itemToRemove.Cantidad - 1,
              };
              const updatedCartItems = [
                ...cartData.slice(0, existingItemIndex),
                updatedItem,
                ...cartData.slice(existingItemIndex + 1),
              ];
              setCartData(updatedCartItems);
            }
          }
        } else {
          console.error(
            "Error al eliminar producto del carrito:",
            response.status
          );
        }
      } else {
        console.log(
          "El usuario no está autenticado. No se puede eliminar del carrito."
        );
      }
    } catch (error) {
      console.error("Error al eliminar producto del carrito:", error);
    }
  };

  const emptyCart = async () => {
    try {
      const userId = getUserId();
      if (userId) {
        const response = await fetch(
          `https://a365.com.ar/ecommerce/deleteProd/${userId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ UsuarioId: userId }),
          }
        );
        if (response.ok) {
          console.log("Carrito vaciado");
          setCartData([]);
        } else {
          console.error("Error al vaciar el carrito:", response.status);
        }
      } else {
        console.log(
          "El usuario no está autenticado. No se puede vaciar el carrito."
        );
      }
    } catch (error) {
      console.error("Error al vaciar el carrito:", error);
    }
  };

  const getTotalPrice = () => {
    const totalPrice = cartData.reduce((total, item) => {
      const productPrice = item.Precio;
      const quantity = item.Cantidad;
      return total + productPrice * quantity;
    }, 0);
    return totalPrice;
  };

  const getCartItem = async () => {
    try {
      setLoading(true);
      const userId = getUserId();
      if (userId && isLoggedIn) {
        const response = await fetch(
          `https://a365.com.ar/ecommerce/getCarrito/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const cartProd = await response.json();
        console.log("CartProd: ", cartProd);
        const cartItemIds = cartProd.map((cart) => cart.Id);
        setCartItemsIds(cartItemIds);
        localStorage.setItem("carrito", JSON.stringify(cartItemIds));
        if (cartProd !== cartData) {
          setCartData(cartProd);
        }
      } else {
        console.log(
          "El usuario no está autenticado o isLoggedIn es falso. No se pueden ver los productos en el carrito."
        );
      }
    } catch (error) {
      console.log("Error al ver productos de favoritos: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        setLoading(true);
        const userId = getUserId();
        if (userId && isLoggedIn) {
          const response = await fetch(
            `https://a365.com.ar/ecommerce/getCarrito/${userId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          const cartProd = await response.json();
          console.log("Cart data from API:", cartProd);
          const cartItemIds = cartProd.map((cart) => cart.Id);
          setCartItemsIds(cartItemIds);
          localStorage.setItem("carrito", JSON.stringify(cartItemIds));
          if (cartProd !== cartData) {
            console.log("Cart data updated:", cartProd);
            setCartData(cartProd);
          }
        } else {
          console.log(
            "El usuario no está autenticado o isLoggedIn es falso. No se pueden ver los productos en el carrito."
          );
        }
      } catch (error) {
        console.log("Error al ver productos de favoritos: ", error);
      } finally {
        setLoading(false);
      }
    };
    loadCartItems();
  }, [isLoggedIn]);

  return (
    <CartContext.Provider
      value={{
        cartData,
        addToCart,
        removeFromCartAllProducts,
        removeFromCartAtOnce,
        emptyCart,
        getTotalPrice,
        updateCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };

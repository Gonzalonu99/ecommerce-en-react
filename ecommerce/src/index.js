import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { CartProvider } from "./hook/useCart";
import { FavoritesProvider } from "./hook/useFav";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FavoritesProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </FavoritesProvider>
);

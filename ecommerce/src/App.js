import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar/index";
import ProductsCarousel from "./components/carrusel/carrusel";
import { CartProvider } from "./hook/useCart";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // Verificar si hay un token almacenado en el localStorage al cargar la aplicación
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  const handleLogin = async (email, password) => {
    try {
      const response = await fetch("http://a365.com.ar/ecommerce/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Email: email, Password: password }),
      });
      console.log(response);
      if (response.status === 200) {
        const data = await response.json();
        // El inicio de sesión fue exitoso, puedes hacer lo que quieras aquí
        // Obtener el token JWT de la respuesta
        const token = data.token;
        // Decodificar el token para obtener la información del usuario
        const decodedToken = jwt_decode(token);
        console.log(decodedToken);
        // Almacenar el token JWT en el almacenamiento local (localStorage)
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
        console.log("Inicio de sesión exitoso");
        console.log(data);
        if (data.success === true) {
          alert("Inicio de sesión exitoso");
        } else {
          alert("Inicio de sesión fallido");
          // // setEmail("");
          // // setPassword("");
          // // setLoginButtonDisabled(true);
        }
      } else {
        // El inicio de sesión falló, muestra un mensaje de error
        const data = await response.json();
        setIsLoggedIn(false);
        console.error("Inicio de sesión fallido:", data.error);
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
    }
  };
  const handleLogout = () => {
    // Eliminar el token JWT del almacenamiento local (localStorage)
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };
  const scrollToCategory = (categoryId) => {
    const element = document.getElementById(categoryId);
    setTimeout(() => {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };
  return (
    <CartProvider>
      <Navbar scrollToCategory={scrollToCategory} isLoggedIn={isLoggedIn} handleLogin={handleLogin} handleLogout={handleLogout}/>
      <ProductsCarousel />
    </CartProvider>
  );
}

export default App;

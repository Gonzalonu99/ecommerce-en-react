import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar/index";
import ProductsCarousel from "./components/carrusel/carrusel";
import footer1 from "./components/footer/footer";
import { CartProvider } from "./hook/useCart";
import { useState, useEffect, useContext, useRef } from "react";
import jwt_decode from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer/footer";
import WspLogo from "./components/wspLogo/wspLogo";
import { FavoritesContext, FavoritesProvider } from "./hook/useFav";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const {getFavProduct} = useContext(FavoritesContext);
  const favoritesProviderRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      setShowFooter(true);
    }, 2000);
  }, []);

  useEffect(() => {
    // Verificar si hay un token almacenado en el localStorage al cargar la aplicación
    const token = localStorage.getItem("token");
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
        const usuarioId = data.usuarioId;
        localStorage.setItem("usuarioId", usuarioId);
        setIsLoggedIn(true);
        console.log("Inicio de sesión exitoso");
        console.log(data);
        getFavProduct();
        if (data.success === true) {
          toast.success("Inicio de sesión exitoso", {
            className: "mobile-toast",
          });
        } /* aca borre el else xq no estaba funcionando el toast, asi que agarre el toast y lo meti en la linea 60  */
        /*donde funciona bien */
      } else {
        // El inicio de sesión falló, muestra un mensaje de error
        const data = await response.json();
        setIsLoggedIn(false);
        console.error("Inicio de sesión fallido:", data.error);
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      toast.error("Inicio de sesión fallido", {
        className: "mobile-toast",
      });
    }
  };
  const handleLogout = () => {
    // Eliminar el token JWT del almacenamiento local (localStorage)
    localStorage.clear();
    localStorage.removeItem("usuarioId");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    toast.info("Cerraste sesión", {
      className: "mobile-toast",
    });
  };
  const scrollToCategory = (categoryId) => {
    const element = document.getElementById(categoryId);
    const offset = 130;
    setTimeout(() => {
      const topPos = element.offsetTop - offset;
      window.scrollTo({ top: topPos, behavior: "smooth" });
    }, 100);
  };
  return (
    <FavoritesProvider isLoggedIn={isLoggedIn} ref={favoritesProviderRef}>
      <CartProvider>
        <Navbar
          scrollToCategory={scrollToCategory}
          isLoggedIn={isLoggedIn}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
        />
        <ProductsCarousel />
        <ToastContainer />
        {showFooter && <Footer />}
        <WspLogo/>
      </CartProvider>
    </FavoritesProvider>
  );
}

export default App;

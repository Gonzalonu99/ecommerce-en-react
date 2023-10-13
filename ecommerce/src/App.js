import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar/index";
import ProductsCarousel from "./components/carrusel/carrusel";
import { useState, useEffect, useContext } from "react";
import jwt_decode from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer/footer";
import { FavoritesContext, FavoritesProvider } from "./hook/useFav";
import WspLogo from "./components/wspLogo/wspLogo";
import Banner from "./components/banner/banner";
import Tutorial from "./components/tutorial/tutorial";
import { CartContext, CartProvider } from "./hook/useCart";
import Info from "./components/info/info";
import AboutUs from "./components/aboutUs/aboutUs";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Redes from "./components/redesDivider/redes";
import ContactUs from "./components/contactUs/contactUs";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [showFooter, setShowFooter] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const { getFavProduct } = useContext(FavoritesContext);
  const { getCartItem } = useContext(CartContext);
  useEffect(() => {
    setTimeout(() => {
      setShowTutorial(true);
      setShowFooter(true);
    }, 0);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserData = localStorage.getItem("userData");
    if (token && storedUserData) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(storedUserData));
    }
  }, []);
  const handleLogin = async (email, password) => {
    try {
      const response = await fetch("https://a365.com.ar/ecommerce/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Email: email, Password: password }),
      });
      if (response.status === 200) {
        const data = await response.json();
        if (data.success === true) {
          const token = data.token;
          localStorage.setItem("token", token);
          const usuarioId = data.usuarioId;
          localStorage.setItem("usuarioId", usuarioId);
          setIsLoggedIn(true);
          console.log("Inicio de sesión exitoso");
          localStorage.setItem("userData", JSON.stringify(data));
          setUserData(data);
          getFavProduct();
          getCartItem();
          toast.success("Inicio de sesión exitoso", {
            className: "mobile-toast",
          });
        } else {
          const data = await response.json();
          setIsLoggedIn(false);
          console.error("Inicio de sesión fallido:", data.error);
        }
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      toast.error("Inicio de sesión fallido", {
        className: "mobile-toast",
      });
    }
  };
  const handleLogout = () => {
    localStorage.clear();
    localStorage.removeItem("usuarioId");
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
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
  const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  };
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <FavoritesProvider isLoggedIn={isLoggedIn}>
              <CartProvider isLoggedIn={isLoggedIn}>
                <Navbar
                  scrollToCategory={scrollToCategory}
                  isLoggedIn={isLoggedIn}
                  userData={userData}
                  handleLogin={handleLogin}
                  handleLogout={handleLogout}
                />
                <Banner />
                <Info />
                <ProductsCarousel />
                <ToastContainer />
                {showTutorial && <Tutorial />}
                {showFooter && <Footer />}
                <WspLogo />
              </CartProvider>
            </FavoritesProvider>
          }
        />
        <Route
          path="/nosotros"
          element={
            <FavoritesProvider isLoggedIn={isLoggedIn}>
              <CartProvider isLoggedIn={isLoggedIn}>
                <Navbar
                  scrollToCategory={scrollToCategory}
                  isLoggedIn={isLoggedIn}
                  userData={userData}
                  handleLogin={handleLogin}
                  handleLogout={handleLogout}
                />
                <ToastContainer />
                <AboutUs />
                <Redes />
                {showFooter && <Footer />}
                <WspLogo />
              </CartProvider>
            </FavoritesProvider>
          }
        />
        <Route
          path="/contacto"
          element={
            <FavoritesProvider isLoggedIn={isLoggedIn}>
              <CartProvider isLoggedIn={isLoggedIn}>
                <Navbar
                  scrollToCategory={scrollToCategory}
                  isLoggedIn={isLoggedIn}
                  userData={userData}
                  handleLogin={handleLogin}
                  handleLogout={handleLogout}
                />
                <ToastContainer />
                <ContactUs />
                {showFooter && <Footer />}
                <WspLogo />
              </CartProvider>
            </FavoritesProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

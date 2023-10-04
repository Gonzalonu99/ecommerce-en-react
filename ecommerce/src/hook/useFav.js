import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
const FavoritesContext = createContext();


const FavoritesProvider = ({ isLoggedIn, children }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favData, setFavData] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  useEffect(() => {
    if (shouldUpdate) {
      getFavProduct();
      setShouldUpdate(false);
    }
  }, [shouldUpdate, favoriteIds]);
  const updateFavorites =()=>{
    setShouldUpdate(true);
  }
  const getUserId = () => {
    const usuarioId = localStorage.getItem("usuarioId");
    if (usuarioId) {
      return usuarioId;
    } else {
      return "";
    }
  };
  const addToFavorites = async (id, precioId) => {
    try {
      const userId = getUserId();
      if (userId) {
        const data = {
          ProductoId: id,
          UsuarioId: userId,
          PrecioId: precioId,
        };
        if (favoriteIds.includes(id)) {
          console.log("El producto ya está marcado como favorito");
          return;
        }
        const response = await fetch("https://a365.com.ar/ecommerce/favoritos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          console.log("Producto agregado a favoritos");
          toast.info(`Producto agregado a favoritos`, {
            position: "top-left",
            className: "mobile-toast"
          });
          const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
          favorites.push(id);
          setFavoriteIds([...favoriteIds, id]);
          localStorage.setItem("favorites", JSON.stringify(favorites));

          setFavData([...favData, data]);
          setShouldUpdate(true);
        } else {
          console.error(
            "Error al agregar producto a favoritos:",
            response.status
          );
        }
      } else {
        console.log(
          "El usuario no está autenticado. No se puede agregar a favoritos."
        );
      }
    } catch (error) {
      console.error("Error al agregar producto a favoritos:", error);
    }
  };
  const removeFromFavorites = async (id, precioId) => {
    if (!favoriteIds.includes(id)) {
      return;
    }

    try {
      const userId = getUserId();
      if (userId) {
        const data = {
          ProductoId: id,
          UsuarioId: userId,
          PrecioId: precioId,
        };
        const response = await fetch("https://a365.com.ar/ecommerce/favoritos", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          console.log("Producto eliminado de favoritos");
          toast.info("Producto eliminado de favoritos", {
            position: "top-left",
            className: "mobile-toast",
          });
          const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
          const updatedFavorites = favorites.filter((favId) => favId !== id);
          localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
          setFavoriteIds(updatedFavorites);
          const filteredData = favData.filter((fav) => fav.ProductoId !== id);
          setFavData(filteredData);
          setShouldUpdate(true);
        } else {
          console.error(
            "Error al eliminar producto de favoritos:",
            response.status
          );
        }
      } else {
        console.log(
          "El usuario no está autenticado. No se puede eliminar de favoritos."
        );
      }
    } catch (error) {
      console.error("Error al eliminar producto de favoritos:", error);
    }
  };
  const handleFavorites = (id, precioId) => {
    if (favoriteIds.includes(id)) {
      removeFromFavorites(id, precioId);
    } else {
      addToFavorites(id, precioId);
    }
    getFavProduct();
  };
  const getFavProduct = async () => {
    try {
      setLoading(true);
      const userId = getUserId();
      if (userId) {
        const response = await fetch(
          `https://a365.com.ar/ecommerce/favoritos/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const favProd = await response.json();
        console.log("FavProd: ", favProd);
        const favoriteIds = favProd.map((fav) => fav.Id);
        setFavoriteIds(favoriteIds);
        localStorage.setItem("favorites", JSON.stringify(favoriteIds));
      if (favProd !== favData) {
        setFavData(favProd);
      }
      } else {
        console.log(
          "El usuario no está autenticado. No se puede ver los favoritos."
        );
      }
    } catch (error) {
      console.error("Error al ver productos de favoritos:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        setLoading(true);
        const userId = getUserId();
        if (userId && isLoggedIn) {
          const response = await fetch(
            `https://a365.com.ar/ecommerce/favoritos/${userId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          const favProd = await response.json();
          const favoriteIds = favProd.map((fav) => fav.Id);
          setFavoriteIds(favoriteIds);
          localStorage.setItem("favorites", JSON.stringify(favoriteIds));
          if (favProd !== favData) {
            setFavData(favProd);
          }
        } else {
          console.log(
            "El usuario no está autenticado o isLoggedIn es falso. No se pueden ver los favoritos."
          );
        }
      } catch (error) {
        console.error("Error al ver productos de favoritos:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [isLoggedIn]);

  return (
    <FavoritesContext.Provider
      value={{
        favoriteIds,
        isFavorite,
        favData,
        setFavoriteIds,
        setIsFavorite,
        setFavData,
        addToFavorites,
        removeFromFavorites,
        getFavProduct,
        handleFavorites,
        updateFavorites,
        getUserId
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export { FavoritesProvider, FavoritesContext };

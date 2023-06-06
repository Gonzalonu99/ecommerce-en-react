import React, { createContext, useState, useEffect } from "react";
const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favData, setFavData] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [loading, setLoading] = useState(true);

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
        console.log(data);
        // Verificar si el producto ya está marcado como favorito
        if (favoriteIds.includes(id)) {
          console.log("El producto ya está marcado como favorito");
          return;
        }
        const response = await fetch("http://a365.com.ar/ecommerce/favoritos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          console.log("Producto agregado a favoritos");
          // Guardar los datos de favoritos en el almacenamiento local
          const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
          favorites.push(id);
          setFavoriteIds([...favoriteIds, id]);
          localStorage.setItem("favorites", JSON.stringify(favorites));

          setFavData([...favData, data]);
        } else {
          // Manejar errores en la respuesta del servidor
          console.error(
            "Error al agregar producto a favoritos:",
            response.status
          );
        }
      } else {
        // Aquí puedes manejar el caso en el que el usuario no esté autenticado
        console.log(
          "El usuario no está autenticado. No se puede agregar a favoritos."
        );
      }
    } catch (error) {
      // Manejar cualquier otro error que ocurra durante la ejecución
      console.error("Error al agregar producto a favoritos:", error);
    }
  };
  const removeFromFavorites = async (id, precioId) => {
    // Verificar si el producto ya está marcado como favorito
    if (!favoriteIds.includes(id)) {
      console.log("El producto se quitó de favoritos");
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

        const response = await fetch("http://a365.com.ar/ecommerce/favoritos", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          console.log("Producto eliminado de favoritos");

          // Eliminar el producto de favoritos del almacenamiento local
          const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
          const updatedFavorites = favorites.filter((favId) => favId !== id);
          localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
          setFavoriteIds(updatedFavorites);

          // Filtrar los datos de favData basados en los IDs actualizados
          const filteredData = favData.filter((fav) => fav.ProductoId !== id);
          setFavData(filteredData);
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
        console.log("favProd:", favProd);
        setFavData(favProd);
        // Obtener los IDs de los productos favoritos
        const favoriteIds = favProd.map((fav) => fav.Id);
        setFavoriteIds(favoriteIds);
        // Guardar los IDs de los productos favoritos en el almacenamiento local
        localStorage.setItem("favorites", JSON.stringify(favoriteIds));
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
    getFavProduct();
  }, []);
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
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export { FavoritesProvider, FavoritesContext };

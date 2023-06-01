import * as React from "react";
import { useEffect } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddToCart from "../../cartButton/cartButton";
import "./cards.css";
import { useCart } from "../../../hook/useCart";

export default function ProductCard(props) {
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = React.useState(false);

  const getUserId = () => {
    const usuarioId = localStorage.getItem("usuarioId");
    if (usuarioId) {
      return usuarioId;
    } else {
      return "";
    }
  };
  const addToFavorites = async () => {
    try {
      const userId = getUserId();
      if (userId) {
        const data = {
          ProductoId: props.id,
          UsuarioId: userId,
          PrecioId: props.precioId,
        };
        console.log(data);
        // Verificar si el producto ya está marcado como favorito
        if (isFavorite) {
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
          favorites.push(props.id);
          localStorage.setItem("favorites", JSON.stringify(favorites));
          setIsFavorite(true);
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
  const removeFromFavorites = async () => {
    // Verificar si el producto ya está marcado como favorito
    if (!isFavorite) {
      console.log("El producto se quitó de favoritos");
      return;
    }

    try {
      const userId = getUserId();
      if (userId) {
        const data = {
          ProductoId: props.id,
          UsuarioId: userId,
          PrecioId: props.precioId,
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
          const updatedFavorites = favorites.filter((id) => id !== props.id);
          localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

          setIsFavorite(false);
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

  useEffect(() => {
    // Verificar si el producto está en la lista de favoritos al cargar la página
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isProductFavorite = favorites.includes(props.id);
    setIsFavorite(isProductFavorite);
  }, [props.id]);
  const handleFavorites = () => {
    if (isFavorite) {
      removeFromFavorites();
    } else {
      addToFavorites();
    }
  };
  return (
    <Card
      sx={{ maxWidth: 270 }}
      style={{
        borderRadius: "10px",
        height: "380px",
        marginRight: "0px",
        boxShadow: "2px 2px 4px rgba(0,0,0,0.3)",
      }}
      key={props.id}
      id={props.id}
    >
      <CardMedia
        component="img"
        height="170"
        image={props.imagen}
        alt={props.nombre}
      />
      <CardContent>
        <Typography
          variant="body1"
          color="text.primary"
          style={{ fontSize: "16px", fontWeight: "bold", paddingTop: "10px" }}
        >
          {props.nombre}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ fontSize: "15px" }}
        >
          {props.descripcion}
        </Typography>
        <Typography
          style={{ paddingTop: "20px", fontSize: "25px", fontWeight: "bold" }}
        >
          $ {props.precio}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={handleFavorites}
          className="favButton"
          style={{ backgroundColor: isFavorite ? "red" : "gray" }}
        >
          <FavoriteIcon style={{ color: "#fff" }} />
        </IconButton>
        <AddToCart onClick={() => addToCart({ id: props.id, ...props })} />
      </CardActions>
    </Card>
  );
}

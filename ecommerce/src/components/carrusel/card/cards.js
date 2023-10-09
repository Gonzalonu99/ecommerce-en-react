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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { FavoritesContext } from "../../../hook/useFav";
import { CartContext } from "../../../hook/useCart";

export default function ProductCard(props) {
  const { addToCart } = useContext(CartContext);
  const { favoriteIds, handleFavorites, setFavoriteIds } =
    useContext(FavoritesContext);
  const isFavorite = favoriteIds.includes(props.Id);

  useEffect(() => {
    // Verificar si el producto está en la lista de favoritos al cargar la página
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoriteIds(favorites);
  }, []);

  return (
    <Card
      sx={{ width: 240 }}
      style={{
        borderRadius: "10px",
        height: "400px",
        marginRight: "0px",
        marginBottom: "1rem",
        backgroundColor: "#f4e2d0",
        boxShadow: "2px 2px 4px rgba(0,0,0,0.3)",
        backgroundImage: `url(${props.Imagen})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
      key={props.Id}
      id={props.Id}
    >
      {/* <CardMedia
        component="img"
        height="230"
        image={props.Imagen}
        alt={props.Nombre}
      /> */}
      <CardContent className="card-content-container">
        {/* <Typography
          variant="body1"
          color="text.primary"
          style={{ fontSize: "16px", fontWeight: "bold", maxHeight: "50px" }}
        >
          {props.Nombre}
        </Typography> 
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ fontSize: "15px" }}
        >
          {props.Descripcion}
        </Typography>*/}
        <Typography
          style={{ paddingTop: "20px", fontSize: "20px", color:'#fff' }}
        >
          $ {props.Precio}
        </Typography>
        <CardActions disableSpacing className="cards-btn-container">
          <AddToCart
            onClick={() => addToCart({ id: props.Id, ...props })}
            className="cards-btn"
          />
          <IconButton
            aria-label="add to favorites"
            onClick={() => handleFavorites(props.Id, props.PrecioId)}
            className="cards-btn"
            style={{ backgroundColor: isFavorite ? "#d2342c" : "gray" }}
          >
            <FavoriteIcon style={{ color: "#fff" }} />
          </IconButton>
        </CardActions>
      </CardContent>
    </Card>
  );
}

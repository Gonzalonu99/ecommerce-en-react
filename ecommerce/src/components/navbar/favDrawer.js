import { Close } from "@mui/icons-material";
import {
  Button,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { FavoritesContext } from "../../hook/useFav";
import "./favDrawer.css";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import corazonVacio from "../../img/corazonVacio.svg";
const FavDrawer = (props) => {
  const { favData, handleFavorites } = useContext(FavoritesContext);
  const handleDelete = async (id, precioId) => {
    await handleFavorites(id, precioId);
  };
  return (
    <React.Fragment>
      <>
        <p
          style={{ borderBottom: "1px solid #cccc", padding: ".4rem" }}
          className="tittle-fav-drawer"
        >
          Mis Favoritos
        </p>
      </>
      <IconButton
        style={{ position: "absolute", zIndex: "2000", top: 0, right: 0 }}
        onClick={props.handleFavDrawer}
      >
        <Close />
      </IconButton>

      {favData.length > 0 ? (
        favData.map((item, index) => {
          return (
            <ListItem className="list-drawer-fav" key={index} id={item.Id}>
              <ListItemAvatar>
                <img
                  className="img-drawer-fav"
                  src={item.Imagen}
                  alt={item.Nombre}
                />
              </ListItemAvatar>
              <ListItemText primary={item.Nombre} />
              <ListItemSecondaryAction className="list-btn-fd">
                <IconButton
                  edge="end"
                  aria-label="cart"
                  className="fd-cart-icon"
                >
                  <AddShoppingCartOutlinedIcon />
                </IconButton>

                <IconButton
                  className="fd-trash-icon"
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(item.Id, item.PrecioId)}
                >
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            style={{ marginTop: "5rem", width: "50px" }}
            src={corazonVacio}
            alt="Corazón vacío"
          />
          <Typography variant="h6" style={{ textAlign: "center" }}>
            ¡Todavía no tenés agregado ningún producto favorito!
          </Typography>
          <Typography
            variant="body6"
            style={{
              textAlign: "center",
              width: "260px",
              marginTop: "1rem",
              fontWeight: "bold",
            }}
          >
            Hacé click sobre el corazón que está dentro de cada producto y
            comenzá a armar tu lista.
          </Typography>
        </div>
      )}
    </React.Fragment>
  );
};

export default FavDrawer;

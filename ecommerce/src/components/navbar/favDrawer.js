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
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
const FavDrawer = (props) => {
  const { favData, handleFavorites } = useContext(FavoritesContext);
  const handleDelete = async (id, precioId) => {
    await handleFavorites(id, precioId);
  };
  return (
    <React.Fragment>
      <>
        <p className="tittle-fav-drawer">Mis Favoritos</p>
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
                <ListItemSecondaryAction>
                  <IconButton edge='end' aria-label="cart" className="fd-cart-icon">
                    <AddShoppingCartOutlinedIcon />
                  </IconButton>
                </ListItemSecondaryAction>
                <ListItemSecondaryAction>
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
        null
      )}
    </React.Fragment>
  );
};

export default FavDrawer;

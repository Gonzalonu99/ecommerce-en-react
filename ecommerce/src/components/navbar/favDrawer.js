import { Close, RemoveCircleOutline } from "@mui/icons-material";
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
import './favDrawer.css';

const FavDrawer = (props) => {
  const { favData, removeFromFavorites } = useContext(FavoritesContext);

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
                <img className="img-drawer-fav" src={item.Imagen} alt={item.Nombre} />
              </ListItemAvatar>
             
              <ListItemText primary={item.Nombre} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  <RemoveCircleOutline/>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })
      ) : (
          <Typography >Agregar al carrito</Typography>      
      )}
    </React.Fragment>
  );
};

export default FavDrawer;

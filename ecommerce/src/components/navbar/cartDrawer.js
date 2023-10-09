import React, { useContext, useEffect } from "react";
import {
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
} from "@mui/material";
import {
  AddCircleOutline,
  Close,
  RemoveCircleOutline,
} from "@mui/icons-material";
import "./cartDrawer.css";
import { useState } from "react";
import CarritoVacio from "../../img/carritoVacio.webp";
import { CartContext } from "../../hook/useCart";

function CartDrawer(props) {
  const {
    cartData,
    removeFromCartAtOnce,
    getTotalPrice,
    addToCart,
    emptyCart,
  } = useContext(CartContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [emptyModal, setEmptyModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  const groupedItems = cartData.reduce((acc, item) => {
    const existingItemIndex = acc.findIndex((i) => i.Id === item.ProductoId);
    if (existingItemIndex !== -1) {
      acc[existingItemIndex].Cantidad++;
    } else {
      acc.push({
        ...item,
        Id: item.Id,
        Nombre: item.Nombre,
        Precio: item.Precio,
        Cantidad: item.Cantidad,
        Imagen: item.Imagen,
      });
    }
    return acc;
  }, []);

  const handleEmptyCartModal = () => {
    setEmptyModal(true);
  };
  const handleRemoveClick = (item) => {
    if (item.Cantidad === 1) {
      setItemToRemove(item);
      setOpenDialog(true);
    } else {
      removeFromCartAtOnce(item);
    }
  };

  const handleRemoveConfirm = async (item) => {
    await removeFromCartAtOnce(item);
    setOpenDialog(false);
  };

  const handleClose = () => {
    setEmptyModal(false);
    setOpenDialog(false);
  };

  const handleEmptyClick = () => {
    emptyCart();
    setEmptyModal(false);
  };
  return (
    
    <React.Fragment>
      <IconButton
        style={{ position: "absolute", zIndex: "2000", top: 0, right: 0 }}
        onClick={props.handleDrawerCart}
      >
        <Close />
      </IconButton>
      {groupedItems.length > 0 && (
        <Typography
          style={{
            borderBottom: "1px solid #cccc",
            padding: ".4rem",
            margin: ".5rem",
            fontWeight: "bold",
          }}
        >
          Mi carrito
        </Typography>
      )}
      <List dense sx={{ padding: "16px" }}>
        {groupedItems.length > 0 ? (
          groupedItems.map((item, index) => (
            <ListItem key={index} id={item.Id}>
              <ListItemAvatar>
                <img className="img-cart-drawer-product" src={item.Imagen} />
              </ListItemAvatar>
              <ListItemText sx={{width: "17rem"}}
                className="text-cart-drawer-product"
                primary={`${item.Nombre}`}
                secondary={`$${item.Precio * item.Cantidad}`}
              />
              <ListItemSecondaryAction>
                <IconButton
                  style={{ marginRight: "0px" }}
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleRemoveClick(item)}
                >
                  <RemoveCircleOutline />
                </IconButton>
                <>{item.Cantidad}</>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => addToCart(item)}
                >
                  <AddCircleOutline />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))
        ) : (
          <Box>
            <Typography variant="subtitle1" align="center">
              Tu carrito está vacío
            </Typography>
            <img className="carrito-vacio-img" src={CarritoVacio} />
            <Button
              className="btn-vaciar-carrito"
              onClick={props.handleDrawerCart}
            >
              Agrega nuevos productos
            </Button>
          </Box>
        )}
      </List>

      {groupedItems.length > 0 && (
        <>
          <List sx={{ padding: "16px" }}>
            <ListItem sx={{ padding: "16px" }}>
              <button
                className="empty-cart-drawer"
                onClick={handleEmptyCartModal}
              >
                Vaciar carrito
              </button>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Total" />
              <Typography variant="subtitle1" component="span">
                ${getTotalPrice()}
              </Typography>
            </ListItem>
          </List>
          <Divider />
          <Dialog
            className="alert-cart"
            open={openDialog}
            onClose={handleClose}
          >
            <DialogTitle className="alert-tittle-cart">ATENCIÓN</DialogTitle>
            <DialogContent>
              <DialogContentText className="subtittle-cart-clear">
                ¿Desea eliminar el producto del carrito?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button className="btn-cart-clear-cancell" onClick={handleClose}>
                Cancelar
              </Button>
              <Button
                className="btn-cart-clear-remove"
                onClick={()=> handleRemoveConfirm(itemToRemove)}
                color="error"
              >
                Quitar
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            className="alert-cart"
            open={emptyModal}
            onClose={handleClose}
          >
            <DialogTitle className="alert-tittle-cart">ATENCIÓN</DialogTitle>
            <DialogContent>
              <DialogContentText className="subtittle-cart-clear">
                ¿Desea vaciar el carrito?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button className="btn-cart-clear-cancell" onClick={handleClose}>
                Cancelar
              </Button>
              <Button
                className="btn-cart-clear-remove"
                onClick={handleEmptyClick}
                color="error"
              >
                Vaciar
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </React.Fragment>
  );
}

export default CartDrawer;

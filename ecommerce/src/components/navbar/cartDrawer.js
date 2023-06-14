import React from "react";
import { useCart } from "../../hook/useCart";
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

function CartDrawer(props) {
  const {
    cartItems,
    removeFromCartAllProducts,
    removeFromCartAtOnce,
    getTotalPrice,
    addToCart,
    emptyCart
  } = useCart();
  const [openDialog, setOpenDialog] = useState(false);
  const [emptyModal, setEmptyModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  // Agrupar los elementos del mismo producto en un solo objeto
  const groupedItems = cartItems.reduce((acc, item) => {
    const existingItemIndex = acc.findIndex((i) => i.id === item.id);
    if (existingItemIndex !== -1) {
      acc[existingItemIndex].quantity++;
    } else {
      acc.push({
        ...item,
        id: item.id,
        name: item.nombre,
        price: item.precio,
        quantity: item.quantity,
        imagen: item.imagen,
      });
    }
    return acc;
  }, []);
  const handleEmptyCartModal = () => {
    setEmptyModal(true);
  };
  const handleRemoveClick = (item) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    if (cartItems[existingItemIndex].quantity === 1) {
      setItemToRemove(existingItemIndex);
      setOpenDialog(true);
    } else {
      removeFromCartAtOnce(item.id);
    }
  };

  const handleRemoveConfirm = () => {
    removeFromCartAllProducts(cartItems[itemToRemove].id);
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
      <IconButton style={{ position: 'absolute', zIndex:'2000', top: 0, right: 0 }} onClick={props.handleDrawerCart}>
        <Close/>
      </IconButton>
      <List dense sx={{ padding: '16px' }}>
      
        {groupedItems.length > 0  ? (
          groupedItems.map((item) => (
            <ListItem key={item.id}>
              <ListItemAvatar>
                <img className='img-cart-drawer-product'  src={item.imagen}/>
              </ListItemAvatar>
              <ListItemText className='text-cart-drawer-product'
                primary={`${item.name}`}
                secondary={`$${item.price*item.quantity}`} 
              />
              <ListItemSecondaryAction>
                <IconButton style={{marginRight:"0px"}}
                  edge="end" aria-label="delete" onClick={() => handleRemoveClick(item)}>
                  <RemoveCircleOutline/>
                </IconButton>
                <>
                  {item.quantity}
                </>
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
        <List sx={{ padding: '16px' }}>
        <button className='empty-cart-drawer'
          onClick={emptyCart}>
            Vaciar carrito
        </button>
      </List>
      </List>
      
      <Divider />

      {groupedItems.length > 0 && (
        <>
      <List sx={{ padding: '16px' }}>
        <ListItem>
          <ListItemText primary="Total" />
          <Typography 
            variant="subtitle1" component="span">
              ${getTotalPrice()}
          </Typography>
        </ListItem>
      </List>
      <Divider />
      
      <Dialog className='alert-cart' open={openDialog} onClose={handleClose}>
      <DialogTitle className='alert-tittle-cart'>ATENCIÓN</DialogTitle>
      <DialogContent>
        <DialogContentText className='subtittle-cart-clear'>
          ¿Desea eliminar el producto del carrito?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button className='btn-cart-clear-cancell' onClick={handleClose}>Cancelar</Button>
        <Button className='btn-cart-clear-remove' onClick={handleRemoveConfirm} color="error">Quitar</Button>
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

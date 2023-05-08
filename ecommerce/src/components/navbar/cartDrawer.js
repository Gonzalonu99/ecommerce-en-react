import React from 'react';
import { useCart } from '../../hook/useCart';
import { Button, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { AddCircleOutline,  Close,  RemoveCircleOutline } from '@mui/icons-material';
import { useState } from 'react';

function CartDrawer(props) {
  const { cartItems, emptyCart, removeFromCartAllProducts,removeFromCartAtOnce, getTotalPrice, addToCart} = useCart();
  const [openDialog, setOpenDialog] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  // Agrupar los elementos del mismo producto en un solo objeto
  const groupedItems = cartItems.reduce((acc, item) => {
    const existingItemIndex = acc.findIndex((i) => i.id === item.id);
    if (existingItemIndex !== -1) {
      acc[existingItemIndex].quantity ++;
    } else {
      acc.push({ ...item, id: item.id, name: item.nombre, price: item.precio, quantity: item.quantity, imagen: item.imagen});
    }
    return acc;
  }, []);
  const handleRemoveClick = (item) => {
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);
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
    setOpenDialog(false);
  };
  
  // const handleEmptyClick = () => {
  //   setCartItems([]);
  // };
  return (
    <React.Fragment>
      <IconButton style={{ position: 'absolute', zIndex:'2000', top: 0, right: 0 }} onClick={props.handleDrawerCart}>
        <Close/>
      </IconButton>
      <List dense sx={{ padding: '16px' }}>
        {groupedItems.length > 0 ? (
          groupedItems.map((item) => (
            <ListItem key={item.id}>
              <ListItemAvatar>
                <img src={item.imagen}/>
              </ListItemAvatar>
              <ListItemText 
                primary={`${item.name} x ${item.quantity}`}
                secondary={`$${item.price*item.quantity}`} 
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end" aria-label="delete" onClick={() => handleRemoveClick(item)}>
                  <RemoveCircleOutline/>
                </IconButton>
                <IconButton
                  edge="end" aria-label='delete' onClick={()=>addToCart(item)}
                >
                  <AddCircleOutline/>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))
        ) : (
          <Typography 
            variant="subtitle1" align="center">
              No hay productos en el carrito
          </Typography>
        )}
      </List>
      <Divider />
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
      <List sx={{ padding: '16px' }}>
        <Button 
          variant="contained" 
          color="error" 
          fullWidth 
          onClick={emptyCart}>
            Vaciar carrito
        </Button>
      </List>
      <Dialog open={openDialog} onClose={handleClose}>
      <DialogTitle>ATENCIÓN</DialogTitle>
      <DialogContent>
        <DialogContentText>
          ¿Desea eliminar el producto del carrito?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleRemoveConfirm} color="error">Quitar</Button>
      </DialogActions>
    </Dialog>
    </React.Fragment>
  );
}

export default CartDrawer;

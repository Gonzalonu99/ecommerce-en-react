import React from 'react';
import { useCart } from '../../hook/useCart';
import { Button, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography } from '@mui/material';
import { AddCircleOutline,  RemoveCircleOutline } from '@mui/icons-material';

function CartDrawer() {
  const { cartItems, emptyCart, removeFromCartAllProducts,removeFromCartAtOnce, getTotalPrice, addToCart} = useCart();
  // Agrupar los elementos del mismo producto en un solo objeto
  const groupedItems = cartItems.reduce((acc, item) => {
    const existingItemIndex = acc.findIndex((i) => i.id === item.id);
    if (existingItemIndex !== -1) {
      acc[existingItemIndex].quantity ++;
    } else {
      acc.push({ ...item, id: item.id, name: item.name, price: item.price, quantity: item.quantity, Imagen: item.Imagen});
    }
    return acc;
  }, []);
  return (
    <React.Fragment>
      <List dense sx={{ padding: '16px' }}>
        {groupedItems.length > 0 ? (
          groupedItems.map((item) => (
            <ListItem key={item.id}>
              <ListItemAvatar>
                <img src={item.Imagen}/>
              </ListItemAvatar>
              <ListItemText 
                primary={`${item.name} x ${item.quantity}`}
                secondary={`$${item.price}`} 
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end" aria-label="delete" onClick={() => removeFromCartAtOnce(item.id)}>
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
    </React.Fragment>
  );
}

export default CartDrawer;

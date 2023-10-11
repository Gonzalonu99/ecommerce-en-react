import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import "../../components/carrusel/card/cards.css"
import ShoppingCart from '@mui/icons-material/ShoppingCart'

export default function AddToCart(props) {
  return (
    <Stack style={{position:'relative'}}>
      <Button variant="outlined" className='btn-card-cart' style={{ fontSize:'15px', borderRadius:'10px', color:'#fff', backgroundColor:"#111", width: '10rem'}} onClick={props.onClick}>
        
          AGREGAR
      </Button>
    </Stack>
  );
}

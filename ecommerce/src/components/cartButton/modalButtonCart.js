import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import "../../components/carrusel/card/cards.css"
import ShoppingCart from '@mui/icons-material/ShoppingCart'

export default function ModalAddToCart(props) {
  return (
    <Stack style={{position:'relative'}}>
      <Button variant="outlined" className='btn-card-cart' style={{textTransform:"uppercase", fontSize:'15px', borderRadius:'10px', color:'#fff', backgroundColor:"#111", width: '10rem', marginRight:".5rem"}} onClick={props.onClick}>
        
          AñADIR <ShoppingCart sx={{paddingLeft:".5rem"}}/>
      </Button>
    </Stack>
  );
}
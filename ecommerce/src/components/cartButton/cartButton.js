import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ShoppingCart from '@mui/icons-material/ShoppingCart'

export default function AddToCart(props) {
  return (
    <Stack style={{position:'relative'}}>
      <Button variant="outlined" style={{ fontSize:'15px', borderRadius:'25px', color:'#f4e2d0', borderColor:'#f4e2d0', backgroundColor:"#111", width: 'fit-content'}} onClick={props.onClick}>
        <ShoppingCart/>
      </Button>
    </Stack>
  );
}

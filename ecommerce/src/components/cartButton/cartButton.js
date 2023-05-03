import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ShoppingCart from '@mui/icons-material/ShoppingCart'

export default function AddToCart(props) {
  return (
    <Stack style={{position:'relative', width:'170px', top:'15px'}}>
      <Button variant="outlined" style={{ fontSize:'15px', padding:'5px', borderRadius:'15px'}} onClick={props.onClick}>
        <ShoppingCart style={{marginRight:'5px'}}/>
        Agregar
      </Button>
    </Stack>
  );
}

import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddToCart from '../../cartButton/cartButton';
import './cards.css';
import { useCart } from '../../../hook/useCart';


export default function ProductCard(props) {
    const {addToCart} = useCart();
    const [isFavorite, setIsFavorite]= React.useState(false);
    const toggleFavorite=()=>{
        setIsFavorite(!isFavorite);
    };

  return (
    <Card sx={{ maxWidth: 270 }} style={{borderRadius:'10px',height:'380px', marginRight:'0px', boxShadow:'2px 2px 4px rgba(0,0,0,0.3)'}} key={props.id}>
      <CardMedia
        component="img"
        height="170"
        image={props.imagen}
        alt={props.nombre}
      />
      <CardContent>
      <Typography variant="body1" color="text.primary" style={{fontSize:"16px", fontWeight:"bold", paddingTop:"10px"}}>
          {props.nombre}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{fontSize:"15px"}}>
          {props.descripcion}
        </Typography>
        <Typography style={{paddingTop:"20px", fontSize:"25px", fontWeight:"bold"}}>$ {props.precio}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" style={{backgroundColor: isFavorite ? 'red' : 'gray'}} onClick={toggleFavorite} className='favButton'>
          <FavoriteIcon style={{color:"#fff"}}/>
        </IconButton>
      <AddToCart onClick={()=>addToCart({id: props.id, ...props})}/>
      </CardActions>
    </Card>
  );
}


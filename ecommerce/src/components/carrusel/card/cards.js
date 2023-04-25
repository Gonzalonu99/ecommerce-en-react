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


export default function ProductCard({id, name, description, image, price}) {
    const [isFavorite, setIsFavorite]= React.useState(false);
    const toggleFavorite=()=>{
        setIsFavorite(!isFavorite);
    };
  return (
    <Card sx={{ maxWidth: 300 }} style={{borderRadius:'10px', marginLeft:'18px', boxShadow:'2px 2px 4px rgba(0,0,0,0.3)'}} key={id}>
      <CardMedia
        component="img"
        height="150"
        image={image}
        alt={name}
      />
      <CardContent>
      <Typography variant="body1" color="text.primary" style={{fontSize:"20px", fontWeight:"bold", paddingTop:"10px"}}>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{fontSize:"15px"}}>
          {description}
        </Typography>
        <Typography style={{paddingTop:"20px", fontSize:"25px", fontWeight:"bold"}}>{price}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" style={{backgroundColor: isFavorite ? 'red' : 'gray'}} onClick={toggleFavorite} className='favButton'>
          <FavoriteIcon style={{color:"#fff"}}/>
        </IconButton>
      <AddToCart/>
      </CardActions>
    </Card>
  );
}


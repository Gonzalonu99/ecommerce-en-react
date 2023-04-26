import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Badge} from '@mui/material';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import './navbar.css';
import Favorite from '@mui/icons-material/Favorite';
import User from '@mui/icons-material/Person';
import CartDrawer from './cartDrawer';
import { useCart } from '../../hook/useCart';

const drawerWidth = 300;
const drawerCartWidth = 350;
const navItems = ['Rebozados', 'Pescados', 'Veggie'];

function Navbar(props) {
  const {cartItems}= useCart();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [cartOpen, setCartOpen] = React.useState(false);
  // const cartQty = cartItems.reduce((acc,item)=> acc + item.qty, 0);
  const handleDrawerCart = ()=>{
    setCartOpen((prevState)=> !prevState);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Romero y Ajo
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" style={{backgroundColor:'#fff', height:'55px'}}>
        <Toolbar variant='permanent' style={{marginTop:'5px'}}>
          <IconButton
            color="#333"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'list-item' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block' } }}
            style={{color:'#333'}}
          >
            Romero y Ajo
          </Typography>
          <div className="nav-icons-div">
          <IconButton className='navbar-icons'>
            <User className='nav-icon'/>
          </IconButton>
          <IconButton className='navbar-icons'>
            <Favorite className='nav-icon'/>
          </IconButton>
          <IconButton className='navbar-icons' onClick={handleDrawerCart}>
          <Badge badgeContent={cartItems.reduce((total, item)=> total + item.quantity, 0)} color='error'>
            <ShoppingCart className='nav-icon'/>
          </Badge>
          </IconButton>
        </div>
        </Toolbar>
      </AppBar>
      {/* Drawer del cart */}
      <Box>
        <Drawer
          anchor='right'
          variant='temporary'
          open={cartOpen}
          onClose={handleDrawerCart}
          ModalProps={{
            keepMounted:true,
          }}
          sx={{
            display: { xs: 'block', sm: 'inherit' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerCartWidth },
          }}  
        >
          <CartDrawer/>
        </Drawer>
      </Box>
        {/* Drawer del menú hamburguesa */}
      <Box component="nav" >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'inherit' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

Navbar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Navbar;


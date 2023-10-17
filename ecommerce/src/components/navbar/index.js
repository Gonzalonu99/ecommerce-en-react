import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Badge, Button } from "@mui/material";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import "./navbar.css";
import Favorite from "@mui/icons-material/Favorite";
import User from "@mui/icons-material/Person";
import CartDrawer from "./cartDrawer";
import ModalUser from "./modalUser";
import { useState, useEffect } from "react";
import logo from "../../img/pizza_grosso.webp";
import FavDrawer from "./favDrawer";
import { FavoritesContext } from "../../hook/useFav";
import { useContext } from "react";
import { CartContext } from "../../hook/useCart";
import { Link } from "react-router-dom";




const drawerWidth = 300;
const drawerCartWidth = 350;

function Navbar(props) {
  const { cartData } = useContext(CartContext);
  const { window } = props;
  const { isLoggedIn, handleLogin, handleLogout } = props;
  const { scrollToCategory } = props;
  const {userData} = props;
  const {favData} = React.useContext(FavoritesContext);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [cartOpen, setCartOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [favDrawerOpen, setFavDrawerOpen] = React.useState(false);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  

  useEffect(() => {
    fetch("https://a365.com.ar/ecommerce/getProductos")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);




  const handleFavDrawer = () => {
    setFavDrawerOpen((prevState) => !prevState);
  };
  const handleModalUser = () => {
    setModalOpen((prevState) => !prevState);
  };
  const handleDrawerCart = () => {
    setCartOpen((prevState) => !prevState);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography className="drawer-title" variant="h6" sx={{ my: 2 }}>
      Pizza Grosso
      </Typography>
      <Divider />
      <Button variant="transparent" sx={{ marginLeft: "10px", color:"#d2342c",fontWeight:"bold" }}>
        <Link to="/" style={{color:"#d2342c"}}>Menú</Link>
      </Button>
      <Button variant="transparent" sx={{ marginLeft: "10px",color:"#d2342c",fontWeight:"bold"  }}>
        <Link to="/ubicacion" style={{color:"#d2342c"}}> Ubicación</Link>
      </Button>
      <Button variant="transparent" sx={{ marginLeft: "10px", color:"#d2342c", fontWeight:"bold" }}>
      <Link to="/contacto" style={{color:"#d2342c"}}>Contacto</Link>
      </Button>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  if (error && error.isError) {
    return <div>{error.message}</div>;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        className={"nav-container"}
        style={{ backgroundColor: "#111",width:'100vw', opacity: "1", height: "90px", left: "0px" }}
      >
       <Toolbar variant="permanent" style={{ marginTop: "5px", display: "flex", justifyContent: "space-between" }}>
    <IconButton
      className="nav-drawer"
      color="inherit"
      aria-label="open drawer"
      edge="start"
      onClick={handleDrawerToggle}
      sx={{ mr: 0, display: { xs:"list-item",  sm: "list-item" , md:"none" , lg: "none", xl: "none", zIndex:999999 } }}
      
    >
    
      <MenuIcon />
    </IconButton>
    <div className="nav-logo-container" sx={{ display: "flex", alignItems: "center" }}>
      <img className="nav-logo" src={logo} alt="Pizza Grosso logo" />
    </div>
    
  <div style={{ display: "flex"}}>
      <Button variant="transparent" sx={{ marginLeft: "10px", display: {xs: "none", sm: "none", md: "inline-block", lg: "inline-block", xl: "inline-block"} }} className="navbar-btn-cntr">
        <Link to="/" style={{color:"#fff"}}>Menú</Link>
      </Button>
      <Button variant="transparent" sx={{ marginLeft: "10px",color:"#fff", display: {xs: "none", sm: "none", md: "inline-block", lg: "inline-block", xl: "inline-block"}  }} className="navbar-btn-cntr">
        <Link to="/ubicacion" style={{color:"#fff"}}>Ubicación</Link>
      </Button>
      <Button variant="transparent" sx={{ marginLeft: "10px", display: {xs: "none", sm: "none", md: "inline-block", lg: "inline-block", xl: "inline-block"}  }} className="navbar-btn-cntr">
      <Link to="/contacto" style={{color:"#fff"}}>Contacto</Link>
      </Button>
  </div>
  
  <div className="" style={{ display: "flex", alignItems: "end" }}>
  
    <IconButton className="navbar-icons" onClick={handleModalUser}>
      {isLoggedIn ? (
        <h6 style={{ fontSize: "15px", position: "relative", top: "5px", padding: "2px" }}>
          {`${userData.nombre}`}
        </h6>
      ) : null}
      <User className="nav-icon" />
    </IconButton>
    <IconButton className="navbar-icons" onClick={handleFavDrawer}>
      <Favorite className="nav-icon" style={{ color: favData.length > 0 ? 'red' : '#fff' }} />
    </IconButton>
    <IconButton className="navbar-icons" onClick={handleDrawerCart}>
      <Badge sx={{}} badgeContent={cartData.length} color="error">
        <ShoppingCart className="nav-icons" />
      </Badge>
    </IconButton>
  </div>
</Toolbar>
      </AppBar>
      {/*Modal de Inicio de Sesión o Registro */}
      <ModalUser
        modalOpen={modalOpen}
        handleModalUser={handleModalUser}
        handleLogin={handleLogin}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
      />
      {/* Drawer del cart */}
      <Box>
        <Drawer
          anchor="right"
          variant="temporary"
          open={cartOpen}
          onClose={handleDrawerCart}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
              width: drawerCartWidth,
            }
          }
        >
          <CartDrawer cartOpen={cartOpen} handleDrawerCart={handleDrawerCart} />
        </Drawer>
      </Box>
      {/* Drawer de Favoritos */}
      <Box>
        <Drawer
          anchor="right"
          variant="temporary"
          open={favDrawerOpen}
          onClose={handleFavDrawer}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{

              width: drawerCartWidth,
            }
          }
        >
          <FavDrawer favDrawerOpen={favDrawerOpen} handleFavDrawer={handleFavDrawer}/>
        </Drawer>
      </Box>
      {/* Drawer del menú hamburguesa */}
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "inherit" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <img
            className="nav-logo nav--logo-drawer"
            src={logo}
            alt="Romero y Ajo"
          />
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

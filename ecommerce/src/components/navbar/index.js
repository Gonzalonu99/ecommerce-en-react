import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Badge } from "@mui/material";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import "./navbar.css";
import Favorite from "@mui/icons-material/Favorite";
import User from "@mui/icons-material/Person";
import CartDrawer from "./cartDrawer";
import ModalUser from "./modalUser";
import { useCart } from "../../hook/useCart";
import { useState, useEffect } from "react";
import logo from "../../img/logo.jpg";
import FavDrawer from "./favDrawer";
import { FavoritesContext } from "../../hook/useFav";


const drawerWidth = 300;
const drawerCartWidth = 350;

function Navbar(props) {
  const { cartItems } = useCart();
  const { window } = props;
  const { isLoggedIn, handleLogin, handleLogout } = props;
  const { scrollToCategory } = props;
  const {favData} = React.useContext(FavoritesContext);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [cartOpen, setCartOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [favDrawerOpen, setFavDrawerOpen] = React.useState(false);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://a365.com.ar/ecommerce/getProductos")
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
      <Typography variant="h6" sx={{ my: 2 }}>
        Romero y Ajo
      </Typography>
      <Divider />
      <List>
        {data &&
          data.SubRubros.map((subrubro) => (
            <ListItem key={subrubro.NombreSubRubro} disablePadding>
              <ListItemButton
                onClick={() => scrollToCategory(subrubro.NombreSubRubro)}
                sx={{ textAlign: "center" }}
              >
                <ListItemText primary={subrubro.NombreSubRubro} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error && error.isError) {
    return <div>{error.message}</div>;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        className="nav-container"
        style={{ backgroundColor: "#348759", height: "95px", left: "0px" }}
      >
        <Toolbar variant="permanent" style={{ marginTop: "5px" }}>
          <IconButton
            className="nav-drawer"
            color="#ffffff"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 0, display: { sm: "list-item" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="img"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "block", sm: "block" } }}
            style={{ color: "#333" }}
          >
            <img className="nav-logo" src={logo} alt="Romero y Ajo logo" />
          </Typography>
          <div className="nav-icons-div">
          
            <IconButton className="navbar-icons" onClick={handleModalUser}>
              {isLoggedIn ? (
                <h6
                  style={{ fontSize: "15px", position: "relative", top: "5px" }}
                >
                  ¡Bienvenido!
                </h6>
              ) : null}
              
              <User className="nav-icon" />
            </IconButton>
            <IconButton className="navbar-icons" onClick={handleFavDrawer}>
              <Favorite className="nav-icon" style={{color: favData.length > 0 ? 'red' : '#fff'}}/>
            </IconButton>
            <IconButton className="navbar-icons" onClick={handleDrawerCart}>
              <Badge
                badgeContent={cartItems.reduce(
                  (total, item) => total + item.quantity,
                  0
                )}
                color="error"
              >
                <ShoppingCart className="nav-icon" />
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
            display: { xs: "block", sm: "inherit" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerCartWidth,
            },
          }}
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
            display: { xs: "block", sm: "inherit" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerCartWidth,
            },
          }}
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

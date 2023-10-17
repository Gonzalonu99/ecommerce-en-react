import * as React from "react";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddToCart from "../../cartButton/cartButton";
import ModalAddToCart from "../../cartButton/modalButtonCart";
import "./cards.css";
import "../../../index.css";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { FavoritesContext } from "../../../hook/useFav";
import { CartContext } from "../../../hook/useCart";
import { Button } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import Modal from "react-modal";

const customStyles = {
  content: {
    marginTop: "2rem",
    zIndex: 9999,
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "auto",
    backgroundColor: "#111",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
  },
};

export default function ProductCard(props) {
  const { addToCart } = useContext(CartContext);
  const { favoriteIds, handleFavorites, setFavoriteIds } =
    useContext(FavoritesContext);
  const isFavorite = favoriteIds.includes(props.Id);
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    // Verificar si el producto está en la lista de favoritos al cargar la página
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoriteIds(favorites);
  }, []);

  return (
    <Card
      sx={{ width: 240 }}
      style={{
        borderRadius: "10px",
        height: "420px",
        marginRight: "0px",
        marginBottom: "1rem",
        backgroundColor: "rgba(255, 255, 255, .62",
        boxShadow: "2px 2px 4px rgba(0,0,0,0.3)",
        display: "flex",
        width: "270px",
        flexDirection: "column",
   
      }}
      key={props.Id}
      id={props.Id}
    >
      <CardMedia
        component="img"
        height="220"
        image={props.Imagen}
        alt={props.Nombre}
      />
      <CardContent className="card-content-container">
        <Typography className="text-limit-title"
          variant="body1"
          color="text.primary"
          style={{ fontSize: "20px", maxHeight: "50px", color: "black" }}
        >
          {props.Nombre}
        </Typography>
        <Typography className="text-limit-Desc descripcionProducto">
          {props.Descripcion}
        </Typography>
        <Typography
          style={{
            paddingTop: "10px",
            textAlign: "left",
            fontSize: "26px",
            color: "#d2342c",
          }}
        >
          $ {props.Precio}
        </Typography>
        <CardActions disableSpacing className="cards-btn-container">
          <AddToCart
            onClick={() => {
              openModal();
            }}
            className="cards-btn"
          />
             <IconButton
            aria-label="add to favorites"
            onClick={() => handleFavorites(props.Id, props.PrecioId)}
            className="cards-btn"
            style={{ backgroundColor: isFavorite ? "#d2342c" : "gray" }}
          >
            <FavoriteIcon style={{ color: "#fff" }} />
          </IconButton> 


          
          <div className="modal1">
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <CancelIcon
                sx={{ cursor: "pointer", color: "#d2342c", height: "25px" }}
                onClick={closeModal}
                close
              />
              <div className="modal-container">
                <div>
                  <CardMedia
                    component="img"
                    className="img-modal"
                    height="300"
                    sx={{
                      borderRadius: "10px",
                    }}
                    image={props.Imagen}
                    alt={props.Nombre}
                  />
                </div>
                <div className="modal-content">
                  <div className="modal-header">
                    <h4>{props.Nombre}</h4>
                    <p>{props.Descripcion}</p>
                  </div>
                  <div className="modal-price">
                    <p>${props.Precio}</p>
                    <div className="modal-icons">
                      <ModalAddToCart
                        onClick={() => {
                          addToCart({ id: props.id, ...props });
                          closeModal();
                        }}
                        className="cards-btn"
                      />
                      <IconButton
                        aria-label="add to favorites"
                        onClick={() =>
                          handleFavorites(props.Id, props.PrecioId)
                        }
                      >
                        <Button
                          className="btn-fav-modal"
                          style={{
                            borderRadius: "10px",
                            color: "#fff",
                            width: "auto",
                          }}
                        >
                        {isFavorite ? `QUITAR DE FAVORITOS` : `AGREGAR A FAVORITOS`}  
                          <FavoriteIcon
                            style={{ marginLeft: ".4rem", color: "#fff" }}
                          />
                        </Button>
                      </IconButton>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
          {/* <IconButton
            aria-label="add to favorites"
            onClick={() => handleFavorites(props.Id, props.PrecioId)}
            className="cards-btn"
            style={{ backgroundColor: isFavorite ? "#d2342c" : "gray" }}
          >
            <FavoriteIcon style={{ color: "#fff" }} />
          </IconButton> */}
        </CardActions>
      </CardContent>
    </Card>
  );
}

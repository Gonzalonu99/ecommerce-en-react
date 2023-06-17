import React, {useEffect} from "react";
import ScrollReveal from "scrollreveal";
import { Box, Button, Icon, Typography } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";



const TutorialBox = () => {
  useEffect(() => {
    const handleScroll = () => {
      const tutorialFlex = document.querySelector(".tutorial-flex");
      const y = window.scrollY;

      if (tutorialFlex && y <= 637.03125) {
        tutorialFlex.classList.remove("tutorial-flex-none");
        ScrollReveal().reveal(".tutorial-flex", slideFromLeft);
        window.removeEventListener("scroll", handleScroll);
      } else if (tutorialFlex) {
        tutorialFlex.classList.add("tutorial-flex-none");
      }
    };

    const slideFromLeft = {
      origin: "left",
      distance: "500px",
      duration: 1000,
      delay: 200,
      easing: "ease-in-out",
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const boxData = [
    {
      icon: <SearchOutlinedIcon sx={{ fontSize: "40px" }} />,
      titulo: "1. Seleccioná",
      texto:
        "Navega nuestra tienda online en busca de tus productos y añadelos al carrito.",
    },
    {
      icon: <StorefrontOutlinedIcon sx={{ fontSize: "40px" }} />,
      titulo: "2. Añadir al carrito.",
      texto:
        "Verás tu lista de productos seleccionados en el carrito del menu superior.",
    },
    {
      icon: <LocalShippingOutlinedIcon sx={{ fontSize: "40px" }} />,
      titulo: "3. Delivery o Take Away",
      texto:
        "Elegí si te lo mandamos a domicilio o si pasarás a retirarlo por nuestro local.",
    },
    {
      icon: <PaymentsOutlinedIcon sx={{ fontSize: "40px" }} />,
      titulo: "4. Métodos de pago",
      texto:
        "Tendrás la posibilidad de pagar online, en el local o cuando recibas el pedido.",
    },
  ];
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography className="tittle-tutorial-section" variant="subtitle1">
          Romero y Ajo
        </Typography>
        <Typography className="sub-title-tutorial-section" variant="h4">
          ¿QUERÉS COMPRAR AHORA?
        </Typography>
      </Box>
      <div className="tutorial-flex">
        {boxData.map((tutorial, index) => (
          <Box
            key={index}
            className="tutorial-box"
            sx={{
              display: "none",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <Box
              className="tutorial-icon-container"
              sx={{ width: "60px !important", height: "50px !important" }}
            >
              <Icon className="tutorial-icon">{tutorial.icon}</Icon>
            </Box>
            <Typography className="tittle-tutorial" variant="h5">
              {tutorial.titulo}
            </Typography>
            <Typography className="sub-tittle-tutorial" variant="body2">
              {tutorial.texto}
            </Typography>
          </Box>
        ))}
      </div>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginBottom: "50px" }}
      ></Box>
    </>
  );
};

export default TutorialBox;

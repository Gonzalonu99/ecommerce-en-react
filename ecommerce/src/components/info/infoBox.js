import React, { useEffect } from "react";
import Info1 from "../../img/infoImg1.jpeg";
import Info2 from "../../img/infoImg2.jpeg";
import { Box, Button, Icon, Typography } from "@mui/material";
import "./info.css"

const InfonfoBox = () => {
  const boxData = [
    {
      imagen: Info1,
    },
    {
      imagen: Info2,
    },
    {
      imagen: Info1,
    },
    {
      imagen: Info2,
    },
  ];
  return (
    <div className="tutorial-section info-section">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            color: "#d2342c",
          }}
          className="sub-title-tutorial-section "
          variant="h4"
        >
          Sobre Nosotros
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
              marginBottom: "250px",
            }}
          >
            <Box
              className="tutorial-icon-container"
              sx={{ width: "60px !important", height: "50px !important" }}
            >
              <img style={{ height: "25rem" }} src={tutorial.imagen} />
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
    </div>
  );
};
export default InfonfoBox;

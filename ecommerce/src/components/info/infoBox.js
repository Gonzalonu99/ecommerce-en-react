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
        <h2
          className="sub-title-info-section "
        >
          Sobre Nosotros
        </h2>
     </Box>
     </div>
  );
};
export default InfonfoBox;

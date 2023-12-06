import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Chip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "../contactUs/contactUs.css";
import { formatearFechaActual } from "../../helpers/formatearFecha";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";

export default function PedidosTable() {
  const data = [
    {
      pedido: "Pizza Napelotona",
      img: "https://www.pequerecetas.com/wp-content/uploads/2012/05/pizza-de-espinacas-casera.jpeg",
      precio: "5300",
      cantidad: 2,
      fecha: Date.now().toString(),
      color: "warning", // pendiente, success = completado , error = cancelado
      estado: "completado", //pendiente , error
      id: 1,
    },
    {
      pedido: "Pizza con bondiola",
      img: "https://images.hola.com/imagenes/cocina/recetas/20220208204252/pizza-pepperoni-mozzarella/1-48-890/pepperoni-pizza-abob-t.jpg",
      precio: "4300",
      cantidad: 1,
      fecha: Date.now().toString(),
      color: "warning", // pendiente, success = completado , error = cancelado
      estado: "completado", //pendiente , error
      id: 2,
    },
    {
      pedido: "Pizza con coca",
      img: "https://resizer.glanacion.com/resizer/v2/pizza-NUKNWKWWRBAGXEECJWGLKMULVQ.jpg?auth=df70fb70d27e9a242dfe70068af898769f18e832bb543cb49d3faf002314bb82&width=768&height=512&quality=70&smart=true",
      precio: "2300",
      cantidad: 4,
      fecha: Date.now().toString(),
      color: "warning", // pendiente, success = completado , error = cancelado
      estado: "completado", //pendiente , error
      id: 3,
    },
    {
      pedido: "Pizza con coca",
      img: "https://resizer.glanacion.com/resizer/v2/pizza-NUKNWKWWRBAGXEECJWGLKMULVQ.jpg?auth=df70fb70d27e9a242dfe70068af898769f18e832bb543cb49d3faf002314bb82&width=768&height=512&quality=70&smart=true",
      precio: "2300",
      cantidad: 4,
      fecha: Date.now().toString(),
      color: "warning", // pendiente, success = completado , error = cancelado
      estado: "completado", //pendiente , error
      id: 3,
    },
    {
      pedido: "Pizza con coca",
      img: "https://resizer.glanacion.com/resizer/v2/pizza-NUKNWKWWRBAGXEECJWGLKMULVQ.jpg?auth=df70fb70d27e9a242dfe70068af898769f18e832bb543cb49d3faf002314bb82&width=768&height=512&quality=70&smart=true",
      precio: "2300",
      cantidad: 4,
      fecha: Date.now().toString(),
      color: "success", // pendiente, success = completado , error = cancelado
      estado: "completado", //pendiente , error
      id: 3,
    },
    {
      pedido: "Pizza con coca",
      img: "https://resizer.glanacion.com/resizer/v2/pizza-NUKNWKWWRBAGXEECJWGLKMULVQ.jpg?auth=df70fb70d27e9a242dfe70068af898769f18e832bb543cb49d3faf002314bb82&width=768&height=512&quality=70&smart=true",
      precio: "2300",
      cantidad: 4,
      fecha: Date.now().toString(),
      color: "warning", // pendiente, success = completado , error = cancelado
      estado: "completado", //pendiente , error
      id: 3,
    },
    {
      pedido: "Pizza con coca",
      img: "https://resizer.glanacion.com/resizer/v2/pizza-NUKNWKWWRBAGXEECJWGLKMULVQ.jpg?auth=df70fb70d27e9a242dfe70068af898769f18e832bb543cb49d3faf002314bb82&width=768&height=512&quality=70&smart=true",
      precio: "2300",
      cantidad: 4,
      fecha: Date.now().toString(),
      color: "warning", // pendiente, success = completado , error = cancelado
      estado: "completado", //pendiente , error
      id: 3,
    },
  ];
  const [expanded, setExpanded] = useState("");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : "");
  };
  return (
    <>
      <div className="faqs-contact">
        <section className="rl_section_faq1">
          <div className="rl-container-small">
            <div className="rl_faq1_component">
              <div
                className="header-filtrar"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <h3 style={{ textAlign: "start" }}>Mis pedidos</h3>
                <div>
                  <select>
                    <option value="">---filtrar por---</option>
                    <option value="menor">Menor precio</option>
                    <option value="mayor">Mayor precio</option>
                    <option value="reciente">Mas reciente</option>
                    <option value="antiguo">Mas antiguo</option>
                  </select>
                </div>
              </div>
              <div className="list-group-overflow">
                {data.map((pedido) => (
                  <Accordion
                    sx={{
                      padding: ".5rem",
                      minWidth: "20rem",

                      backgroundColor: "transparent",
                    }}
                    key={pedido.id}
                    expanded={expanded === `panel${pedido.id}`}
                    onChange={handleChange(`panel${pedido.id}`)}
                    className="acordion"
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel${pedido.id}-content`}
                      id={`panel${pedido.id}-header`}
                      className="acordion-summary"
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "1rem",
                        }}
                      >
                        <Typography>
                          {formatearFechaActual(pedido.fecha)} hrs
                        </Typography>

                        <Chip
                          color={pedido.color}
                          icon={DoneIcon}
                          variant="outlined"
                          label={pedido.estado}
                        />
                      </div>
                    </AccordionSummary>
                    <AccordionDetails sx={{ display: "flex", gap: "1rem" }}>
                     
                      <div>
                        <Typography>
                          {pedido.pedido} x {pedido.cantidad}
                        </Typography>
                        <Typography>
                          {pedido.pedido} x {pedido.cantidad}
                        </Typography>
                        <Typography>
                          {pedido.pedido} x {pedido.cantidad}
                        </Typography>
                        <Typography></Typography>
                        <Typography>Total: {pedido.precio}</Typography>

                        <Typography>
                          Fecha: {formatearFechaActual(pedido.fecha)} hrs
                        </Typography>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

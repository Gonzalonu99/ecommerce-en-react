import { Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import GradeIcon from "@mui/icons-material/Grade";
import WalletIcon from "@mui/icons-material/Wallet";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepOrange, deepPurple } from "@mui/material/colors";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation,Pagination } from "swiper/modules";
import Form from "./form/form";
import "./userProfile.css";
import { Link } from "react-router-dom";

const UserProfile = ({ userData }) => {
  function stringAvatar(name) {
    if (name && name.includes(" ")) {
      // Verificar si name no es undefined y contiene al menos un espacio en blanco
      const initials = `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`;
      return initials;
    } else {
      // Si name es undefined o no contiene un espacio en blanco, devolver una cadena vacía o un valor predeterminado según tus necesidades.
      return name;
    }
  }
  return (
    <>
      <div className="user-section">
        <div className="aside">
          <div className="swiper-container">
            <div className="aside-avatar">
              <Avatar
                className="avatar"
                sx={{
                  bgcolor: deepOrange[700],
                  width: "70px",
                  height: "70px",
                }}
              >
                {stringAvatar(userData.nombre)}
              </Avatar>
              <div className="aside-avatar-info">
                <p className="aside-avatar-info-profile">Mi perfil</p>
                <p>{userData.nombre}</p>
              </div>
            </div>
            
            <Swiper
              
              className="swiper-profile"
              modules={[Pagination, Navigation]}
              pagination={{ clickable: true }}
              Navigation={true}
              loop
            >
              <SwiperSlide>
                {" "}
                <div style={{textAlign:"center", marginTop:"1rem"}}>
                <Link to={"/mi-perfil"} className="aside-btn">
                <PersonIcon sx={{ width: "18px", color: "#d2342c", textAlign:"center" }} />
                  Mis datos personales
                </Link>
                 
                </div>
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <div style={{textAlign:"center", marginTop:"1rem"}}>
                <Link to={"/mi-perfil/direcciones"} className="aside-btn">
                <LocalShippingIcon sx={{ width: "18px", color: "#d2342c", textAlign:"center" }} />
                  Mis direcciones de entrega
                </Link>
                 
                </div>
                
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <div style={{textAlign:"center", marginTop:"1rem",display:"flex",justifyContent:"center", alignItems:"center"}}>
                <Link to={"/mi-perfil/pedidos"} className="aside-btn">
                <WalletIcon sx={{ width: "18px", color: "#d2342c", textAlign:"center" }} />
                  Mis pedidos
                </Link>
                 
                </div>
                
              </SwiperSlide>
              <SwiperSlide>
              <div style={{textAlign:"center", marginTop:"1rem"}}>
                <Link to={"/mi-perfil/reseñas"} className="aside-btn">
                <GradeIcon sx={{ width: "18px", color: "#d2342c", textAlign:"center" }} />
                  Mis reseñas
                </Link>
                 
                </div>
                
              </SwiperSlide>
            </Swiper>
          </div>

          <aside className="aside-user">
            <div className="aside-profile">
              <div className="aside-avatar">
                <Avatar
                  className="avatar"
                  sx={{
                    bgcolor: deepOrange[700],
                    width: "70px",
                    height: "70px",
                  }}
                >
                  {stringAvatar(userData.nombre)}
                </Avatar>
              </div>
              <div className="aside-avatar-info">
                <p className="aside-avatar-info-profile">Mi perfil</p>
                <p>{userData.nombre}</p>
              </div>
            </div>
            <div className="aside-buttons">
              <Link to={"/mi-perfil"} className="aside-btn">
                <PersonIcon sx={{ width: "18px", color: "#d2342c" }} />
                Mis datos personales
              </Link>

              <Link to={"/mi-perfil/direcciones"} className="aside-btn">
                <LocalShippingIcon sx={{ width: "18px", color: "#d2342c" }} />
                Mis direcciones de entrega
              </Link>
              <Link to={"/mi-perfil/pedidos"} className="aside-btn">
                <WalletIcon sx={{ width: "18px", color: "#d2342c" }} />
                Mis pedidos
              </Link>
              <Link to={"/mi-perfil/reseñas"} className="aside-btn">
                <GradeIcon sx={{ width: "18px", color: "#d2342c" }} />
                Mis reseñas
              </Link>
            </div>
          </aside>
        </div>
        <div className="user-content">
          <h4 style={{ marginBottom: "0", textAlign: "center",padding:".5rem", borderBottom:"2px solid rgb(237, 97, 90, .3)" }}>
            MIS DATOS PERSONALES 🍕
          </h4>
          <Form userData={userData} />
        </div>
      </div>
    </>
  );
};

export default UserProfile;

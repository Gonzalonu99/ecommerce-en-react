import PersonIcon from "@mui/icons-material/Person";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import GradeIcon from "@mui/icons-material/Grade";
import WalletIcon from "@mui/icons-material/Wallet";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import "./userProfile.css";

const AsideUserProfile = ({ userData }) => {
  return (
    <div>
      <div className="aside">
        <div className="swiper-container">
          <div className="aside-avatar">
            <img
              className="avatar"
              style={{ width: "70px", height: "70px", borderRadius: "50px" }}
              src={`https://api.multiavatar.com/${userData.nombre}%20Bond.png`}
            />
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
              <div style={{ textAlign: "center", marginTop: "1rem" }}>
                <Link to={"/mi-perfil"} className="aside-btn">
                  <PersonIcon
                    sx={{
                      width: "18px",
                      color: "#d2342c",
                      textAlign: "center",
                    }}
                  />
                  Mis datos personales
                </Link>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <div style={{ textAlign: "center", marginTop: "1rem" }}>
                <Link to={"/mi-perfil/direcciones"} className="aside-btn">
                  <LocalShippingIcon
                    sx={{
                      width: "18px",
                      color: "#d2342c",
                      textAlign: "center",
                    }}
                  />
                  Mis direcciones de entrega
                </Link>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <div
                style={{
                  textAlign: "center",
                  marginTop: "1rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Link to={"/mi-perfil/pedidos"} className="aside-btn">
                  <WalletIcon
                    sx={{
                      width: "18px",
                      color: "#d2342c",
                      textAlign: "center",
                    }}
                  />
                  Mis pedidos
                </Link>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div style={{ textAlign: "center", marginTop: "1rem" }}>
                <Link to={"/mi-perfil/reseñas"} className="aside-btn">
                  <GradeIcon
                    sx={{
                      width: "18px",
                      color: "#d2342c",
                      textAlign: "center",
                    }}
                  />
                  Mis reseñas
                </Link>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        <aside className="aside-user">
          <div className="aside-profile">
            <div className="aside-avatar">
              <img
                className="avatar"
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50px",
                }}
                src={`https://api.multiavatar.com/${userData.nombre}%20Bond.png`}
              />
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
    </div>
  );
};

export default AsideUserProfile;

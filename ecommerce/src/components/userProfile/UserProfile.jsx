import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import Form from "./form/form";
import "./userProfile.css";

import { useParams } from "react-router-dom";
import DireccionSection from "./Direccion/DireccionSection";
import EnviosForm from "./form/EnviosForm/EnviosForm";
import AsideUserProfile from "./AsideUserProfile";

const UserProfile = ({ userData }) => {
  return (
    <>
  
        <AsideUserProfile userData={userData} />
      
    </>
  );
};

export default UserProfile;

import React, { useState, useEffect } from "react";
import ProductCard from "./card/cards";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Loader from "../loader/loader";

const ProductsCarousel = () => {
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
  console.log(data);
  if (isLoading) {
    return (
      <div style={{display:"flex", justifyContent:"center", alignContent:"center", marginTop:"4rem"}}>
        <Loader />
      </div>
    );
  }
  if (error && error.isError) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      {data.SubRubros.map((subrubro) => (
        <div
          style={{ textAlign: "center", marginTop:"4rem" }}
          key={subrubro.NombreSubRubro}
          id="carrusel"
        >
          <h2 className="products-carousel-title">{subrubro.NombreSubRubro}</h2>
          <div className="products-container" id={subrubro.NombreSubRubro}>
            <Swiper
              style={{ zIndex: 0, minWidth: "95vw" }}
              modules={[Pagination]}
              pagination={{ clickable: true }}
              navigation
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                320: {
                  slidesPerView: 1.1,
                },
                400: {
                  slidesPerView: 1.3,
                },
                450: {
                  slidesPerView: 1.4,
                },
                500: {
                  slidesPerView: 1.6,
                },
                570: {
                  slidesPerView: 1.8,
                },
                640: {
                  slidesPerView: 2.2,
                },
                768: {
                  slidesPerView: 2.5,
                },
                856: {
                  slidesPerView: 2.8,
                },
                924: {
                  slidesPerView: 3.1,
                },
                1024: {
                  slidesPerView: 3.4,
                },
                1124: {
                  slidesPerView: 3.8,
                },
                1312: {
                  slidesPerView: 4.2,
                },
                1380: {
                  slidesPerView: 4.6,
                },
                1500: {
                  slidesPerView: 5.1,
                },
              }}
            >
              {subrubro.Productos.map((item) => (
                <SwiperSlide style={{}} key={item.Id}>
                  <ProductCard
                    Id={item.Id}
                    Nombre={item.Nombre}
                    Imagen={item.Imagen}
                    Descripcion={item.Descripcion}
                    Precio={item.Precio}
                    agotado={item.Agotado}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductsCarousel;

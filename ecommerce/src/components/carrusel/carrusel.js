import React, { useState, useEffect } from "react";
import ProductCard from "./card/cards";
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css/bundle';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error && error.isError) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      {data.SubRubros.map((subrubro) => (
        <div style={{ textAlign: "center" }} key={subrubro.NombreSubRubro}>
          <h2 className="products-carousel-title">{subrubro.NombreSubRubro}</h2>
          <div className="products-container" id={subrubro.NombreSubRubro}>
            <Swiper style={{zIndex:0}}
              modules={[Pagination]}
              pagination={{ clickable: true }}
              navigation
              breakpoints={{
                0:{
                  slidesPerView:1,
                },
                // Define breakpoints for different screen sizes
                320:{
                  slidesPerView: 1.1,
                },
                400:{
                  slidesPerView: 1.3
                },
                450:{
                  slidesPerView: 1.4,
                },
                500:{
                  slidesPerView: 1.6
                },
                570:{
                  slidesPerView: 1.8
                },
                640: {
                  slidesPerView: 2.2, // Display 2 slides on screens wider than 640px
                },
                768: {
                  slidesPerView: 2.5, // Display 3 slides on screens wider than 768px
                },
                856:{
                  slidesPerView: 2.8,
                },
                924:{
                  slidesPerView: 3.1,
                },
                1024: {
                  slidesPerView: 3.4, // Display 5.1 slides on screens wider than 1024px
                },
                1124:{
                  slidesPerView: 3.8
                },
                1312:{
                  slidesPerView: 4.2
                },
                1380:{
                  slidesPerView: 4.6,
                },
                1500:{
                  slidesPerView: 5.1
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
                    PrecioId={item.PrecioId}
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
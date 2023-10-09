import React, {useState, useEffect} from 'react';
import './card/cards.css';
import ProductCard from './card/cards';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow:3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: .85,
          initialSlide: 0
        }
      }
    ]
  };


  if (isLoading){return <div>Loading...</div>}
  if (error && error.isError) {
    return <div>{error.message}</div>;
  }
  return (
    <>
      {data.SubRubros.map((subrubro)=>(
        <div 
          key={subrubro.NombreSubRubro} className='products-carousel-container'
          id={subrubro.NombreSubRubro}  
        >
          <h2 className="products-carousel-title">{subrubro.NombreSubRubro}</h2>
          <Slider {...settings}>
            {subrubro.Productos.map((item)=>(
              <ProductCard 
                key={item.Id}
                Id={item.Id}
                Nombre={item.Nombre}
                Imagen={item.Imagen}
                Descripcion={item.Descripcion}
                Precio={item.Precio}
                PrecioId={item.PrecioId}
              />
            ))}
          </Slider>
        </div>
      ))}
    </>
  )
}

export default ProductsCarousel
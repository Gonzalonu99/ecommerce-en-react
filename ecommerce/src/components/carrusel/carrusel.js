import React, {useState, useEffect} from 'react';
import ProductCard from './card/cards';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductsCarousel = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetch("http://a365.com.ar/ecommerce/getProductos")
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

    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      initialSlide: 0,
      infinite: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
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
            <div key={subrubro.NombreSubRubro} className='products-carousel-container'>
                <h2 className="products-carousel-title">{subrubro.NombreSubRubro}</h2>
                <Slider {...settings}>
                {subrubro.Productos.map((product)=>(
                        <ProductCard 
                            id={product.id}
                            name={product.name}
                            image={product.image}
                            description={product.description}
                            price={product.price}
                        />
                    ))}
                </Slider>
            </div>
        ))}
    </>
  )
}

export default ProductsCarousel


  
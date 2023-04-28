import React, {useState, useEffect} from 'react';
import ProductCard from './card/cards';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

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
    const responsive = {
        0:{items:2},
        768:{items:3},
        1024:{items:4},
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
                <AliceCarousel
                    touchMoveDefaultEvents={true}
                    mouseTracking
                    infinite
                    autoPlay
                    autoPlayInterval={3000}
                    responsive={responsive}
                    items={subrubro.Productos.map((product)=>(
                        <ProductCard 
                            id={product.id}
                            name={product.name}
                            image={product.image}
                            description={product.description}
                            price={product.price}
                        />
                    ))}
                />
            </div>
        ))}
    </>
  )
}

export default ProductsCarousel


  
import React from 'react';
import useAxios from '../../hook/hookAxios';
import ProductCard from './card/cards';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const ProductsCarousel = () => {
    const {data, isLoading, error}= useAxios("http://a365.com.ar/ecommerce/getProductos");
    const responsive = {
        0:{items:2},
        768:{items:3},
        1024:{items:4},
    };
    if (isLoading){return <div>Loading...</div>}
    if(error.isError){return <div>{error.message}</div>}
  return (
    <>
        {Object.entries(data).map(([category, products])=>(
            <div key={products.id} className='products-carousel-container'>
                <h2 className="products-carousel-title">{category}</h2>
                <AliceCarousel
                    touchMoveDefaultEvents={true}
                    mouseTracking
                    infinite
                    autoPlay
                    autoPlayInterval={3000}
                    responsive={responsive}
                    items={products.map((product)=>(
                        <ProductCard product={product}/>
                    ))}
                />
            </div>
        ))}
    </>
  )
}

export default ProductsCarousel
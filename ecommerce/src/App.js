import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/navbar/index"
import ProductsCarousel from "./components/carrusel/carrusel";
import { CartProvider } from "./hook/useCart";


function App() {
  const scrollToCategory = (categoryId)=>{
    const element = document.getElementById(categoryId);
    setTimeout(() => {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }
  return (
    <CartProvider>
      <Navbar scrollToCategory={scrollToCategory}/>
      <ProductsCarousel/>
    </CartProvider>
  );
}

export default App;

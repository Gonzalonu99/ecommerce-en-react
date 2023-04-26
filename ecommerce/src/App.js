import { Fragment} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/navbar/index"
import ProductsCarousel from "./components/carrusel/carrusel";
import { CartProvider } from "./hook/useCart";


function App() {

  return (
    <CartProvider>
      <Navbar/>
      <ProductsCarousel/>
    </CartProvider>
  );
}

export default App;

import { Fragment } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/navbar/index"
import ProductsCarousel from "./components/carrusel/carrusel";


function App() {
  return (
    <Fragment>
      <Navbar/>
      <ProductsCarousel/>
    </Fragment>
  );
}

export default App;

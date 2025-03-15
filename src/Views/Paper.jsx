import Header from "../components/mainPage/Header";
import Home from "../components/Body/Home";
import Product from "../components/Body/Product";
import ProductDetail from "../components/productDetail/ProductDetail";
import About from "../components/Body/About";
import Contact from "../components/Body/Contact";
import Footer from "../components/mainPage/Footer";
import { Routes, Route } from "react-router-dom";

const MainPage = () => {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} index></Route>
        <Route path="home" element={<Home />}></Route>
        <Route path="/products" element={<Product />}></Route>
        <Route
          path={`/products/:productId`}
          element={<ProductDetail />}
        ></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
};

export default MainPage;

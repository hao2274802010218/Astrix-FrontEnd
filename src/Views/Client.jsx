import Login from "../components/authPageComponents/Login";
import Register from "../components/authPageComponents/Register";
import Information from "../components/informationComponents/Information";
import ViewOrderDetail from "../components/informationComponents/ViewOrderDetail";
import Header from "../components/mainPage/Header";
import Home from "../components/Body/Home";
import Product from "../components/Body/Product";
import ProductDetail from "../components/productDetail/ProductDetail";
import About from "../components/Body/About";
import Contact from "../components/Body/Contact";
import Footer from "../components/mainPage/Footer";
import { Routes, Route } from "react-router-dom";
import Cart from "../components/cartComponents/Cart";
import Checkout from "../components/checkoutComponent/Checkout";

const Client = () => {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/information" element={<Information />}></Route>
        <Route
          path="/view-order-detail/:id"
          element={<ViewOrderDetail />}
        ></Route>
        <Route path="/" element={<Home />} index></Route>
        <Route path="home" element={<Home />}></Route>
        <Route path="/products" element={<Product />}></Route>
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
};

export default Client;

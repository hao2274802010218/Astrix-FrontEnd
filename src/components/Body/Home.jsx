import ControlledCarousel from "../homeComponents/ControlledCarousel";
import ListProduct from "../homeComponents/ListProduct";
import Baner from "../homeComponents/Baner";
import Introduce from "../homeComponents/Introduce";
const Home = () => {
  return (
    <div>
      <ControlledCarousel></ControlledCarousel>
      <ListProduct></ListProduct>
      <Baner></Baner>
      <Introduce></Introduce>
    </div>
  );
};
export default Home;

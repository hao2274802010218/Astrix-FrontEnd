import ControlledCarousel from "../homeComponents/ControlledCarousel";
import OutstandingProducts from "../homeComponents/OutstandingProducts";
import Baner from "../homeComponents/Baner";
import Introduce from "../homeComponents/Introduce";
const Home = () => {
  return (
    <div>
      <ControlledCarousel></ControlledCarousel>
      <OutstandingProducts></OutstandingProducts>
      <Baner></Baner>
      <Introduce></Introduce>
    </div>
  );
};
export default Home;

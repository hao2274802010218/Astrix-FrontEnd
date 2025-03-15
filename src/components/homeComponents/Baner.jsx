import "../../styles/Baner.scss";
import baner from "../../assets/images/baner.png";
import { Link } from "react-router-dom";
const Baner = () => {
  return (
    <div className="baner">
      <div className="hinh-baner">
        <img src={baner} alt="Ảnh sản phẩm nổi bật" />
      </div>
      <div className="content">
        <h1>Nàng Đẹp Rực Rỡ</h1>
        <p>
          Khám phá ngay sản phẩm mới nhất của chúng tôi, được thiết kế với chất
          lượng tuyệt vời và giá cả hợp lý!
        </p>
        <Link to={"/products"}>
          <button>Xem Ngay</button>
        </Link>
      </div>
    </div>
  );
};
export default Baner;

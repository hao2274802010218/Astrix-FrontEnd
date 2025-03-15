import anh1 from "../../assets/images/content.png";
import anh2 from "../../assets/images/content_thoitrang.png";
import anh3 from "../../assets/images/content_chupanh.png";
import anh4 from "../../assets/images/content_benhvung.png";

const ContentAbout = () => {
  return (
    <div className="container mt-5">
      {/* Giới Thiệu Chung */}
      <div className="row mb-5 align-items-center text-center">
        <div className="col-lg-6">
          <h1 className="mb-4">Giới Thiệu Chung</h1>
          <p>
            Astrix - nơi thời trang gặp gỡ cá tính. Được thành lập vào năm 2025,
            Astrix mang đến sự kết hợp hoàn hảo giữa phong cách hiện đại và chất
            lượng vượt trội. Với niềm đam mê thời trang mãnh liệt, chúng tôi tin
            rằng mỗi sản phẩm không chỉ là trang phục mà còn là sự phản ánh của
            chính bạn.
          </p>
        </div>
        <div className="col-lg-6">
          <img
            src={anh1}
            alt="Bộ sưu tập"
            className="img-fluid rounded shadow"
          />
        </div>
      </div>

      {/* Hành Trình Phát Triển */}
      <div className="row mb-5 align-items-center text-center">
        <div className="col-lg-6 order-lg-2">
          <h1 className="mb-4">Hành Trình Phát Triển</h1>
          <p>
            Astrix bắt đầu như một cửa hàng nhỏ tại trung tâm thành phố, phục vụ
            những khách hàng yêu thích sự khác biệt và sáng tạo. Qua thời gian,
            nhờ sự ủng hộ từ cộng đồng, Astrix đã mở rộng mạnh mẽ, trở thành
            thương hiệu thời trang được yêu thích trên cả nền tảng trực tuyến và
            trực tiếp.
          </p>
          <p>
            Với đội ngũ thiết kế tài năng và không ngừng đổi mới, chúng tôi tự
            hào giới thiệu đến bạn những bộ sưu tập độc quyền, mang đậm dấu ấn
            của Astrix.
          </p>
        </div>
        <div className="col-lg-6 order-lg-1">
          <img
            src={anh2}
            alt="Hành Trình Phát Triển"
            className="img-fluid rounded shadow"
          />
        </div>
      </div>

      {/* Giá Trị Cốt Lõi */}
      <div className="row mb-5 align-items-center text-center">
        <div className="col-lg-6">
          <h1 className="mb-4">Giá Trị Cốt Lõi</h1>
          <div className="text-start">
            <p>
              <b>Chất lượng tuyệt đối:</b> Astrix sử dụng các chất liệu tốt nhất
              để tạo ra sản phẩm vượt trội.
            </p>
            <p>
              <b>Phong cách đa dạng:</b> Từ thời trang thường ngày, thanh lịch
              đến năng động - Astrix luôn có lựa chọn phù hợp cho bạn.
            </p>
            <p>
              <b>Trải nghiệm tuyệt vời:</b> Chính sách giao hàng nhanh, đổi trả
              dễ dàng và dịch vụ khách hàng tận tâm.
            </p>
          </div>
        </div>
        <div className="col-lg-6">
          <img
            src={anh3}
            alt="Giá Trị Cốt Lõi"
            className="img-fluid rounded shadow"
          />
        </div>
      </div>

      {/* Cam Kết Của Astrix */}
      <div className="row mb-5 align-items-center text-center">
        <div className="col-lg-6 order-lg-2">
          <h1 className="mb-4">Cam Kết Của Astrix</h1>
          <p>
            Chúng tôi không chỉ mang đến những sản phẩm thời trang mà còn là sự
            tự tin và niềm tự hào cho từng khách hàng. Astrix luôn cam kết:
          </p>
          <div className="text-start">
            <p>
              &#8226; Sử dụng chất liệu thân thiện với môi trường, giảm thiểu
              tác động đến hệ sinh thái.
            </p>
            <p>
              &#8226; Đáp ứng nhanh chóng nhu cầu của khách hàng mọi lúc, mọi
              nơi.
            </p>
          </div>
        </div>
        <div className="col-lg-6 order-lg-1">
          <img
            src={anh4}
            alt="Cam Kết Của Astrix"
            className="img-fluid rounded shadow"
          />
        </div>
      </div>

      {/* Hãy Đồng Hành Cùng Astrix */}
      <div className="text-center ">
        <h1 className="mb-4">Hãy Đồng Hành Cùng Astrix</h1>
        <p>
          Astrix hiểu rằng thời trang không chỉ là thứ bạn mặc mà còn là cảm
          giác bạn mang theo. Hãy cùng chúng tôi bước đi với phong cách riêng
          biệt của bạn.
        </p>
        <p>
          <b>Liên hệ với chúng tôi qua:</b>
        </p>
        <p>
          &#8209; Facebook:&ensp;
          <a href="https://www.facebook.com/YoungboiCamau33">YoungboiCamau33</a>
        </p>

        <p>
          &#8209; Instagram: &ensp;
          <a href="https://www.facebook.com/YoungboiCamau33">YoungboiCamau33</a>
        </p>
        <p>
          &#8209; Website: &ensp;
          <a href="https://www.facebook.com/YoungboiCamau33">YoungboiCamau33</a>
        </p>
      </div>
    </div>
  );
};

export default ContentAbout;

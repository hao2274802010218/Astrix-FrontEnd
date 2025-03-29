import React from "react";
import a1 from "../../assets/images/a1.png";
import a2 from "../../assets/images/a2.png";
import a3 from "../../assets/images/a3.png";
import styles from "../../styles/Introduce.module.scss";

const Introduce = () => {
  const listIntroduce = [
    {
      picture: a1,
      title:
        "Giao hàng nhanh chóng và bảo mật thông tin khách hàng khỏi thời đại số",
      content:
        "Chúng tôi cam kết mang đến dịch vụ giao hàng tối ưu, đảm bảo tốc độ nhanh nhất và sự an toàn tuyệt đối về thông tin khách hàng. Với hệ thống công nghệ tiên tiến, mọi giao dịch đều được mã hóa để ngăn chặn các mối đe dọa từ thời đại số.",
    },
    {
      picture: a2,
      title: "An tâm mua sắm với hệ thống giao hàng bảo mật",
      content:
        "Dịch vụ của chúng tôi không chỉ nhanh mà còn bảo mật thông tin khách hàng một cách tối đa. Đội ngũ hỗ trợ luôn sẵn sàng xử lý các vấn đề trong quá trình vận chuyển để bạn yên tâm hơn khi mua sắm.",
    },
    {
      picture: a3,
      title: "Đặt hàng tiện lợi, giao hàng an toàn",
      content:
        "Chỉ với vài thao tác đơn giản, bạn có thể đặt hàng và theo dõi lộ trình giao hàng minh bạch. Chúng tôi không ngừng cải tiến để đảm bảo mọi thông tin của bạn luôn được bảo mật ở mức cao nhất.",
    },
  ];
  return (
    <div
      className={styles["introduce-container"]}
      style={{ marginTop: "50px", marginBottom: "20px" }}
    >
      <h1>Giới thiệu</h1>
      {listIntroduce.map((introduce, index) => (
        <div key={index} className={styles["introduce-item"]}>
          <img src={introduce.picture} alt={introduce.title} />
          <h3>{introduce.title}</h3>
          <p>{introduce.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Introduce;

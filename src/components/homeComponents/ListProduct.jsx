import { Link } from "react-router-dom";
import products from "../../assets/images/product.png";
import "../../styles/ListProduct.scss";
const ListProduct = () => {
  const lists = [
    {
      id: "1",
      pic: products,
      content: "Sản phẩm",
      name: "Áo thun nam",
      price: 300000,
      category: "ao",
      description:
        "Áo thun nam chất liệu cotton cao cấp, thoáng mát và dễ chịu.",
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: "2",
      pic: products,
      content: "Sản phẩm",
      name: "Quần jeans nam",
      price: 500000,
      category: "quan",
      description: "Quần jeans nam kiểu dáng trẻ trung, chất liệu co giãn tốt.",
      sizes: ["28", "30", "32", "34"],
    },
    {
      id: "3",
      pic: products,
      content: "Sản phẩm",
      name: "Áo sơ mi nam",
      price: 400000,
      category: "ao",
      description: "Áo sơ mi nam vải lụa cao cấp, phù hợp môi trường công sở.",
      sizes: ["M", "L", "XL"],
    },
    {
      id: "4",
      pic: products,
      content: "Sản phẩm",
      name: "Áo khoác nam",
      price: 700000,
      category: "ao",
      description: "Áo khoác nam chống gió, phù hợp cho mùa đông lạnh giá.",
      sizes: ["M", "L", "XL"],
    },
  ];

  return (
    <div
      className="container"
      style={{ marginTop: "50px", marginBottom: "30px" }}
    >
      <h1>Sản Phẩm Nổi Bật</h1>
      <div className="list-product">
        {lists.map((product, index) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            style={{ textDecoration: "none" }}
          >
            <div className="product">
              <img src={product.pic} alt={product.content} />
              <h3>{product.name}</h3>
              <p>{product.price.toLocaleString()} VND</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;

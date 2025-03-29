import ProductManagement from "./management/ProductManagement";
import OrderManagement from "./management/OrderManagement";
import ContactManagement from "./management/ContactManagement";
import CategoryManagement from "./management/CategoryManagement";
import RoleManagement from "./management/RoleManagement";
import { Routes, Route } from "react-router-dom";
import ViewOrderDetail from "./management/ViewOrderDetail";

const MainContent = () => {
  return (
    <div
      className="flex-grow-1 p-4"
      style={{ backgroundColor: "#f8f9fa", overflowY: "auto" }}
    >
      <Routes>
        <Route
          path="/admin/product-management"
          element={<ProductManagement />}
        ></Route>
        <Route
          path="/admin/order-management"
          element={<OrderManagement />}
        ></Route>
        <Route
          path="/admin/contact-management"
          element={<ContactManagement />}
        ></Route>
        <Route
          path="/admin/category-management"
          element={<CategoryManagement />}
        ></Route>
        <Route
          path="/admin/role-management"
          element={<RoleManagement />}
        ></Route>
        <Route
          path="/admin/view-order-detail/:id"
          element={<ViewOrderDetail />}
        ></Route>
      </Routes>
    </div>
  );
};

export default MainContent;

import SideNav from "../components/Admin/sideNavComponents/SideNav";
import MainContent from "../components/Admin/contentComponents/MainContent";

const Admin = () => {
  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <SideNav></SideNav>
      <MainContent></MainContent>
    </div>
  );
};
export default Admin;

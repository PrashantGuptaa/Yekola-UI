import { Breadcrumb, Layout, Menu } from "antd";
import logo from "../../assets/images/logo.jpeg";
import "./navBar.css";
import logo2 from "../../assets/images/logo2.png";

const { Header, Content, Sider } = Layout;

const NavBar = () => {
  return (
    <Layout>
      <Header className="header">
        <div className="logo-container">
          <img src={logo} alt="Yekola-Logo" className="logo" />
          <span className="logo-name">YEKOLA</span>
        </div>
      </Header>
    </Layout>
  );
};

export default NavBar;

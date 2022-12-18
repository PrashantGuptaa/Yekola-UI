import { Layout } from "antd";
import logo from "../../assets/images/logo.jpeg";
import "./navBar.css";
import logo2 from "../../assets/images/logo2.png";
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <Header className="header">
        <div className="logo-container cursor-pointer" onClick={() => navigate('/')}>
          <img src={logo} alt="Yekola-Logo" className="logo" />
          {/* <span className="logo-name">YEKOLA</span> */}
        </div>
      </Header>
    </Layout>
  );
};

export default NavBar;

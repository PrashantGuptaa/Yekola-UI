import { Tabs } from 'antd';
import Register from '../Register';
import Login from '../Login';
import loginImg from '../../assets/images/loginbg.png';

import './signUser.css';
const SignUser = () => {
    return (
      <div className='sign-user-container'>
        <div className='sign-user'>
        <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Sign In" key="1">
          <Login />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Sign Up" key="2">
          <Register />
        </Tabs.TabPane>
      </Tabs>
      </div>
      </div>
     );
}
 
export default SignUser;
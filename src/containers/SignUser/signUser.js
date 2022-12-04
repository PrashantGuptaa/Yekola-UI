import { Tabs } from 'antd';
import Register from '../Register';
import Login from '../Login';
import './signUser.css';
const SignUser = () => {
    return (
        <div className='sign-user-container'>
        <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Sign In" key="1">
          <Login />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Sign Up" key="2">
          <Register />
        </Tabs.TabPane>
      </Tabs>
      </div>
     );
}
 
export default SignUser;
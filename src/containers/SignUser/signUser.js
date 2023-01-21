import { Tabs } from 'antd';
import Register from '../Register';
import Login from '../Login';
import loginImg from '../../assets/images/loginbg.png';
import login1 from '../../assets/images/login.png';
import login2 from '../../assets/images/login2.png';

import './signUser.css';
import { useState } from 'react';

const SignUser = () => {
  const [activeKey, setActiveKey] = useState('1');

  const handleTabChange = (activeKey) => setActiveKey(activeKey)
    return (
      <div className='sign-user-container'>
        <div className='sign-img-container'>
        <img src={activeKey === '1' ? login1 : login2} alt='login-img' className='login-img' />

        </div>
        <div className='sign-user'>
        <Tabs defaultActiveKey={activeKey}
        onChange={handleTabChange}
        items={[
          {
            label: `Sign In`,
            key: '1',
            children: <Login />,
          },
          {
            label: `Sign Up`,
            key: '2',
            children: <Register />,
          }
        ]} />
    </div>
      </div>
     );
}
 
export default SignUser;
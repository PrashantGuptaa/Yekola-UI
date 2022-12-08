
import { Alert, Space, Spin } from 'antd';

const SpinLoader = () => {
    return ( 
        <Spin tip="Loading">
        <div className="content" />
      </Spin>
     );
}
 
export default SpinLoader ;
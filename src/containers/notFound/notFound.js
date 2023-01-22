import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const NotFound = () => {
    console.log("F-4")
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/home/room-list/Lingala');

    }, [])
    return ( 
        <>Not Found</>
     );
}
 
export default NotFound;
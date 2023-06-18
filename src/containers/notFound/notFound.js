import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const NotFound = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/home/room-list/Yekola");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <>Not Found</>;
};

export default NotFound;

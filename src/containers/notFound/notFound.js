import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const NotFound = () => {
  console.log("F-4");
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/home/room-list/English");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <>Not Found</>;
};

export default NotFound;

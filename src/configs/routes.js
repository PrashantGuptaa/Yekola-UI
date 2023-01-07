import Login from "./../containers/Login";
import SignUser from "./../containers/SignUser";
import Home from "./../containers/Home";
import RoomList from "./../containers/RoomList/";
import InteractiveClass from "../containers/InteractiveClass";
import Authentication from "../components/Hoc";

const appRoutes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/sign-user",
    component: SignUser,
  },
  {
    path: "/room-list/:product",
    component: RoomList,
  },
  {
    path: "/class-room/:product/:className/:roomId",
    component: InteractiveClass,
  },
  {
    path: "/",
    component: Authentication(Home),
  },
];

export default appRoutes;

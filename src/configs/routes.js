import Login from "./../containers/Login";
import SignUser from "./../containers/SignUser";
import Home from "./../containers/Home";
import RoomList from "./../containers/RoomList/";
import InteractiveClass from "../containers/InteractiveClass";
import Authentication from "../components/Hoc";

const appRoutes = [
  {
    path: "/sign-user",
    component: SignUser,
  },
  {
    path: "/room-list/:product",
    component: Authentication(RoomList),
  },
  {
    path: "/class-room/:product/:className/:roomId",
    component: Authentication(InteractiveClass),
  },
  {
    path: "/",
    component: Authentication(Home),
  },
];

export default appRoutes;

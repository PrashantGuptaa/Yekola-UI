import Login from "./../containers/Login";
import SignUser from "./../containers/SignUser";
import Home from "./../containers/Home";
import RoomList from "./../containers/RoomList/";
import InteractiveClass from "../containers/InteractiveClass";
import Authentication from "../components/Hoc";
import LandingPage from "../containers/Landing/landing";
import NotFound from "../containers/notFound";
import Otp from "../containers/Otp";
import InActiveAccount from "../containers/InactiveAccount";
import Profile from "../containers/Profile";

const appRoutes = [
  {
    path: "/sign-user",
    component: SignUser,
  },
  // {
  //   path: "/room-list/:product",
  //   component: Authentication(RoomList),
  // },
  {
    path: "/class-room/:product/:className/:roomId",
    component: Authentication(InteractiveClass),
  },
  // {
  //   path: "/",
  //   component: Authentication(Home),
  // },
  {
    // path: "/le",
    path: "/home/room-list/:product",
    component: Authentication(LandingPage),
  },
  {
    path: "/:token/:otp",
    component: Otp,
  },
  {
    path: "/account",
    component: InActiveAccount,
  },
  {
    path: "/profile",
    component: Authentication(Profile),
  },
  {
    path: "*",
    component: NotFound,
  },
];

export default appRoutes;

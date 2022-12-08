import Login from './../containers/Login';
import SignUser from './../containers/SignUser';
import Home from './../containers/Home';
import RoomList from './../containers/RoomList/';

const appRoutes = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/sign-user',
        component: SignUser
    },
    {
        path: '/room-list/:product',
        component: RoomList
    },
    {
        path: '/',
        component: Home
    },
]

export default appRoutes;
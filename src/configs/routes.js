import Login from './../containers/Login';
import SignUser from './../containers/SignUser';

const appRoutes = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/sign-user',
        component: SignUser
    },
]

export default appRoutes;
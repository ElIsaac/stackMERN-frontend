//layouts
import LayoutAdmin from '../layouts/LayoutAdmin';
import LayoutBasic from '../layouts/LayoutBasic';

//Paginas del administrador
import AdminHome from '../pages/Admin';
import AdminSignin from '../pages/Admin/SignIn/SignIn';
import AdminUsers from '../pages/Admin/Users';

//paginas de acceso comun
import Home from '../pages/Home';
import Contact from '../pages/Contact';

//compartidos
import Error404 from '../pages/Error404';
const routes =[
    {
        path: "/admin",
        component: LayoutAdmin,
        exact: false,
        routes: [
            {
                path: "/admin",
                component: AdminHome,
                exact: true
            },
            {
                path: "/admin/sign",
                component: AdminSignin,
                exact: true
            },
            {
                path: "/admin/users",
                component: AdminUsers,
                exact: true
            },
            {
                component: Error404
            }
        ]
    },
    {
        path: "/",
        component: LayoutBasic,
        exact: false,
        routes: [
            {
                path: "/home",
                component: Home,
                exact: true
            },
            {
                path: "/contact",
                component: Contact,
                exact: true
            },
            {
                component: Error404
            }
        ]
    }
]
export default routes;
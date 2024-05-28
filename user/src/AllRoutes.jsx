import Home from "./pages/Home";
import Pets from "./pages/Pets";
import Foods from "./pages/Foods";
import Accessorys from "./pages/Accessorys";
import Medicine from "./pages/Medicine";
import {Login} from "./pages/Login";
import {Signup} from "./pages/Signup";
import { Routes, Route } from "react-router-dom";
import Notfound from "./pages/Notfound";
import Productdetails from "./pages/Productdetails";
import {Checkout} from "./pages/Checkout";
import Blogs from "./pages/Blogs";
import Cart from "./pages/Cart";
import Orderplaced from "./pages/Orderplaced";
const routerInfo = [
    {
        path: "/",
        component: <Home />,
    },
    {
        path: "/pets",
        component: <Pets />
    },
    {
        path: "/blogs",
        component: <Blogs />
    },
    {
        path: "/foods",
        component: <Foods />
    },
    {
        path: "/accessorys",
        component: <Accessorys />
    },
    {
        path: "/medicine",
        component: <Medicine />
    },
    {
        path: "/productdetails/:id",
        component: <Productdetails />
    },
    {
        path: "/login",
        component: <Login />
    },
    {
        path: "/signup",
        component: <Signup />
    },
    {
        path: "/cart",
        component: <Cart />
    },
    {
        path: "/Checkout",
        component: <Checkout />
    },
    {
        path: "/Orderplaced",
        component: <Orderplaced />
    },
    {
        path: "*",
        component: <Notfound />
    }
];
const AllRouter = () => {
    return (
        <Routes>
            {
                routerInfo.map((eachRoute, id) => {
                    return (
                        <Route
                            key={id}
                            path={eachRoute.path}
                            element={eachRoute.component}
                        />
                    );
                })
            }

        </Routes>
    );
}
export default AllRouter;
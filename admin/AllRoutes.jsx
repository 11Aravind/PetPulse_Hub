import Home from "./pages/Home"
import Product from "./pages/Product.jsx"
import AddProduct from "./pages/AddProduct.jsx"
import Order from "./pages/Order.jsx"
import Blogs from "./pages/Blogs"
import Addblog from "./pages/Addblog"
import Gallery from "./pages/Gallery"
import {Categorydetails,AddCategory} from "./pages/Categorydetails"
import {  Route, Routes } from 'react-router-dom';
const routerInfo = [
    {
        path:"/",
        component:<Home />
    },
    {
        path:"/productdetails",
        component:<Product />
    },
    {
        path:"/addproduct",
        component:<AddProduct />
    },
    {
        path:"/orderdetails",
        component:<Order />
    },
    {
        path:"/blogs",
        component:<Blogs />
    },
    {
        path:"/addblog",
        component:<Addblog />
    },
    {
        path:"/category",
        component:<Categorydetails/>
    },
    {
        path:"/addcategory",
        component:<AddCategory />
    },
    {
        path:"/gallery",
        component:<Gallery />
    },
    
];
export const AllRoutes=()=>{
    return(
        <Routes>
            {
                routerInfo.map((eachRoute,id)=>{
                    return(
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
// export default AllRoutes;
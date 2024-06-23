import { useDispatch, useSelector } from "react-redux"
import Categoryslider from "../component/Categoryslider";
import Produtcard from "../component/Produtcard";
import "../component/CSS/Card.css"
import {filterAndStore} from "../Slice/productSlice";
import { useEffect } from "react";
const Pets = () => {
   const dispatch=useDispatch();
    const categorys=useSelector((state)=>state.categorys.categoryList.filter(item=>item.mainCategory==="Pet"));
    const products = useSelector((state) => state.products.productList);
    const filteredProduct=products.filter(product=>categorys.some(category=>category._id===product.category_id && category.mainCategory==="Pet"));
   //  console.log(filteredProduct);
   useEffect(()=>{
      dispatch(filterAndStore(filteredProduct))
   },[])
    return (
       <>
               {/* <Categoryslider categorys={categorys} /> */}
       {

          filteredProduct.length===0 ?"Pets was empty" :<Produtcard categorys={categorys} headding="Our Pets"/> 
        }
       </>
    )
}
export default Pets;
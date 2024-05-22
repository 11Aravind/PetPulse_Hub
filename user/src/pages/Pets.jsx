
import { useSelector } from "react-redux"
import Categoryslider from "../component/Categoryslider";
import Produtcard from "../component/Produtcard";
import "../component/CSS/Card.css"
const Pets = () => {
    const categorys=useSelector((state)=>state.categorys.categoryList.filter(item=>item.mainCategory=="Pets"));
    const products = useSelector((state) => state.products.productList);
    const filteredProduct=products.filter(product=>categorys.some(category=>category._id===product.category_id && category.mainCategory==="Pets"));
   //  console.log(filteredProduct);
    return (
       <>
       {
          filteredProduct.length===0 ?"Pets was empty" :<Produtcard categorys={categorys} products={filteredProduct} headding="Our Pets"/> 
        }
       {/* <Produtcard categorys={categorys} products={filteredProduct}/>  */}
       </>
    )
}
export default Pets;
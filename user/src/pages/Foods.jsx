import { useSelector } from "react-redux";
import Produtcard from  "../component/Produtcard";
const Foods=()=>{
  const categorys=useSelector((state)=>state.categorys.categoryList);
    const products = useSelector((state) => state.products.productList);
    // && products.some((productItem)=>productItem.category_id===itemCat._id )
    const filterCategory=categorys.filter((itemCat)=>itemCat.mainCategory==="Food" );
    const filteredProduct=products.filter(product=>categorys.some(category=>category._id===product.category_id && category.mainCategory==="Food"));
    // console.log(filteredProduct);
    return(
      <Produtcard categorys={filterCategory} products={filteredProduct} headding="Our Top Food Items" />
   )
}
export default Foods;
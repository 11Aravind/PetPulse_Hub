import { useSelector } from "react-redux";
import Produtcard from  "../component/Produtcard";
const Foods=()=>{
  const categorys=useSelector((state)=>state.categorys.categoryList);
    const products = useSelector((state) => state.products.productList);
    const filterCategory=categorys.filter((itemCat)=>itemCat.mainCategory==="Food" && products.some((productItem)=>productItem.category_id===itemCat._id ));
    const filteredProduct=products.filter(product=>categorys.some(category=>category._id===product.category_id && category.mainCategory==="Food"));
    // console.log(filteredProduct);
    return(
      <Produtcard categorys={filterCategory} products={filteredProduct} />
   )
}
export default Foods;
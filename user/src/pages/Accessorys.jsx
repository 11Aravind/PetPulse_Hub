import { useSelector } from "react-redux";
import Produtcard from "../component/Produtcard"
const Accessorys=()=>{
    const categorys=useSelector((state)=>state.categorys.categoryList);
    const products = useSelector((state) => state.products.productList);
    const filterCategory=categorys.filter((itemCat)=>itemCat.mainCategory==="Accessorys" && products.some((productItem)=>productItem.category_id===itemCat._id ));
    const filteredProduct=products.filter(product=>categorys.some(category=>category._id===product.category_id && category.mainCategory==="Accessorys"));
    return(
        <Produtcard categorys={filterCategory} products={filteredProduct}/>
    );
}
export default Accessorys;
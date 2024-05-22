import { useSelector,useDispatch } from "react-redux";
import Produtcard from "../component/Produtcard"
import {filterAndStore} from "../Slice/productSlice"

const Accessorys=()=>{
    const dispatch = useDispatch();
    const categorys=useSelector((state)=>state.categorys.categoryList);
    const products = useSelector((state) => state.products.productList);
    const filterCategory=categorys.filter((itemCat)=>itemCat.mainCategory==="Accessorys" && products.some((productItem)=>productItem.category_id===itemCat._id ));
    const filteredProduct=products.filter(product=>categorys.some(category=>category._id===product.category_id && category.mainCategory==="Accessorys"));
    dispatch(filterAndStore(filteredProduct));
    return(
        <Produtcard categorys={filterCategory} products={filteredProduct} headding="Our Accessorys"/>
    );
}
export default Accessorys;
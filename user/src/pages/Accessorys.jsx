import { useSelector,useDispatch } from "react-redux";
import Produtcard from "../component/Produtcard"
import {filterAndStore} from "../Slice/productSlice"
import Categoryslider from "../component/Categoryslider";
const Accessorys=()=>{
    const dispatch = useDispatch();
    const categorys=useSelector((state)=>state.categorys.categoryList);
    const products = useSelector((state) => state.products.productList);
    const filterCategory=categorys.filter((itemCat)=>itemCat.mainCategory==="Accessorys" && products.some((productItem)=>productItem.category_id===itemCat._id ));
    const filteredProduct=products.filter(product=>categorys.some(category=>category._id===product.category_id && category.mainCategory==="Accessorys"));
    dispatch(filterAndStore(filteredProduct));
    return(
       <>
        {/* <Categoryslider categorys={filterCategory} /> */}
        <Produtcard categorys={filterCategory}  headding="Our Accessorys"/>
       </>
    );
}
export default Accessorys;
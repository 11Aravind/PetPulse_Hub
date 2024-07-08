// Produtcard.js
import { Link } from "react-router-dom";
import Categoryslider from "./Categoryslider";
import Filter from "./Filter";
import { useSelector } from "react-redux";

const Produtcard = ({ categorys, headding }) => {
const products=useSelector(state=>state.products.filteredProduct);
const imgPath=useSelector(state=>state.common.imagePath);
    return (
        <div className="topSpacing">
         {   categorys&& <Categoryslider categorys={categorys}/>}
            <Filter/>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 g-4" style={{    "margin": "10px 0px"}}>
                {products.map((product, index) => (
                    <div className="col-6 col-sm-6 col-md-4 col-lg-3" key={index}>
                        <Link to={`/productdetails/${btoa(product._id.toString())}`} className="card-link">
                            <div className="shadowbox card h-100 ">
                                <div className="img-container">
                                    <img src={imgPath + product.image} className="card-img-top product-image" alt="..." />
                                </div>
                                <div className="card-body">
                                    <div className="card-title">{product.name}</div>
                                    <div className="cart-footer">
                                        <div className="price">
                                            <div className="newprice sellingPrice">₹{product.newPrice}</div>
                                            <div className="oldPrice">₹{product.oldPrice}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
         </div>
    );
};

export default Produtcard;

import { Link } from "react-router-dom"
import Categoryslider from "./Categoryslider";
import { useSelector } from "react-redux"
import Filter from "./Filter";
const Produtcard = ({ categorys, products, headding }) => {
    const imgPath = useSelector((state) => state.common.imagePath)
    return (
        <div className="topSpacing">
            {/* <h1 className="headding">Pets</h1> */}
         { categorys&&  <Categoryslider categorys={categorys} headding={headding} />}
            <Filter products={products}/>
            {/* <h1 className="headding">New Products</h1> */}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 g-4" style={{ "marginTop": "40px" }}>
                {
                    products.map((product, index) => {
                        return (
                            <div className="col-6 col-sm-6 col-md-4 col-lg-3" key={index}>
                                <Link to={`/productdetails/${product._id}`}  className="card-link">
                                    <div className="card h-100">
                                        <div className="img-container">
                                            <img src={imgPath + product.image} className="card-img-top product-image" alt="..." />
                                            {/* <button className="options-btn">view option</button> */}
                                        </div>
                                        <div className="card-body">
                                            <div className="card-title">{product.name}</div>
                                            <div className="cart-footer">
                                                <div className="price">
                                                    <div className="oldPrice">₹{product.oldPrice}</div>
                                                    <div className="newprice sellingPrice">₹{product.newPrice}</div>
                                                </div>
                                                {/* <div><button className="cardBtn">Add to Cart</button></div> */}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default Produtcard;
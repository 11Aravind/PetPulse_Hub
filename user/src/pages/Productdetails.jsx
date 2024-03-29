import { Link, useParams } from "react-router-dom";
import "./CSS/productdetails.css"
import Quantitybtn from "../component/Quantitybtn";
import { useSelector,useDispatch } from "react-redux";
import {addToCart} from "../Slice/cartSlice"
import { useEffect,useState } from "react";
import Cart from "./Cart";
const Productdetails = () => {
    const { id } = useParams();
    const product = useSelector((state) => state.products.productList.find(product => product._id === id));
    const productFeature = [
        {
            url: "https://greenlandorganicfarms.com/shipping.png",
            description: "Fast Shipping"
        },
        {
            url: "https://greenlandorganicfarms.com/customer.png",
            description: "10K+ Happy Customer"
        },
        {
            url: "https://greenlandorganicfarms.com/handpicked.png",
            description: "Hand Picked Items"
        },
    ];
    const [showCart,setShowCart]=useState(false);
    const dispatch = useDispatch();
    const addProduct=()=>{
        dispatch(addToCart(product))
        setShowCart(!showCart)
    }
    const callbackShowCart=()=>{
        setShowCart(!setShowCart);
    }
    return (
        <div className="topSpacing">
            <div className="productDetails-container">
                <div className="left-container">
                  { product &&  <img src={`http://localhost:5000/${product.image}`} alt="" />}
                </div>
                <div className="rigt-container">
                    <div className="product-name">
                        {product && product.name}
                    </div>
                    <div className="price productdetails-price">
                        <div className="oldPrice"> ₹ {product && product.oldPrice}</div>
                        <div className="newprice">₹ {product && product.newPrice}</div>
                    </div>
                    <div className="addToCart fixedBtn">
                        {/* <Link to="/cart"> */}
                            <button className="addToCartBtn" onClick={addProduct}>Add</button>
                            {
                                showCart && <Cart callbackShowCart={callbackShowCart}/>
                            }
                        {/* </Link> */}
                    </div>
                    <div className="sub-headding">
                        Description
                    </div>
                    <div className="aboutProductDescription">
                        {product && product.description }                  
                          </div>
                    <div className="product-featureCOntainer">
                        {
                            productFeature.map((feature, index) =>
                                <div className="shipping">
                                    <img src={feature.url} alt="" />
                                    <div className="feature">
                                        {feature.description}
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Productdetails;


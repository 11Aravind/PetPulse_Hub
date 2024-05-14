import { useSelector,useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ButtonComponent from "../component/ButtonComponent"
import Quantitybtn from "../component/Quantitybtn";
import {addToCart} from "../Slice/cartSlice"
import { useEffect,useState } from "react";
import Notfound from "./Notfound";
import "./CSS/productdetails.css"
import Cart from "./Cart";
const Productdetails = () => {
    const { id } = useParams();
    const product = useSelector((state) => state.products.productList.find(product => product._id === id));
    // const [showCart,setShowCart]=useState(false);
    // const dispatch = useDispatch();
    // const addProduct=()=>{
    //     dispatch(addToCart(product))
    //     setShowCart(!showCart)
    // }
    const callbackShowCart=()=>{
        setShowCart(!setShowCart);
    }
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
    console.log(product);
    return (
        <div className="topSpacing">
            {
                product ? 
            (<div className="productDetails-container">
                <div className="left-container">
                  { product &&  <img src={`http://localhost:5001/${product.image}`} alt="" />}
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
                            {/* <button className="addToCartBtn" onClick={addProduct}>Add</button>
                            {
                                showCart && <Cart callbackShowCart={callbackShowCart}/>
                            } */}

<Link to="/cart">
              <ButtonComponent
                text="ADD TO CART"
                classs="addbtn addtocart"
                product={product}
              />
            </Link>
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
                                <div className="shipping" key={index}>
                                    <img src={feature.url} alt="" />
                                    <div className="feature">
                                        {feature.description}
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>):<Notfound/>
            }
        </div>
    );
}
export default Productdetails;


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
    const [showCart,setShowCart]=useState(false);
    const imgPath=useSelector((state)=>state.common.imagePath)

    const addProduct=()=>{
        setShowCart(!showCart)
    }
    const callbackShowCart=()=>{
        setShowCart(!showCart);
    }
    const productFeature = [
        {
            url: "../images/delivary.png",
            description: "Fast Delivery"
        },
        {
            url: "../images/card.png",
            description: "Free Shipping"
        },
        {
            url: "../images/secure.png",
            description: "Secure Checkout"
        },
    ];
    return (
        <div className="topSpacing">
            {
                product ? 
            (<div className="productDetails-container">
                <div className="left-container">
                  { product &&  <img src={imgPath+product.image} alt="" />}
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

{/* <Link to="/cart"> */}
              <ButtonComponent
                text="ADD TO CART"
                classs="addbtn smallBtn checkOut"
                product={product}
                onClick={addProduct}
                // disableValue={true}
              />
            {/* </Link> */}
           { showCart && <Cart callbackShowCart={callbackShowCart}/>}
                      
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
                                    <img className="featureImage" src={feature.url} alt="" />
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
            <h1 className="headding">Related products</h1>
            

        </div>
    );
}
export default Productdetails;


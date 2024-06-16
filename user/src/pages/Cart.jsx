import "./CSS/Cart.css";
import "./CSS/ButtonComponent.css"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useCart } from "react-use-cart";
import ButtonComponent from "../component/ButtonComponent";
import Quantitybtn from "../component/Quantitybtn";
import { useDispatch } from "react-redux"
import {setRoute} from "../Slice/commonSlice"
import { useState } from "react";
import { useHistory } from 'react-router-dom';
const Cart = ({ callbackShowCart }) => {
  const { isEmpty, items, cartTotal } = useCart();
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const history = useHistory();
  console.log(history);
const[cartIsVisible,setCartVisible]=useState(true)
  const imgPath = useSelector((state) => state.common.imagePath);
  const onCheckOut = () => {
    const userId = JSON.parse(localStorage.getItem("userId"));
    console.log(userId);
    dispatch(setRoute("/cart"));
    userId == null ? navigate("/login") : navigate("/Checkout");
  };
  const closeCart = () => {
    callbackShowCart()
  }
  const handleShow=()=>{
    setCartVisible(!cartIsVisible)
    history.goBack();
  }
  return (
    <>
      {isEmpty ? (
        <div className="emptyCartContainer product-headding">
          Your cart is empty
        </div>
      ) : (
        <div className= {cartIsVisible?"cart-container showshowCart":"cart-container hideCart"}     
           onClick={handleShow}>
          <div className="cart-body">
            <div className="closeBtn"
            //  onClick={closeCart}
             >
              <i className="bi bi-x"></i>
            </div>
            <h3 className="headding">Shopping Bag</h3>
            {items.map((product, key) => {
              return (
                <div className="body-tr" key={key}>
                  <div className="img-cart cart-th">
                    <img
                      className="product-cart-img"
                      src={imgPath+product.image}
                      alt="product-img"
                    />
                  </div>
                  <div className="product-det-cart">
                    <div className="cart-th">{product.name}</div>
                    <div className="quantity-price-container">
                      <div className="cart-th main-txt">₹{product.newPrice}</div>
                      <div className="cart-th">
                        <Quantitybtn item={product} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <ButtonComponent
            text={"Checkout- ₹" + cartTotal}
            classs="addbtn checkOutBtn"
            checkOut={true}
          onClick={onCheckOut}
          />
        </div>
      )}
    </>
  );
};
export default Cart;
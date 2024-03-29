import "./CSS/Cart.css";
import Quantitybtn from "../component/Quantitybtn"
import { useSelector} from "react-redux";
const Cart = ({ callbackShowCart }) => {
  const closeCart = () => {
    callbackShowCart()
  }
  const cartList=useSelector((state)=>state.carts.cartList);
  console.log(cartList);
  return (
    <>
      <div className="cart-container">
        <div className="closeBtn" onClick={closeCart}><i className="bi bi-x"></i></div>
        <h3 className="headding">Shopping Bag</h3>

        {cartList.map((product,key)=>{
          return(
          <div className="cart-row"  key={key}>
          <div className="cart-img">
            <img src={`http://localhost:5000/${product.image}`} alt="" />
          </div>
          <div className="cart-details">
            <div className="cart-description">
             {product.name}
              <div className="cart-price">₹{product.newPrice}</div>
            </div>
            <div className="quantitybtn">
              <Quantitybtn />
            </div>
          </div>
        </div>
          )
        })
        }
        <div className="txtBox-spacing">
          <button className="addToCartBtn" style={{ width: "100%", "color": "black", "border-radius": "10px" }}>Proceed to Checkout -  ₹789</button>
        </div>
      </div>
    </>
  )
}
export default Cart;
// Quantitybtn
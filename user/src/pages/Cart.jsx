import "./CSS/Cart.css";
import "./CSS/ButtonComponent.css"
// import Quantitybtn from "../component/Quantitybtn"
// import { useSelector} from "react-redux";
// const Cart = ({ callbackShowCart }) => {
//   const closeCart = () => {
//     callbackShowCart()
//   }
//   const cartList=useSelector((state)=>state.carts.cartList);
//   console.log(cartList);
//   return (
//     <>
//       <div className="cart-container">
//         <div className="closeBtn" onClick={closeCart}><i className="bi bi-x"></i></div>
//         <h3 className="headding">Shopping Bag</h3>

//         {cartList.map((product,key)=>{
//           return(
//           <div className="cart-row"  key={key}>
//           <div className="cart-img">
//             <img src={`http://localhost:5001/${product.image}`} alt="" />
//           </div>
//           <div className="cart-details">
//             <div className="cart-description">
//              {product.name}
//               <div className="cart-price">₹{product.newPrice}</div>
//             </div>
//             <div className="quantitybtn">
//               <Quantitybtn />
//             </div>
//           </div>
//         </div>
//           )
//         })
//         }
//         <div className="txtBox-spacing">
//           <button className="addToCartBtn" style={{ width: "100%", "color": "black", "border-radius": "10px" }}>Proceed to Checkout -  ₹789</button>
//         </div>
//       </div>
//     </>
//   )
// }
// export default Cart;
// // Quantitybtn
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useCart } from "react-use-cart";
import ButtonComponent from "../component/ButtonComponent";
import Quantitybtn from "../component/Quantitybtn";

const Cart = ({ callbackShowCart }) => {
  const { isEmpty, items, cartTotal } = useCart();
  const navigate = useNavigate();
  // const imagePath = useSelector((state) => state.banner.imagePath);
  const userId = useSelector((state) => state.user.userId);
  const onCheckOut = () => {
    userId == null ? navigate("/login") : navigate("/OrderConfirmation");
  };

  const closeCart = () => {
    callbackShowCart()
  }

  return (
    <>
      {isEmpty ? (
        <div className="emptyCartContainer product-headding">
          Your cart is empty
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-body">
            <div className="closeBtn" ><i className="bi bi-x"></i></div>
            <h3 className="headding">Shopping Bag</h3>
            {items.map((product, key) => {
              return (
                <div className="body-tr" key={key}>
                  <div className="img-cart cart-th">
                    <img
                      className="product-cart-img"
                      // src={imagePath + product.product_img}
                      src={`http://localhost:5001/${product.image}`}
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
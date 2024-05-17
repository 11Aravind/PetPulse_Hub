import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useCart } from "react-use-cart";
// import { httpRequest } from "../../API/api";
import ButtonComponent from "../component/ButtonComponent";
import "./CSS/OrderConfirmation.css";
export const OrderConfirmation = () => {
  const { isEmpty, items, cartTotal } = useCart();
  // const savedAddress = useSelector((state) => state.user.address);
//   const loginCredentials = JSON.parse(localStorage.getItem("loginCredentials"));
//   const user_id = loginCredentials.user_id;
  const [paymentMode, setPaymentMode] = useState("cod");
  const navigate = useNavigate();
  const Ref_fname = useRef("");
  const Ref_Area = useRef("");
  const Ref_houseNumber = useRef("");
  const Ref_pin = useRef("");
  const Ref_phone = useRef("");
  const Ref_city = useRef("");
  let completeOrder = () => {
    if (!isEmpty) {
      const product = items.map(({ product_id, price, quantity }) => {
        return { product_id, quantity };
      });
      const data = {
        user_id: user_id,
        address: Ref_fname + Ref_Area + Ref_city + Ref_houseNumber + Ref_phone,
        items: product,
        // cartTotal: cartTotal,
        paymentMode: paymentMode,
        orderID: null
      };
      // console.log(data);
      httpRequest(data, "checkOut.php").then((respose) => {
        if (respose && respose.status && paymentMode == "cod") {
          //cod success
          navigate("/OrderPlaced");
        } else if (respose && respose.status && paymentMode == "Online") {
          //cod success
          data.orderID = respose.message;
          navigate("/PayOnline", { state: data });
        }
      });
    }

  };
  return (
    <div className="spacing categoryFilterContainer">
      <div className="product-headding">Confirm your address</div>
      <div className="addressContainer">
        <div className="addressItem">
          <div className="fullNameText">Full Name <span className="redStar" /></div>
          <div className="fullNameInput">
            <input type="text" name="fullName" ref={Ref_fname} className="inputText" />
          </div>
        </div>
        <div className="addressItem">
          <div className="fullNameText">Area/Building</div>
          <div className="fullNameInput">
            <input type="text" name="fullName" ref={Ref_Area} className="inputText" />
          </div>
        </div>
        <div className="addressItem">
          <div className="fullNameText">House/Flat number</div>
          <div className="fullNameInput">
            <input type="text" name="fullName" ref={Ref_houseNumber} className="inputText" />
          </div>
        </div>
        <div className="addressItem">
          <div className="fullNameText">Pin code</div>
          <div className="fullNameInput">
            <input type="text" name="fullName" ref={Ref_pin} className="inputText" />
          </div>
        </div>
        <div className="addressItem">
          <div className="fullNameText">Phone</div>
          <div className="fullNameInput">
            <input type="text" name="fullName" ref={Ref_phone} className="inputText" />
          </div>
        </div>
        <div className="addressItem">
          <div className="fullNameText">City</div>
          <div className="fullNameInput">
            <input type="text" name="fullName" ref={Ref_city} className="inputText" />
          </div>
        </div>
      </div>
      <div className="product-headding spacing">Payment mode</div>
      <div className="payementModeDiv spacing">
        <div>
          {" "}
          <label htmlFor="CashOnDelivary"> Cash on delivery</label>{" "}
          <input
            name="paymentMode"
            id="CashOnDelivary"
            type="radio"
            value="cod"
            checked={paymentMode == "cod"}
            onChange={(event) => {
              setPaymentMode(event.target.value);
            }}
          />
        </div>
        <div className="spacing">
          <label htmlFor="Online"> Online Payment</label>{" "}
          <input
            name="paymentMode"
            type="radio"
            id="Online"
            checked={paymentMode == "Online"}
            value="Online"
            onChange={(event) => {
              setPaymentMode(event.target.value);
            }}
          />
        </div>
      </div>
      <ButtonComponent
        text="Confirm"
        classs="addbtn checkOutBtn"
        orderConfirmation={true}
        onClick={completeOrder}
      />
    </div>
  );
};
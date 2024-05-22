import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useCart } from "react-use-cart";
import { httpRequest } from "../API/api";
import ButtonComponent from "../component/ButtonComponent";
import "./CSS/OrderConfirmation.css";
import { useLocation } from "react-router"
export const OrderConfirmation = () => {
  const { isEmpty, items, cartTotal } = useCart();
  console.log(cartTotal);
  console.log(items);
  //   const loginCredentials = JSON.parse(localStorage.getItem("loginCredentials"));
  //   const user_id = loginCredentials.user_id;
  // const [paymentMode, setPaymentMode] = useState("cod");
  // const navigate = useNavigate();
  // let completeOrder = () => {
  //   if (!isEmpty) {
  //     const product = items.map(({ product_id, price, quantity }) => {
  //       return { product_id, quantity };
  //     });
  //     const data = {
  //       user_id: user_id,
  //       address: Ref_fname + Ref_Area + Ref_city + Ref_houseNumber + Ref_phone,
  //       items: product,
  //       // cartTotal: cartTotal,
  //       paymentMode: paymentMode,
  //       orderID: null
  //     };
  // console.log(data);
  //     httpRequest(data, "checkOut.php").then((respose) => {
  //       if (respose && respose.status && paymentMode == "cod") {
  //         //cod success
  //         navigate("/OrderPlaced");
  //       } else if (respose && respose.status && paymentMode == "Online") {
  //         //cod success
  //         data.orderID = respose.message;
  //         navigate("/PayOnline", { state: data });
  //       }
  //     });
  //   }
  // };
  const userId = useSelector((state) => state.user.userId)
  const [isAddressVisible, setAddressVisible] = useState(false);
  const [addressList, setAddress] = useState([])
  useEffect(() => {
    httpRequest('get', `api/user/getAddress?userId=${userId}`)
      .then((response) => {
        setAddress(response.data.addressList)
      })
      .catch((err) => console.log(err));
  }, [])
  const changeAddressVisibility = () => {
    setAddressVisible(!isAddressVisible)
  }
  return (
    //   <div className="product-headding spacing">Payment mode</div>
    //   <div className="payementModeDiv spacing">
    //     <div>
    //       {" "}
    //       <label htmlhtmlFor="CashOnDelivary"> Cash on delivery</label>{" "}
    //       <input
    //         name="paymentMode"
    //         id="CashOnDelivary"
    //         type="radio"
    //         value="cod"
    //         checked={paymentMode == "cod"}
    //         onChange={(event) => {
    //           setPaymentMode(event.target.value);
    //         }}
    //       />
    //     </div>
    //     <div className="spacing">
    //       <label htmlhtmlFor="Online"> Online Payment</label>{" "}
    //       <input
    //         name="paymentMode"
    //         type="radio"
    //         id="Online"
    //         checked={paymentMode == "Online"}
    //         value="Online"
    //         onChange={(event) => {
    //           setPaymentMode(event.target.value);
    //         }}
    //       />
    //   <ButtonComponent
    //     text="Confirm"
    //     classs="addbtn checkOutBtn"
    //     orderConfirmation={true}
    //     onClick={completeOrder}
    //   />
    <div className="container  col-6">
      <h5 className="headdingSpace">DELIVERY ADDRESS</h5>
      {addressList.length !== 0 && (
        addressList.map((addressItem, key) => {
          return (
            <div className="form-check" key={key}>
              <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                <b>{addressItem.name}</b> {addressItem.address}
              </label>
            </div>
          )
        })
      )
      }
      <div className="col-12 ">
        <button className="addAddressBtn headdingSpace " onClick={() => setAddressVisible(!isAddressVisible)}>+ Add a new address</button>
        {isAddressVisible && <Address changeAddressVisibility={changeAddressVisibility} />}
      </div>
      {/* <h5>ORDER SUMMARY</h5> */}
      <h5 className="headdingSpace">PAYMENT</h5>
      <div className="col-12 row">
        <div className="col-6">
          <input type="radio" className="cashOnDelivery" name="paymentMod" id="cash" />
          <label htmlFor="cash">Cash on Delivery</label>
          {/* <button className="cashOnDelivery">Cash on Delivery</button> */}
        </div>
        <div className="col-6">
          <input type="radio" className="cashOnDelivery" name="paymentMod" id="online" />
          <label htmlFor="online">Online Payment</label>
          {/* <button className="onlinePayment">Online Payment</button> */}
        </div>
      </div>
    </div>

  );
};
const Address = ({ changeAddressVisibility }) => {
  const name = useRef("")
  const mobile = useRef("")
  const pincode = useRef("")
  const locality = useRef("")
  const address = useRef("")
  const city = useRef("")
  const state = useRef("")
  const userId = useSelector((state) => state.user.userId)
  useEffect(() => {
    userId === null && navigate("/login")
  }, [userId])
  const saveAddress = () => {
    const addressData = {
      "userId": userId,
      "name": name.current.value,
      "mobileNo": mobile.current.value,
      "address": address.current.value + " ," + locality.current.value + " ," + city.current.value + " ," + pincode.current.value + " ," + state.current.value,
      "order_id": null,
    }
    httpRequest('post', "api/user/address", addressData)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  }
  return (
    <>
      <form className=" container row g-3">
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">Name</label>
          <input type="text" className="form-control" ref={name} id="inputEmail4" />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">Mobile Number</label>
          <input type="Number" className="form-control" ref={mobile} id="inputPassword4" />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">Pincode</label>
          <input type="text" className="form-control" ref={pincode} id="inputEmail4" />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">Locality</label>
          <input type="text" className="form-control" ref={locality} id="inputPassword4" />
        </div>
        <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">Address</label>
          <input type="text" className="form-control" ref={address} id="inputAddress" placeholder="" />
        </div>

        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">City</label>
          <input type="text" className="form-control" ref={city} id="inputEmail4" />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">State</label>
          <input type="text" className="form-control" ref={state} id="inputPassword4" />
        </div>


        <div className="col-md-6">
          <button type="button" className="checkOutBtn cancelBtn" onClick={changeAddressVisibility}>CANCEL</button>
        </div>
        <div className="col-md-6">
          <button type="button" className="checkOutBtn" onClick={saveAddress}>Confirm</button>
        </div>

      </form>
    </>
  );
}
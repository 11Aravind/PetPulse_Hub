import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useCart } from "react-use-cart";
import { httpRequest } from "../API/api";
import ButtonComponent from "../component/ButtonComponent";
import "./CSS/OrderConfirmation.css";
export const OrderConfirmation = () => {
  // const { isEmpty, items, cartTotal } = useCart();
  // const savedAddress = useSelector((state) => state.user.address);
  //   const loginCredentials = JSON.parse(localStorage.getItem("loginCredentials"));
  //   const user_id = loginCredentials.user_id;
  // const [paymentMode, setPaymentMode] = useState("cod");
  // const navigate = useNavigate();
  // const Ref_fname = useRef("");
  // const Ref_Area = useRef("");
  // const Ref_houseNumber = useRef("");
  // const Ref_pin = useRef("");
  // const Ref_phone = useRef("");
  // const Ref_city = useRef("");
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
const [isAddressVisible,setAddressVisible]=useState(false);
useEffect(()=>{
  httpRequest('get',"api/user/getAddress")
  .then((response)=>{
    console.log(response.message);
  })
  .catch((err)=>console.log(err));
},[])
  return (
    // <div className="spacing categoryFilterContainer">
    //   <div className="product-headding">Confirm your address</div>
    //   <div className="addressContainer">
    //     <div className="addressItem">
    //       <div className="fullNameText">Full Name <span className="redStar" /></div>
    //       <div className="fullNameInput">
    //         <input type="text" name="fullName" ref={Ref_fname} className="inputText" />
    //       </div>
    //     </div>
    //     <div className="addressItem">
    //       <div className="fullNameText">Area/Building</div>
    //       <div className="fullNameInput">
    //         <input type="text" name="fullName" ref={Ref_Area} className="inputText" />
    //       </div>
    //     </div>
    //     <div className="addressItem">
    //       <div className="fullNameText">House/Flat number</div>
    //       <div className="fullNameInput">
    //         <input type="text" name="fullName" ref={Ref_houseNumber} className="inputText" />
    //       </div>
    //     </div>
    //     <div className="addressItem">
    //       <div className="fullNameText">Pin code</div>
    //       <div className="fullNameInput">
    //         <input type="text" name="fullName" ref={Ref_pin} className="inputText" />
    //       </div>
    //     </div>
    //     <div className="addressItem">
    //       <div className="fullNameText">Phone</div>
    //       <div className="fullNameInput">
    //         <input type="text" name="fullName" ref={Ref_phone} className="inputText" />
    //       </div>
    //     </div>
    //     <div className="addressItem">
    //       <div className="fullNameText">City</div>
    //       <div className="fullNameInput">
    //         <input type="text" name="fullName" ref={Ref_city} className="inputText" />
    //       </div>
    //     </div>
    //   </div>
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
    //     </div>
    //   </div>
    //   <ButtonComponent
    //     text="Confirm"
    //     classs="addbtn checkOutBtn"
    //     orderConfirmation={true}
    //     onClick={completeOrder}
    //   />
    // </div>
    <div className="container  col-6">
      <h5>DELIVERY ADDRESS</h5>
      <div className="form-check">
        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
        <label className="form-check-label" htmlFor="flexRadioDefault2">
          <b>Nandakumar , 8129365304</b>  Sreenandanam ,muthupilakkadu,muthupilakkkadu p.o,sasthamcotta,Kollam,690520,Kerala
        </label>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
        <label className="form-check-label" htmlFor="flexRadioDefault1">
          <b>Nandakumar , 8129365304</b>  Sreenandanam ,muthupilakkadu,muthupilakkkadu p.o,sasthamcotta,Kollam,690520,Kerala
        </label>
      </div>
      <div className="col-12">
        <button className="addAddressBtn" onClick={()=>setAddressVisible(!isAddressVisible)}>+ Add a new address</button>
    {   isAddressVisible && <Address />}
      </div>
      <h5>ORDER SUMMARY</h5>
      <h5>PAYMENT</h5>
    </div>

  );
};
const Address = () => {
  return (
    <>
      <form className=" container row g-3">
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">Name</label>
          <input type="text" className="form-control" id="inputEmail4" />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">Mobile Number</label>
          <input type="Number" className="form-control" id="inputPassword4" />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">Pincode</label>
          <input type="text" className="form-control" id="inputEmail4" />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">Locality</label>
          <input type="Number" className="form-control" id="inputPassword4" />
        </div>
        <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">Address</label>
          <input type="text" className="form-control" id="inputAddress" placeholder="" />
        </div>

        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">City</label>
          <input type="text" className="form-control" id="inputEmail4" />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">State</label>
          <input type="Number" className="form-control" id="inputPassword4" />
        </div>


        <div className="col-md-6">
          <ButtonComponent
            text="Confirm"
            classs="addbtn checkOutBtn"
            orderConfirmation={true}
          />
        </div>
        <div className="col-md-6">
          <button type="button">CANCEL</button>
        </div>

      </form>
    </>
  );
}
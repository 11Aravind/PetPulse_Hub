import ButtonComponent from "../component/ButtonComponent";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useCart } from "react-use-cart";
import { httpRequest } from "../API/api";
import { useLocation } from "react-router"
import "./CSS/OrderConfirmation.css";

export const Checkout = () => {
  const navigate = useNavigate()
  const [addressId, changeAddressid] = useState(false);
  const [paymentMode, setPaymentMode] = useState('cod');
  // const userId = useSelector((state) => state.user.userId)
  const { isEmpty, items, cartTotal } = useCart();
  const [isAddressVisible, setAddressVisible] = useState(false);
  const [addressList, setAddress] = useState([])
  const [orderID, setOrderId] = useState([])
  const onCheckOut = () => {
    // dispatch(setRoute("/cart"));
    const userId = JSON.parse(localStorage.getItem("userId"));
    // console.log(userId);
    userId == null ? navigate("/login") : navigate("/Checkout");
    return userId;
  };
  useEffect(() => {
    const userId = onCheckOut();
    httpRequest('get', `api/user/getAddress?userId=${userId}`)
      .then((response) => {
        setAddress(response.data.addressList)
      })
      .catch((err) => console.log(err));
  }, [])
  const changeAddressVisibility = () => {
    setAddressVisible(!isAddressVisible)
  }


  const amount = cartTotal * 100;
  const currency = "INR";
  const receiptId = "qwsaq1";

  const paymentHandler = async (e) => {
    const product = items.map(({ _id, price, quantity }) => {
      return { _id, quantity };
    });
    const body = {
      amount,
      currency,
      receipt: receiptId,
      userId: userId,
      addressId: addressId,
      items: product,
      // totalamount: cartTotal,
      razorpayOrderId: "",
      status: paymentMode === "cod" ? "success" : "pending",
      paymentMode: paymentMode,
      order_message: "",
    };
    if (paymentMode === "cod") {
      httpRequest("POST", "api/order/cod", body)
        .then((res) => {
          if (res.status === "success")
            navigate("/Orderplaced")
        })
        .catch((err) => console.log(err));
      // cod
    } else {
      try {
        const order = await httpRequest("POST", "api/order/checkout", body);
        console.log(order);
        var options = {
          key: "rzp_test_u5nxL1KN1AKLE0", // Enter the Key ID generated from the Dashboard
          amount,
          currency,
          name: "PetPulse Hub",
          description: "Test Transaction",
          image: "https://static.freshtohome.com/images/logo/2021/logo-medium.png",
          order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          handler: async function (response) {
            const body = {
              ...response,
            };
            // check here the cod or online payment

            try {
              const jsonRes = await httpRequest("POST", "api/order/validate", body);
              console.log(jsonRes); // validation response
            } catch (error) {
              console.error("Validation request failed:", error);
            }

          },
          prefill: {
            //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
            name: "Web Dev Matrix", //your customer's name
            email: "webdevmatrix@example.com",
            contact: "9000000099", //Provide the customer's phone number for better conversion rates
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#0fa8db",
          },
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.on("payment.failed", function (response) {
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
        });
        rzp1.open();
      } catch (error) {
        console.error("Order creation failed:", error);
      }
    }
    // e.preventDefault();
  };

  // const paymentHandler = async (e) => {
  //   const product = items.map(({ _id, price, quantity }) => {
  //     return { _id, quantity };
  //   })
  //   const body = {
  //     amount,
  //     currency,
  //     receipt: receiptId,
  //     userId: userId,
  //     addressId: addressId,
  //     items: product,
  //     // totelamount: cartTotal,
  //     razorpayOrderId: "",
  //     status: "pending",
  //     paymentMode: paymentMode,
  //     order_message: ""
  //   };

  //   const response = await fetch("http://localhost:5001/api/order/", {
  //     method: "POST",
  //     body: JSON.stringify(body),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const order = await response.json();
  //   // console.log(`"order":${order}`);
  //   console.log(order);

  //   var options = {
  //     key: "rzp_test_u5nxL1KN1AKLE0", // Enter the Key ID generated from the Dashboard
  //     amount,
  //     currency,
  //     name: "PetPulse Hub",
  //     description: "Test Transaction",
  //     image: "./tshirt.jpg",
  //     order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
  //     handler: async function (response) {
  //       const body = {
  //         ...response,
  //       };
  //       // console.log(body);

  //       const validateRes = await fetch("http://localhost:5001/api/order/validate", {
  //         method: "POST",
  //         body: JSON.stringify(body),
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //       );
  //       const jsonRes = await validateRes.json();
  //       console.log(jsonRes);// validation response
  //     },
  //     prefill: {
  //       //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
  //       name: "Web Dev Matrix", //your customer's name
  //       email: "webdevmatrix@example.com",
  //       contact: "9000000099", //Provide the customer's phone number for better conversion rates
  //     },
  //     notes: {
  //       address: "Razorpay Corporate Office",
  //     },
  //     theme: {
  //       color: "#EE6043",
  //     },
  //   };
  //   var rzp1 = new window.Razorpay(options);
  //   rzp1.on("payment.failed", function (response) {
  //     alert(response.error.code);
  //     alert(response.error.description);
  //     alert(response.error.source);
  //     alert(response.error.step);
  //     alert(response.error.reason);
  //     alert(response.error.metadata.order_id);
  //     alert(response.error.metadata.payment_id);
  //   });
  //   rzp1.open();
  //   e.preventDefault();
  // };
  //   const loginCredentials = JSON.parse(localStorage.getItem("loginCredentials"));
  //   const user_id = loginCredentials.user_id;
  // const navigate = useNavigate();

  let completeOrder = () => {
    if (!isEmpty) {
      const product = items.map(({ _id, price, quantity }) => {
        return { _id, quantity };
      });
      // const data = {
      //   userId: userId,
      //   addressId: addressId,
      //   items: product,
      //   totelamount: cartTotal,
      //   transactionId: "",
      //   dateOfOrder: "",
      //   status: "pending",
      //   paymentMode: paymentMode,
      //   order_message: ""
      // };
      // console.log(data);
      // httpRequest('post', "api/order/checkout", data)
      //   .then((res) => {
      //     if (res && res.status && paymentMode === "cod") {
      //       navigate("/Orderplaced")
      //     } else if (res && res.status && paymentMode == "online") {
      //       setOrderId(res.orderId);
      //       paymentHandler();
      //       //     navigate("/PayOnline", { state: data });
      //     }
      //   })
      // httpRequest(data, "checkOut.php").then((respose) => {
      //   if (respose && respose.status && paymentMode == "cod") {
      //     navigate("/OrderPlaced");
      //   } else if (respose && respose.status && paymentMode == "Online") {
      //     data.orderID = respose.message;
      //     navigate("/PayOnline", { state: data });
      //   }
      // });
    }
  };

  return (
    <div className="container  col-10">
      <h5 className="headdingSpace">DELIVERY ADDRESS</h5>
      {addressList.length !== 0 && (
        addressList.map((address, key) => {
          return (
            <div className="form-check" key={key}>
              <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
                onChange={() => changeAddressid(address._id)} />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                <b>{address.name}</b> {address.address}
              </label>
            </div>
          )
        })
      )
      }
      <div className="col-12 ">
        <button className="addAddressBtn headdingSpace " onClick={() => setAddressVisible(!isAddressVisible)}>+ Add Address</button>
        {isAddressVisible && <Address changeAddressVisibility={changeAddressVisibility} />}
      </div>
      <h5 className="headdingSpace">ORDER SUMMARY</h5>
      {
        items.map((item, index) => {
          return (
            <div className="col-12 row" style={{ marginBottom: "10px" }} key={index}>
              <div className="col-3" style={{ width: "100px" }}>
                <img src={`http://localhost:5001/${item.image}`} alt="" />
              </div>
              <div className="col-3" style={{ fontSize: "13px" }}>{item.name}</div>
              <div className="col-3" >{item.newPrice}</div>
              <div className="col-3" >{item.quantity}</div>
            </div>
          )
        })
      }
      <div className="col-12 row">
        <div className="col-6">Totel Amount</div>
        <div className="col-6"><b>₹{cartTotal}</b></div>
      </div>
      <h5 className="headdingSpace">PAYMENT</h5>
      <div className="col-12 row">
        <div className="col-6">
          <input type="radio"
            className="cashOnDelivery"
            name="paymentMode"
            id="cash"
            checked={paymentMode == "cod"}
            onClick={() => setPaymentMode("cod")}
          />
          <label htmlFor="cash" className="radioPaymentLabels">Cash on Delivery</label>
        </div>
        <div className="col-6">
          <input type="radio"
            className="cashOnDelivery"
            name="paymentMoed"
            id="online"
            checked={paymentMode == "online"}
            onClick={() => setPaymentMode("online")}
          />
          <label htmlFor="online" className="radioPaymentLabels">Online Payment</label>
        </div>
      </div>
      {/* <button className="checkOutBtn" onClick={paymentHandler}>Confirm</button> */}
      <ButtonComponent
        text="Confirm"
        classs={addressId == false ? "addbtn checkOutBtn disabled" : "addbtn checkOutBtn"}
        orderConfirmation={true}
        onClick={paymentHandler}
        disableValue={addressId == false ? true : false}
      />
    </div>

  );
};




const Address = ({ changeAddressVisibility }) => {
  const navigate = useNavigate()
  const name = useRef("")
  const mobile = useRef("")
  const pincode = useRef("")
  const locality = useRef("")
  const address = useRef("")
  const city = useRef("")
  const state = useRef("")
  // const userId = useSelector((state) => state.user.userId)
  const userId = JSON.parse(localStorage.getItem("userId"));
  useEffect(() => {
    userId === null && navigate("/login")
  }, [userId])
  const saveAddress = () => {
    const addressData = {
      "userId": userId,
      "name": name.current.value,
      "mobileNo": mobile.current.value,
      "address": address.current.value + ",  " + locality.current.value + ",  " + city.current.value + ",  " + pincode.current.value + ", " + state.current.value,
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
          <label htmlFor="inputPassword4" className="form-label">Mobile No</label>
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
        <div className="row">
          <div className="col-md-6">
            <button type="button" className="checkOutBtn cancelBtn" onClick={changeAddressVisibility}>CANCEL</button>
          </div>
          <div className="col-md-6">
            <button type="button" className="checkOutBtn" onClick={saveAddress}>Confirm</button>
          </div>
        </div>
      </form>
    </>
  );
}
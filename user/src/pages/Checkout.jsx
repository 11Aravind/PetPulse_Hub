import ButtonComponent from "../component/ButtonComponent";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useCart } from "react-use-cart";
import { httpRequest } from "../API/api";
import { useLocation } from "react-router"
import "./CSS/OrderConfirmation.css";
export const Checkout = () => {
  const [addressId, changeAddressid] = useState(false);
  const [paymentMode, setPaymentMode] = useState('online');
  const userId = useSelector((state) => state.user.userId)
  const { isEmpty, items, cartTotal } = useCart();


  const amount = cartTotal * 100;
  const currency = "INR";
  const receiptId = "qwsaq1";

  const paymentHandler = async (e) => {
    const body = {
      amount,
      currency,
      receipt: receiptId,
    };
    const response = await fetch("http://localhost:5001/order", {
      method: "POST",
      body: JSON.stringify({
        amount,
        currency,
        receipt: receiptId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const order = await response.json();
    console.log(order);

    var options = {
      key: "rzp_test_u5nxL1KN1AKLE0", // Enter the Key ID generated from the Dashboard
      amount, 
      currency,
      name: "PetPulse Hub", 
      description: "Test Transaction",
      image: "./tshirt.jpg",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        const body = {
          ...response,
        };

        const validateRes = await fetch(
          "http://localhost:5001/order/validate",
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const jsonRes = await validateRes.json();
        console.log(jsonRes);
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
        color: "#EE6043",
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
    e.preventDefault();
  };
  //   const loginCredentials = JSON.parse(localStorage.getItem("loginCredentials"));
  //   const user_id = loginCredentials.user_id;
  // const navigate = useNavigate();

  let completeOrder = () => {
    if (!isEmpty) {
      const product = items.map(({ _id, price, quantity }) => {
        return { _id, quantity };
      });
      const data = {
        userId: userId,
        addressId: addressId,
        items: product,
        totelamount: cartTotal,
        transactionId: "",
        dateOfOrder: "",
        status: "pending",
        paymentMode: paymentMode,
        order_message:""

      };
      console.log(data);
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
            name="paymentMod"
            id="cash"
            checked={paymentMode == "cod"}
            onClick={() => setPaymentMode("cod")}
          />
          <label htmlFor="cash" className="radioPaymentLabels">Cash on Delivery</label>
        </div>
        <div className="col-6">
          <input type="radio"
            className="cashOnDelivery"
            name="paymentMod"
            id="online"
            checked={paymentMode == "online"}
            onClick={() => setPaymentMode("online")}
          />
          <label htmlFor="online" className="radioPaymentLabels">Online Payment</label>
        </div>
      </div>
      <button className="checkOutBtn" onClick={paymentHandler}>Confirm</button>
      <ButtonComponent
        text="Confirm"
        classs={addressId == false ? "addbtn checkOutBtn disabled" : "addbtn checkOutBtn"}
        orderConfirmation={true}
        onClick={completeOrder}
        disableValue={addressId == false ? true : false}
      />
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
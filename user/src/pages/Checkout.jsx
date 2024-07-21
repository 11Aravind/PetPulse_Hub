import ButtonComponent from "../component/ButtonComponent";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useCart } from "react-use-cart";
import { httpRequest } from "../API/api";
import { fetchAndStoreAddress } from "../Slice/addressSlice"
import "./CSS/OrderConfirmation.css";
import Address, {Addaddress} from "../component/Address"
import Notfound from "../pages/Notfound"
export const Checkout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isEmpty, items, cartTotal } = useCart();
  const [addressId, changeAddressid] = useState(false);
  const [paymentMode, setPaymentMode] = useState('cod');
  const [isAddressVisible, setAddressVisible] = useState(false);
  const addressList = useSelector((state) => state.address.addressList)
  const userId = JSON.parse(localStorage.getItem("userId"));
  const onCheckOut = () => {
    const userId = JSON.parse(localStorage.getItem("userId"));
    userId === null && navigate("/login");
    return userId;
  };
  useEffect(() => {
    const userId = onCheckOut();
    httpRequest('get', `api/user/getAddress?userId=${userId}`)
      .then((response) => {
        if (response.data.length === 0)
          dispatch(fetchAndStoreAddress([]))
        else
         {
          dispatch(fetchAndStoreAddress(response.data.addressList))
          console.log(response.data.addressList);
         }
      })
      .catch((err) => console.log(err));
  }, [dispatch])
  const changeAddressVisibility = () => {
    setAddressVisible(!isAddressVisible)
  }

//payment section
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
              // console.log("validation status:",jsonRes); // validation response
              if(jsonRes.msg==='success')
                navigate("/Orderplaced")
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


  // let completeOrder = () => {
  //   if (!isEmpty) {
  //     const product = items.map(({ _id, price, quantity }) => {
  //       return { _id, quantity };
  //     });
  //   }
  // };
// const handleRemoveAddress=(addressId)=>{
//   console.log(addressId);
//   httpRequest('delete',`api/address/${addressId}`)
//   .then((res)=>console.log(res))
//   .catch((err)=>console.log(err))
// }
  return (
    isEmpty ?<Notfound/>:
    <div className="container  col-10">
      <h5 className="headdingSpace">DELIVERY ADDRESS</h5>
     <Address changeAddressid={changeAddressid}/>

      <div className="col-12 ">
        <button className="addAddressBtn headdingSpace " onClick={() => setAddressVisible(!isAddressVisible)}>+ Add Address</button>
        {isAddressVisible && <Addaddress changeAddressVisibility={changeAddressVisibility} />}
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





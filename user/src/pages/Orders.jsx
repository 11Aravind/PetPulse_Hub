import { useEffect, useState } from "react";
import { httpRequest } from "../API/api";
import "./CSS/orders.css"
const Orders = () => {

  const [orders, setOrders] = useState([]);
  const userId = JSON.parse(localStorage.getItem("userId"));
  console.log(userId);
  useEffect(() => {
    httpRequest('get', `api/order?userId=${userId}`)
      .then((res) => {
        console.log(res.data);
        setOrders(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="container">
      <h1 className="headding">Our orders</h1>
      {
        orders.map((order,index)=>{
          return(
            <div className="order-row" key={index}>
          <div className="img">
            <img src="http://localhost:5001/1711434011193-71nlKZCnEqL._SL1500.webp" alt="img" />
          </div>
          <div className="order-desctiption">
{order.totelamount}, {order.paymentMode} ,  {order.dateOfOrder}
      </div>
          <div className="cancel-order">
            <button className="cancelBtn" id={order._id}>cancel</button>
          </div>
        </div>
          )
        })
        
      }
     
    </div>
  )
}

export default Orders

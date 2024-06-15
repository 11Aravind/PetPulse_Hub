import { useState } from "react";
import { httpRequest } from "../API/api";
const Orders = () => {
    const [orders,setOrders]=useState([]);
    httpRequest('get',"api/order/")
    .then((res)=>console.log(res))
    .catch((err)=>console.log(err));
  return (
    <div className="col-12 row" style={{ marginBottom: "10px" }}>
              <div className="col-3" style={{ width: "100px" }}>
                <img src="http://localhost:5001/1711434149628-1_f687340b-634e-41eb-a20d-975a29606913.webp" alt="" />
              </div>
              <div className="col-6" style={{ fontSize: "13px" }}>Maxi Dry Dog Food - Chicken and Liver (20kg)
              2610
              </div>
              <div className="col-3" ><i class="bi bi-trash3"></i></div>
            </div>
  )
}

export default Orders

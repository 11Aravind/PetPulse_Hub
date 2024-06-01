import { useEffect, useState } from "react";
import {httpRequest} from "../API/api"
import {useSelector} from "react-redux"
const Order = () => {
    const tableHeadding = [
        { th: "#id" },
        { th: "Name" },
        { th: "addressId" },
        { th: "tAmount" },
        { th: "Mode" },
        { th: "Date" },
        { th: "message" },
        { th: "status" },
        { th: "Action" },
    ];
const[orders,setOrders]=useState([])
const visibility=useSelector((state)=>state.visibility.visibility)

    useEffect(()=>{
        httpRequest('get','api/order/')
        .then((res)=>{
            console.log(res)
            setOrders(res.data)
        })
        .catch((err)=>console.log(err));
    },[])
   
    return (
        <div className={visibility?"flat-container":"content-div"} > 
        <div className="card-header">
            <div className="card-headding">Order Details</div>
            <div className="top-button"></div>
        </div>
        <table className="table-container table">
            <thead>
                <tr className="table-headding">
                    {
                        tableHeadding.map((eachHeadding, id) =>
                            <td key={id}>{eachHeadding.th}</td>
                        )
                    }
                </tr>
            </thead>
            <tbody>
                {
                    orders.map((order, id) =>
                        <tr key={id} scope="row">
                            <td>{id+1}</td>
                            <td>{order.userId}</td>
                            <td>{order.addressId}</td>
                            <td>{order.totelamount}</td>
                            <td>{order.paymentMode}</td>
                            <td>{order.dateOfOrder}</td>
                            <td>{order.order_message}</td>
                            <td>{order.status}</td>
                            <td>  <i className="bi bi-trash3-fill"></i>  </td>
                            {/* <td><i className="bi bi-pencil-square"></i> </td> */}
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
    );
}
export default Order;

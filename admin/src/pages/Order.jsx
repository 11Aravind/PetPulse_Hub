// import { useEffect, useRef, useState } from "react";
// import { httpRequest } from "../API/api"
// import { useSelector } from "react-redux"
// const Order = () => {
//     const tableHeadding = [
//         { th: "#id" },
//         { th: "Name" },
//         { th: "addressId" },
//         { th: "tAmount" },
//         { th: "Mode" },
//         { th: "Date" },
//         { th: "message" },
//         { th: "status" },
//         { th: "Action" },
//     ];
//     const [orders, setOrders] = useState([])
//     const visibility = useSelector((state) => state.visibility.visibility)
//     const [orderUpdate, setOrderUpdate] = useState(false)
//     const [orderId, setOrderId] = useState()
//     const messsageRef = useRef(null)
//     useEffect(() => {
//         httpRequest('get', 'api/order/all')
//             .then((res) => {
//                 setOrders(res.data)
//             })
//             .catch((err) => console.log(err));
//     }, [])
//     const updateOrderStatus = () => {
//         const data = {
//             "id": orderId,
//             "order_message":messsageRef.current.value
//         }
//         // console.log(data);
//         httpRequest('post', 'api/order/updateStatus',data)
//         .then((res)=>setOrderUpdate(!orderUpdate))
//         .catch((err)=>console.log(err))
//     }
//     const handleEditing = (id) => {
//         setOrderId(id)
//         setOrderUpdate(!orderUpdate)

//     }
//     return (
//         <div className={visibility ? "flat-container" : "content-div"} >
//             <div className="card-header">
//                 <div className="card-headding">Order Details</div>
//                 <div className="top-button"></div>
//             </div>
//             <table className="table-container table">
//                 <thead>
//                     <tr className="table-headding">
//                         {
//                             tableHeadding.map((eachHeadding, id) =>
//                                 <td key={id}>{eachHeadding.th}</td>
//                             )
//                         }
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {
//                         orders.map((order, id) =>
//                             <tr key={id} scope="row">
//                                 <td>{id + 1}</td>
//                                 <td>{order.userId}</td>
//                                 <td>{order.addressId}</td>
//                                 <td>{order.totelamount}</td>
//                                 <td>{order.paymentMode}</td>
//                                 <td>{order.dateOfOrder}</td>
//                                 <td>{order.order_message}</td>
//                                 <td>{order.status}</td>
//                                 <td onClick={(e) => handleEditing(order._id)} id={order._id}>  <i class="bi bi-pencil-square"></i> </td>
//                                 {/* <td><i className="bi bi-pencil-square"></i> </td> */}
//                             </tr>
//                         )
//                     }
//                 </tbody>
//             </table>
//             {orderUpdate &&
//                 <div className="update-status">
//                     <div className="box-title"><h5 class="modal-title">Update Order</h5>
//                     </div> <hr />
//                     <div className="body">
//                         <select ref={messsageRef} >
//                             <option value="Order Placed">Order Placed</option>
//                             <option value="Shipped">Shipped</option>
//                             <option value="Out For Deliver">Out For Deliver</option>
//                             <option value="Delivered">Delivered</option>
//                         </select>
//                     </div> <hr />
//                     <div className="footer">
//                         <button className="gray-btn footer-btn " onClick={() => setOrderUpdate(!orderUpdate)}>cancel</button>
//                         <button className="footer-btn" onClick={updateOrderStatus}>Update</button>
//                     </div>
//                 </div>
//             }
//         </div>
//     );
// }
// export default Order;

import { useEffect, useRef, useState } from "react";
import { httpRequest } from "../API/api";
import { useSelector } from "react-redux";

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
    const [orders, setOrders] = useState([]);
    const visibility = useSelector((state) => state.visibility.visibility);
    const [orderUpdate, setOrderUpdate] = useState(false);
    const [orderId, setOrderId] = useState();
    const messsageRef = useRef(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        httpRequest('get', 'api/order/all')
            .then((res) => {
                setOrders(res.data);
            })
            .catch((err) => console.log(err));
    };

    const updateOrderStatus = () => {
        const data = {
            "id": orderId,
            "order_message": messsageRef.current.value
        };
        httpRequest('post', 'api/order/updateStatus', data)
            .then((res) => {
                setOrderUpdate(false);
                // Update the order in the state
                setOrders(prevOrders =>
                    prevOrders.map(order =>
                        order._id === orderId ? { ...order, order_message: data.order_message } : order
                    )
                );
            })
            .catch((err) => console.log(err));
    };

    const handleEditing = (id) => {
        setOrderId(id);
        setOrderUpdate(true);
    };

    return (
        <div className={visibility ? "flat-container" : "content-div"}>
            <div className="card-header">
                <div className="card-headding">Order Details</div>
                <div className="top-button"></div>
            </div>
            <table className="table-container table">
                <thead>
                    <tr className="table-headding">
                        {tableHeadding.map((eachHeadding, id) => (
                            <td key={id}>{eachHeadding.th}</td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, id) => (
                        <tr key={id} scope="row">
                            <td>{id + 1}</td>
                            <td>{order.userId}</td>
                            <td>{order.addressId}</td>
                            <td>{order.totelamount}</td>
                            <td>{order.paymentMode}</td>
                            <td>{order.dateOfOrder}</td>
                            <td>{order.order_message}</td>
                            <td>{order.status}</td>
                            <td onClick={() => handleEditing(order._id)} id={order._id}>
                                <i className="bi bi-pencil-square"></i>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {orderUpdate &&
                <div className="update-status">
                    <div className="box-title"><h5 className="modal-title">Update Order</h5></div> <hr />
                    <div className="body">
                        <select ref={messsageRef}>
                            <option value="Order Placed">Order Placed</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Out For Deliver">Out For Deliver</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div> <hr />
                    <div className="footer">
                        <button className="gray-btn footer-btn" onClick={() => setOrderUpdate(false)}>Cancel</button>
                        <button className="footer-btn" onClick={updateOrderStatus}>Update</button>
                    </div>
                </div>
            }
        </div>
    );
}

export default Order;
